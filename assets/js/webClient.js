import { Events, Requests } from './core-consts'
import { jsonDescriptor } from './bundle'
import { CryptManager } from './cryptManager'
import ChatExtra from './chatextra'

const cryptManager = new CryptManager()
let cryptoKeys = {}

const protobuf = require("protobufjs/light")

const root = protobuf.Root.fromJSON(jsonDescriptor)
//let WebConMessage = root.lookupType("csproto.webconnector.WebMessage")
//WebConMessage.Type = { REGISTER: 0, SEND: 1 }

let WebPayload = root.lookupType("csproto.webclient.WebPayload")
WebPayload.Type = { EVENT: 0, REQUEST: 1, REPLY: 2 }

let WebRequest = root.lookupType("csproto.webclient.WebRequest")

// events
let WebStateEvent = root.lookupType("csproto.webclient.WebStateEvent")
let WebAlertEvent = root.lookupType("csproto.webclient.WebAlertEvent")
let WebCallEvent = root.lookupType("csproto.webclient.WebCallEvent")
let WebAuthEvent = root.lookupType("csproto.webclient.WebAuthEvent")
let WebChatEvent = root.lookupType("csproto.webclient.WebChatEvent")
let WebVerifyEvent = root.lookupType("csproto.webclient.WebVerifyEvent")
let WebAvatarEvent = root.lookupType("csproto.webclient.WebAvatarEvent")
let WebAccountEvent = root.lookupType("csproto.webclient.WebAccountEvent")

// replies
let WebContact = root.lookupType("csproto.webclient.WebContact")
let WebContacts = root.lookupType("csproto.webclient.WebContacts")
let WebAccountDetails = root.lookupType("csproto.webclient.WebAccountDetails")
let WebChat = root.lookupType("csproto.webclient.WebChat")
let WebChats = root.lookupType("csproto.webclient.WebChats")
let WebMessage = root.lookupType("csproto.webclient.WebMessage")
let WebMessages = root.lookupType("csproto.webclient.WebMessages")
let WebFile = root.lookupType("csproto.webclient.WebFile")
let WebCalls = root.lookupType("csproto.webclient.WebCalls")
let WebExtra = root.lookupType("csproto.webclient.WebExtra")
let WebCredentials = root.lookupType("csproto.webclient.WebCredentials")

const FRAGMENT_LEN = 64000

function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xF).toString(16));
  }
  return hex.join("");
}
function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

class WebClient {
  constructor() {
    this.wscs = null
    this.messageCollector = {}
  }

  async connect(url) {
    await cryptManager.initialize({})
    console.log('-- cryptManager.initialize', cryptManager.publicKey())

    this.wscs = new WebSocket(url)
    this.wscs.binaryType = 'arraybuffer';
    return new Promise(resolve => {
      this.wscs.onopen = (ev) => {
        console.log('-- onopen', ev)
        this.onready = function () {
          console.log('-- onready')
          resolve(true)
        }
        this.#sendPublicKey()
      }
      this.wscs.onmessage = (ev) => {
        //console.debug('-- wscsClient onmessage', new Uint8Array(ev.data))
        this.#onMessageHandler(ev)
      }
      this.wscs.onerror = (ev) => {
        console.log('-- wscsClient onerror', ev)
        resolve(false)
      }
      this.wscs.onclose = (ev) => {
        console.log('-- wscsClient onclose', ev)
      }
    })
  }

  #onMessageHandler(ev) {
    const data = new Uint8Array(ev.data)
    const payload = WebPayload.decode(data)
    console.debug('-- recvd', payload.type, payload.action, payload.fragment, payload.fragmentCount)

    if (payload.fragmentCount > 0) {
      let key = payload.action
      if (!this.messageCollector[key]) {
        this.messageCollector[key] = {}
      }
      this.messageCollector[key][payload.fragment] = payload.cryptoBox

      // TODO: better to count frags in messageCollector and compare with fragmentCount
      const end = payload.fragment == (payload.fragmentCount - 1)
      if (!end)
        return

      let data = new Uint8Array()
      for (let i = 0; i < payload.fragmentCount; i++) {
        const b = this.messageCollector[key][i]
        const c = new Uint8Array(data.length + b.length);
        c.set(data);
        c.set(b, data.length);
        data = c
      }
      payload.cryptoBox = data
      this.messageCollector[key] = {}
    }

    if (payload.cryptoBox.length == 0 && payload.publicKey && payload.publicKey.length > 0) {
      console.log('-- store user key:', bytesToHex(payload.publicKey))
      //console.log('-- store user token:', payload.token)
      this.senderKey = payload.publicKey
      this.senderToken = payload.token
      // TODO: store both to storage
      // TODO: reply
      this.onready()
    } else {
      if (payload.type == WebPayload.Type.EVENT) {
        this.#onEventHandler(payload)
      } else if (payload.type == WebPayload.Type.REPLY) {
        this.#onRequestHandler(payload)
      } else {
        console.error('-- unknown payload: ', payload)
      }
    }
  }

  #onEventHandler(payload) {
    const bytes = cryptManager.decrypt(this.senderKey, payload.cryptoBox)
    console.debug('-- payload event:', payload.action, 'bytes', bytes.length)
    let msg = null

    switch (payload.action) {
      case Events.UserAuthorized:
        msg = WebAuthEvent.decode(bytes)
        console.log('-- userAuthorized', msg)
        this.onuserauthorized(msg)
        break

      case Events.StatusChanged:
        msg = WebStateEvent.decode(bytes)
        if (this.onstatuschanged) this.onstatuschanged(msg)
        break

      case Events.ChatChanged:
      case Events.ChatDetailsChanged:
      case Events.ChatMessagesRemoved:
      case Events.ChatMessageReceived:
      case Events.ChatMessageSendingDone:
      case Events.FileSent:
      case Events.FileReceived:
      case Events.FileProgress:
        msg = WebChatEvent.decode(bytes)
        msg.action = payload.action
        console.log('-- chatchanged', msg)
        if (this.onchatchanged) this.onchatchanged(msg)
        break
      case Events.ChatTtlChanged:
        msg = WebChatEvent.decode(bytes)
        if (this.onchatttlchanged) this.onchatttlchanged(msg)
        break
      case Events.ChatUnreadChanged:
        msg = WebChatEvent.decode(bytes)
        if (this.onchatunreadchanged) this.onchatunreadchanged(msg)
        break
      case Events.ChatTtlMessageProgress:
        msg = WebChatEvent.decode(bytes)
        if (this.onchatttlmessageprogress) this.onchatttlmessageprogress(msg)
        break
      case Events.ChatTypingEvent:
        msg = WebChatEvent.decode(bytes)
        if (this.onchattypingupdated) this.onchattypingupdated(msg)
        break
      case Events.ChatMessageUpdated:
        msg = WebChatEvent.decode(bytes)
        if (this.onchatmessageupdated) this.onchatmessageupdated(msg)
        break

      case Events.ConferenceStarted:
      case Events.ConferenceEnded:
      case Events.ConferenceSuspended:
      case Events.ConferenceResumed:
      case Events.IncomingCall:
      case Events.RecentChanged:
        break
      case Events.UserListChanged:
        break

      case Events.ShowMessage:
        msg = WebAlertEvent.decode(bytes)
        if (this.onshowmessage) this.onshowmessage(msg)
        break
      case Events.BlockUserComplete:
        msg = WebStateEvent.decode(bytes)
        console.log('-- blockUserComplete', msg)
        if (this.onblockusercomplete) this.onblockusercomplete(msg)
        break
      case Events.UnblockUserComplete:
        msg = WebStateEvent.decode(bytes)
        console.log('-- unblockUserComplete', msg)
        msg.id = msg.contactId
        if (this.onunblockusercomplete) this.onunblockusercomplete(msg)
        break
      case Events.UnblockUsersComplete:
        msg = WebStateEvent.decode(bytes)
        console.log('-- unblockUsersComplete', msg)
        if (this.onunblockallcomplete) this.onunblockallcomplete(msg)
        break

      case Events.AccountAvatarSet:
        break

      case Events.VerifyUserComplete:
        if (!this.onverifyusercomplete) return
        msg = WebVerifyEvent.decode(bytes)
        console.log('-- verifyUserComplete', msg)
        this.onverifyusercomplete({
          id: msg.contactId,
          result: msg.result,
          name: msg.name,
          fingerprint: msg.fingerprint,
          avatar: (msg.avatar.byteLength > 0)
            ? '' + btoa(String.fromCharCode(...msg.avatar))
            : ''
        })
        break
    }
  }

  #onRequestHandler(payload) {
    console.debug('-- payload req:', payload.action)

    const bytes = cryptManager.decrypt(this.senderKey, payload.cryptoBox)

    let msg
    switch (payload.action) {
      case Requests.GetContacts:
      case Requests.GetBlockedContacts:
        msg = (bytes.length > 0) ? WebContacts.decode(bytes) : { contacts: [] }
        //console.log('-- GetContacts', msg)
        break

      case Requests.GetChats:
        msg = (bytes.length > 0) ? WebChats.decode(bytes) : { chats: [] }
        console.log('-- GetChats', msg)
        break
      case Requests.GetChatMessages:
        msg = (bytes.length > 0) ? WebMessages.decode(bytes) : { messages: [] }
        console.log('-- GetChatMessages', msg)
        break
      case Requests.GetChatMessage:
        msg = (bytes.length > 0) ? WebMessage.decode(bytes) : {}
        console.log('-- GetChatMessage', msg)
        break
      case Requests.GetRecentCalls:
        msg = (bytes.length > 0) ? WebCalls.decode(bytes) : { calls: [] }
        console.log('-- GetRecentCalls')
        break
      case Requests.GetUserProfile:
        console.error('-- GetUserProfile')
        break

      case Requests.DecodeFile:
        msg = (bytes.length > 0) ? WebFile.decode(bytes) : { data: new Uint8Array() }
        break

      case Requests.CreateChat:
      case Requests.RestoreDraft:
      case Requests.GetChatTtl:
      case Requests.GetChatUnreadCount:
      case Requests.GetUnreadCount:
      case Requests.OpenSingleChat:
        msg = (bytes.length > 0) ? WebChat.decode(bytes) : {}
        console.log('-- chat action', payload.action, msg)
        break
      case Requests.RestoreDraft:
        msg = (bytes.length > 0) ? WebChat.decode(bytes) : {}
        break

      case Requests.ReadFile:
        console.error('-- ReadFile')
        break
      case Requests.Ping:
        console.log('-- ping received')
        this.pingCount = 0
        msg = {}
        break
      default:
        console.log('-- payload event:', payload)
    }

    if (msg) msg.action = payload.action
    //if (this.onreplycallback) this.onreplycallback(msg)
    this.#onReplyCallback(msg)
  }

  send(action, request) {
    let cryptoBytes
    if (request) {
      const wr = WebRequest.create(request)
      const bytes = WebRequest.encode(wr).finish()
      console.log(`-- req ${bytes.length}, webreq[${wr}], req=${request}`)
      cryptoBytes = cryptManager.encrypt(this.senderKey, bytes)
      console.log('-- req 2', cryptoBytes, this.senderKey)
    }

    const cblen = (cryptoBytes) ? cryptoBytes.length : 0
    let fragmentCount = (cblen > FRAGMENT_LEN) ? (cblen / FRAGMENT_LEN) : 0
    if (cblen % FRAGMENT_LEN) fragmentCount++
    console.log(`-- send 2: ${cblen} [${fragmentCount}]`)

    let offset = 0
    let fragment = 0
    do {
      const cb = cryptoBytes ? cryptoBytes.subarray(offset, offset + FRAGMENT_LEN) : undefined

      const p = WebPayload.create({
        type: WebPayload.Type.REQUEST,
        action: action,
        cryptoBox: cb,
        token: this.myToken,
        fragment,
        fragmentCount
      })
      console.log(`-- send ${action} [${fragment}][${offset}]`, p)

      const bytes = WebPayload.encode(p).finish()
      this.wscs.send(bytes)

      offset += FRAGMENT_LEN
      fragment++
    } while (fragment < fragmentCount)
  }

  #sendPublicKey() {
    const p = WebPayload.create({
      type: WebPayload.Type.REQUEST,
      action: Requests.WebClientAuth,
      publicKey: cryptManager.key.publicKey
    })
    //console.debug(`-- send [${fragment}][${offset}]`, p)

    const bytes = WebPayload.encode(p).finish()
    console.log('-- sendPublicKey:', bytesToHex(bytes), " ", cryptManager.publicKey())
    this.wscs.send(bytes)
  }

  buildWebContact(contactId, name, chatId) {
    return WebContact.create({ contactId, name, chatId })
  }

  buildWebAccountDetails(name, email, phone, avatar) {
    let details = {}
    if (name) details.name = name
    if (email) details.email = email
    if (phone) details.phone = phone
    if (avatar) details.avatar = avatar
    return WebAccountDetails.create(details)
  }

  buildWebExtra(extra) {
    let e = []
    for (let prop in extra) {
      let item = WebExtra.create({ key: prop, value: extra[prop] })
      e.push(item)
    }
    console.log('-- buildWebExtra', e)
    return e
  }

  authorize(login, password) {
    console.log('-- authorize:', login, password)
    const credentials = WebCredentials.create({ login, password })
    return new Promise((resolve) => {
      this.onuserauthorized = function (args) {
        console.log('-- onuserauthorized', args)
        //this.#ping()
        resolve(args)
      }

      this.send(Requests.Login, { credentials })
    });
  }

  addContact(contactId, name) {
    console.log('-- addContact:', contactId, name)
    return new Promise(async (resolve) => {
      const reply = await this.verifyContact(contactId)
      if (reply.result != 0) {
        resolve(reply.result)
      } else {
        const title = name ? name : reply.name
        const contact = this.buildWebContact(contactId, title)
        this.send(Requests.AddContact, { contact })
        resolve(0)
      }
    });
  }

  verifyContact(contactId) {
    console.log('-- verifyContact:', contactId)
    const contact = this.buildWebContact(contactId)
    return new Promise((resolve) => {
      this.onverifyusercomplete = function (args) {
        resolve(args)
      }
      this.send(Requests.VerifyContact, { contact })
    });
  }

  getContacts() {
    return new Promise((resolve) => {
      this.ongetcontacts = function (args) {
        resolve(args)
      }
      this.send(Requests.GetContacts)
    });
  }

  createChat(users) {
    return new Promise(resolve => {
      this.oncreatechat = (args) => resolve(args.chatId)
      this.send(Requests.CreateChat, { users })
    })
  }

  getChats() {
    return new Promise((resolve) => {
      this.ongetchats = function (args) {
        resolve(args)
      }
      this.send(Requests.GetChats)
    });
  }

  getChatMessage(chatId, messageId) {
    return new Promise(resolve => {
      this.ongetchatmessage = (msg) => resolve(msg)
      this.send(Requests.GetChatMessage, { chatId, messageId })
    })
  }

  sendMessage(chatId, content, type, extra) {
    if (!type) type = 0
    return new Promise(resolve => {
      this.send(Requests.SendChatMessage, { chatId, content, type, extra })
      resolve(true)
    })
  }

  sendFileMessage(chatId, files, type) {
    console.log('-- sendChatFile', { chatId, type })
    return new Promise(resolve => {
      const webclient = this
      for (let i = 0; i < files.length; i++) {
        const item = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          let data = btoa(e.target.result)
          let extra = new ChatExtra()
          extra.setOriginalName(item.name)
          extra.setFileSize(item.size)
          extra = webclient.buildWebExtra(extra)
          console.log(data)
          webclient.send(Requests.SendChatFile, { chatId, file: data, type, extra })
        }
        reader.readAsBinaryString(item)
      }
      resolve()
    })
  }

  #ping() {
    this.pingCount = 0
    this.pingTid = setInterval(() => {
      this.pingCount++
      if (this.pingCount >= 3) {
        clearInterval(this.pingTid)
        // TODO: you lost connection
        console.error('-- you lost connection')
      } else {
        this.send(Requests.Ping)
        console.log('-- ping', this.pingCount)
      }
    }, 20000);
  }

  #onReplyCallback(args) {
    switch (args.action) {
      case Requests.GetContacts:
        if (this.ongetcontacts) this.ongetcontacts(args.contacts)
        break
      case Requests.GetChats:
        if (this.ongetchats) this.ongetchats(args.chats)
        break
      case Requests.CreateChat:
        console.debug('-- CreateChat', args)
        if (this.oncreatechat) this.oncreatechat(args)
        break
      case Requests.GetChatMessage:
        console.debug('-- GetChatMessage', args)
        if (this.ongetchatmessage) this.ongetchatmessage(args)
        break
    }
  }
}

export { WebClient }
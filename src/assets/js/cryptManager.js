const _sodium = require('libsodium-wrappers')

function isUint8Array(arr) {
  return (arr instanceof Uint8Array)
}

class CryptManager {
  constructor() {
    this.key = {}
  }

  initialize(keys) {
    return new Promise(resolve => {
      (async () => {
        await _sodium.ready
        console.log('-- libsodium ready', _sodium)

        if (Object.keys(keys).length === 0) {
          this.generateKeyPair()
        } else {
          console.log('-- keys:', keys.publicKey, keys.privateKey)
          this.key.publicKey = _sodium.from_hex(keys.publicKey)
          this.key.privateKey = _sodium.from_hex(keys.privateKey)
        }
        console.log('-- libsodium privateKey', this.key.privateKey)
        console.log('-- libsodium publicKey', this.key.publicKey)
        resolve()
      })()
    })
  }

  generateKeyPair() {
    this.key = _sodium.crypto_box_keypair()
    console.log('-- generateKeyPair:', this.key, this.publicKey())
  }

  publicKey() {
    return _sodium.to_hex(this.key.publicKey)
  }

  keys() {
    return {
      publicKey: this.publicKey(),
      privateKey: _sodium.to_hex(this.key.privateKey)
    }
  }

  encrypt(pubKeyReceiver, message) {
    if (!isUint8Array(pubKeyReceiver))
      pubKeySender = new Uint8Array(pubKeyReceiver)
    if (!isUint8Array(message))
      message = new Uint8Array(message)

    //console.debug('-- encrypt:', pubKeyReceiver, message)

    const nonce = _sodium.randombytes_buf(_sodium.crypto_box_NONCEBYTES)
    const cipher = _sodium.crypto_box_easy(message, nonce, pubKeyReceiver, this.key.privateKey)

    let result = new Uint8Array(nonce.length + cipher.length)
    result.set(nonce)
    result.set(cipher, nonce.length)
    return result
  }

  decrypt(pubKeySender, message) {
    if (!isUint8Array(pubKeySender))
      pubKeySender = new Uint8Array(pubKeySender)

    if (!isUint8Array(message))
      message = new Uint8Array(message)
    if (message.length == 0)
      return new Uint8Array()

    //console.debug('-- decrypt:', pubKeySender, message)

    const nonce = message.slice(0, _sodium.crypto_box_NONCEBYTES)
    const cipher = message.slice(_sodium.crypto_box_NONCEBYTES)
    const result = _sodium.crypto_box_open_easy(cipher, nonce, pubKeySender, this.key.privateKey)

    return result
  }
}

//export default CryptManager
export { CryptManager }
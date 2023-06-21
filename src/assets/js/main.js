import { WebClient } from './webClient'

let webClient = new WebClient();

/*
webClient.onblockusercomplete = (args) => EventBus.onBlockContact(args)
webClient.onunblockusercomplete = (args) => EventBus.onUnblockContact(args)
webClient.onunblockallcomplete = (args) => EventBus.$emit('all-contacts-unblocked', args)
webClient.onverifyusercomplete = (args) => EventBus.onVerifyUser(args)
webClient.onchatchanged = (args) => EventBus.$emit('chat-changed', args)
webClient.onchatttlchanged = (args) => store.dispatch('chatTtlChanged', args)
webClient.onchatunreadchanged = (args) => EventBus.$emit('chat-unread-changed', args)
webClient.onchatttlmessageprogress = (args) => EventBus.$emit('chat-ttl-message-progress', args)
webClient.onchattypingupdated = (args) => EventBus.$emit('chat-typing-updated', args)
webClient.onchatmessageupdated = (args) => EventBus.$emit('chat-message-updated', args)
webClient.onshowmessage = (args) => EventBus.$emit('show-message', args)
webClient.onstatuschanged = (args) => store.dispatch('updateConnectionState', args.state)
*/

window.webClient = webClient
/**
 * Chat message metadata
 */
export default class ChatExtra {
  constructor() {
  }

  setOriginalName(name) {
    this.originalName = name
  }

  setDuration(duration) {
    this.duration = '' + duration
  }

  setFileSize(fileSize) {
    this.fileSize = '' + fileSize
  }

  setAvatarImage(avatarImage) {
    this.avatarImage = avatarImage
  }

  setChatUuid(chatUuid) {
    this.chatUuid = chatUuid
  }

  setChatTitle(chatTitle) {
    this.chatTitle = chatTitle
  }

  setChatImage(chatImage) {
    this.chatImage = chatImage
  }

  setUserMadeScreenshot(flag) {

  }

  setNotificationType(type) {

  }

  setReplyId(messageId) {
    this.replyId = messageId
  }
}

/// List of core events
export const Events = {
  StatusChanged: 0,
  ServerNameReceived: 1,
  ShowMessage: 2,
  ConferenceStarted: 3,
  ConferenceEnded: 4,
  ConferenceSuspended: 5,
  ConferenceResumed: 6,
  IncomingCall: 7,
  UserListChanged: 8,
  UserAuthorized: 9,
  UserRegistered: 10,
  ChatChanged: 12,
  ChatDetailsChanged: 13,
  ChatMessagesRemoved: 14,
  ChatMessageUpdated: 15,
  ChatMessageStateChanged: 16,
  ChatMessageRemovedRemotely: 17,
  ChatMessageReceived: 18,
  ChatMessageSendingDone: 19,
  ChatTtlMessageProgress: 20,
  ChatTtlChanged: 21,
  ChatTypingEvent: 22,
  FileSent: 23,
  FileReceived: 24,
  FileProgress: 25,
  RecentChanged: 26,
  ContactsSyncDone: 27,
  ContactAvatarUpdated: 28,
  AccountDetailsSet: 29,
  AccountAvatarSet: 30,
  VerifyUserComplete: 31,
  LoadDefaultContacts: 32,
  BlockUserComplete: 33,
  UnblockUserComplete: 34,
  UnblockUsersComplete: 35,
  PlayMediaFile: 36,
  StopMediaFile: 37,
  ChatUnreadChanged: 38,
}

export const DataType = {
  Event: 0,
  Request: 1,
  Reply: 2,
}

export const Requests = {
  // contact management
  GetContacts: 0,
  AddContact: 1,
  RemoveContact: 2,
  RemoveAllContacts: 3,
  BlockContact: 4,
  UnblockContact: 5,
  UnblockAllContacts: 6,
  GetBlockedContacts: 7,
  VerifyContact: 8,
  ///GetContactDetails: 9, no sense use GetContacts
  FetchAccountDetails: 10,
  UpdateAccountDetails: 11,
  Logout: 12,
  Login: 13,

  // chat management
  GetChats: 100,
  GetChatMessages: 101,
  GetChatMessage: 102,
  GetChatTtl: 103,
  GetChatUnreadCount: 104,
  GetUnreadCount: 105,
  RemoveChat: 106,
  RestoreDraft: 107,
  StoreDraft: 108,
  ToggleTimerMonitoring: 109,
  SendChatTyping: 110,
  RemoveChatMessage: 111,
  SendChatMessage: 112,
  SendChatFile: 113,
  ForwardChatMessage: 114,
  DecodeFile: 115,
  DecodeFileToFile: 116,
  ClearChatMessages: 117,
  SetChatMuted: 118,
  MarkReadChatMessage: 119,
  CreateChat: 121,
  SetChatDetails: 122,
  AddUsersToChat: 123,
  OpenSingleChat: 124,
  SendChatTtl: 125,
  LeaveChat: 126,

  // calls
  GetRecentCalls: 200,

  ReadFile: 1000,
  WebClientAuth: 1001,
  Ping: 1002,
}

export const MessageTypes = {
  Text: 0,
  Image: 1,    // Image file
  Location: 2, // GPS coordinates
  Contact: 3,  // User contact id
  Timer: 4,
  Video: 5,    // Video file
  Document: 6, // Any attachment
  Audio: 7,    // Audio file  
  UserLeft: 8,
  UserAdded: 9,
  Remove: 10,
  ChatDetails: 11,
}

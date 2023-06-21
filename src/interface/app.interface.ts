export interface AppRequest {
    name: string,
    method: string,
    args: AppArgument[]
}

export interface AppArgument {
    name: string,
    type: string,
    required?: boolean
}

export interface DropDownOption {
    name: string,
    value: string | number
}

export interface AutorizeResp {
    contactId: string,
    email: string,
    fingerprint: string,
    name: string,
    phone: string,
    state: number
}

export interface getChatResp {
    chatId: number,
    users: string[]
    type: number,
    title: string,
    unread: number,
    ttl: number,
    muted: boolean,
    draft: string,
    lastMessageType: number,
    lastMessageUser: string,
    lastMessage: string,
    sent: boolean,
    when: string,
    avatar: Blob
}

export interface message {
    when: string;
    user: string;
    message: string;
}
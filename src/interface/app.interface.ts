export interface AppRequest {
    name: string,
    method: string,
    args: AppArgument[]
}

export interface AppArgument {
    name: string,
    type: string,
}
export interface AppRequest {
    name: string,
    method: string,
    args: AppArgument[]
}

export interface AppArgument {
    name: string,
    type: string,
}

export interface DropDownOption {
    name: string,
    value: string | number
}
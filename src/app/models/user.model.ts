export interface User {
    _id: string
    name: string
    coins: number
    moves: Array<string>
}
export interface UserFilter {
    term: string
}

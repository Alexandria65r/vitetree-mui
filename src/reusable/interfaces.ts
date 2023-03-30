export type MessageThread = {
    text: string,
    owner: boolean
    name: string
    type: 'text'|'reply' | 'image'|'audio'
}
export type Card = {
    _id: string
   // name:string
    owner: string
    cardNumber: string
    expires: string
    cvc: string
    preffered: boolean
    createdAt?: string
}



export const CardModel: Card = {
    _id: '',
    owner: '',
  //  name: '',
    cardNumber: '',
    expires: '',
    cvc: '',
    preffered: false
}
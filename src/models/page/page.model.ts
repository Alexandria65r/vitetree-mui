import { Asset } from "../../reusable/interfaces";


export type Star ={
    
}
export type Payout ={

}


export type Page = {
    name: string;
    pageId: string;
    earnings: {
        balance: number;
        activity: {
            payouts:Payout;
            stars: Star
        }
    },
    imageAssets: {
        profile: Asset;
        background: Asset;
    };
    createdAt: string;
    updatedAt?: string;
}
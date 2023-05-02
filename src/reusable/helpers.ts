import moment from "moment";
import { Choice } from "./interfaces";

export const cartegories = ["sports", "programming", "health", "business"];
export const questionChoices: any = {
    a: {
        choice: 'a',
        ans: '',
        isCorrect: false
    },
    b: {
        choice: 'b',
        ans: '',
        isCorrect: false
    },
    c: {
        choice: 'c',
        ans: '',
        isCorrect: false
    },
    d: {
        choice: 'd',
        ans: '',
        isCorrect: false
    }
}



export function normalizedDate(createdAt: string) {
    if (moment(createdAt).fromNow().includes("month ago")) {
        return moment(createdAt)
            .fromNow()
            .replace("a month ago", "1m")
            .replace(" ", "");
    } else if (moment(createdAt).fromNow().includes("months ago")) {
        return moment(createdAt)
            .fromNow()
            .replace("months ago", "m")
            .replace(" ", "");
    } else if (moment(createdAt).fromNow().includes("day ago")) {
        return moment(createdAt)
            .fromNow()
            .replace("a day ago", "1d")
            .replace(" ", "");
    } else if (moment(createdAt).fromNow().includes("days ago")) {
        return moment(createdAt)
            .fromNow()
            .replace("days ago", "d")
            .replace(" ", "");
    } else if (moment(createdAt).fromNow().includes("seconds")) {
        return moment(createdAt)
            .fromNow()
            .replace("a few seconds ago", "now")
            .replace(" ", "");
    } else if (moment(createdAt).fromNow().includes("minute ago")) {
        return moment(createdAt).fromNow().replace("a minute ago", "1min");
    } else if (moment(createdAt).fromNow().includes("minutes ago")) {
        return moment(createdAt).fromNow().replace("minutes ago", "min");
    } else if (moment(createdAt).fromNow().includes("an hour")) {
        return moment(createdAt)
            .fromNow()
            .replace("an hour ago", "1h")
            .replace(" ", "");
    } else if (moment(createdAt).fromNow().includes("hours")) {
        return moment(createdAt)
            .fromNow()
            .replace("hours ago", "h")
            .replace(" ", "");
    } else {
        return moment(createdAt).fromNow();
    }
}
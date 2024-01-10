import { FormatMoney } from "format-money-js";
import moment from "moment";


export const subLimit = 4;
const fm = new FormatMoney({
    decimals: 2
})
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

export function ChannelInitials(name: string) {
    let initials: string = "";
    if (name) {
        const splitedNames = name.split(" ");
        const len = splitedNames.length;
        const first_name = splitedNames[0];
        const last_name = splitedNames[len - 1];

        if (splitedNames.length) {
            initials = `${first_name.slice(0, 1)}${last_name.slice(0, 1)}`;
        } else {
            initials = `${first_name.slice(0, 1)}`;
        }

        return initials;
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





export function nomalizedText(subjects: string[], index: number) {

    const subsLen = subjects.length - 1

    return subsLen === 1 && index !== subsLen ? ' and ' :
        index !== subsLen && index + 1 !== subsLen ? ',' :
            index + 1 === subsLen ? ' and ' : ''

}

/// to be used in tasks
// export function getSwapedTaskUserInfo(role: Role, task: Task) {
//     if (role === 'student') return task.tutorInfo;
//     return task.studentInfo
// }




export function formatMoney(amount: number) {
    return fm.from(amount) as any
}


export const colors = [
     "#ffffff",
    "#d0d1df",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#c5a5ff",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#b7a616",
    "#ffc107", //14
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
    "#2BD8AD",
    "#adadad",
    "#464646",
    "#111111",
];
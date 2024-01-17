import { FormatMoney } from "format-money-js";
import moment from "moment";
import { FaBug } from 'react-icons/fa'
import { MdOutlineWarning, MdOutlineReviews, MdOutlineAutoFixHigh } from 'react-icons/md'
import { BsFillCheckCircleFill } from 'react-icons/bs'

export const subLimit = 4;
const fm = new FormatMoney({
    decimals: 2
})
export const workspaceCartegories = ["sports", "programming", "health", "business"];
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


export function _pickerButtons(mode: string) {
    if (mode === 'tasks') {
        return {
            priority: [
                { value: 'High', accent: 'orange', type: 'priority', icon: '' },
                { value: 'Medium', accent: '', type: 'priority', icon: '' },
                { value: 'Urgent', accent: '', type: 'priority', icon: '' },
                { value: 'Low', accent: '', type: 'priority', icon: '' },
            ],
            status: [
                { value: 'Done', accent: '', type: 'status', icon: BsFillCheckCircleFill },
                { value: 'Working on it', accent: '', type: 'status', icon: MdOutlineAutoFixHigh },
                { value: 'Waiting Review', accent: '', type: 'status', icon: MdOutlineReviews },
                { value: 'Open for bugs', accent: '', type: 'status', icon: FaBug },
                { value: `Can't Reproduce`, accent: '', type: 'status', icon: MdOutlineWarning }
            ]
        }
    } else {
        return {
            priority: [
                { value: 'Must have', accent: '', type: 'priority', icon: "" },
                { value: 'Nice to have', accent: '', type: 'priority', icon: "" }
            ],
            status: [
                { value: 'Done', accent: '', type: 'status', icon: "" },
                { value: 'Development', accent: '', type: 'status', icon: "" },
                { value: 'Production', accent: '', type: 'status', icon: "" },
            ]
        }
    }

}

export function getNameInitials(name: string) {
    const splited = name.split(" ");
    if (splited.length > 1) {
        return `${splited[0].slice(0, 1)}${splited[1].slice(0, 1)}`
    } else {
        return `${name.slice(0, 1)}`
    }
}
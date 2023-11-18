import moment from "moment";
import { Choice, Role, TutorService } from "./interfaces";
import { Task } from "../models/task";

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


export const tutorServices: TutorService[] = [
    {
        price: '$24.60',
        label: 'private class',
        description: `Charge students for teaching them on live video 
        e.g google meet or any face to face platform for the meantime you
         can use any meeting app of your choice as we are in development of
          schooyard meet.🎉`
    },
    {
        price: '$12.60',
        label: 'assignment solving',
        description: `This service allows you to charge students who want 
        their school assignment get solved by you. Add it in your list of 
        services if you wish to offer this service.`
    },
    {
        price: '$9.60',
        label: 'prepare video tutorial',
        description: `If you sell your video courses on course marketplace 
        here on schooyard you're probably familiar with his service the only
        difference is that students will request a video tutorial specifically
        for them on their preffered topic and they'll pay for it. `
    }
]


export function nomalizedText(subjects: string[], index: number) {

    const subsLen = subjects.length - 1

    return subsLen === 1 && index !== subsLen ? ' and ' :
        index !== subsLen && index + 1 !== subsLen ? ',' :
            index + 1 === subsLen ? ' and ' : ''

}

/// to be used in tasks
export function getSwapedTaskUserInfo(role: Role, task: Task) {
    if (role === 'student') return task.tutorInfo;
    return task.studentInfo
}
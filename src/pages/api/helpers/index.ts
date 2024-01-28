//helper function that adds value to the channel's property photoURL


import { Person} from "../../../models/workspace";
import { User, UserModel } from "../../../models/user";

export async function getWorkspacePeople(people: Person[]) {
    const _people: Person[] = [];
    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        const user = await UserModel.findOne<User>({ email: person?.email ?? '' });
        if (user) {
            const first = user.firstName.slice(0, 1);
            const last = user.lastName.slice(0, 1);
            _people.push({
                id: user._id ?? '',
                email: user.email,
                username: `${user.firstName} ${user.lastName}`,
                initials: `${first}${last ?? ''}`,
                publicId: user.imageAsset?.publicId,
                createdAt: person.createdAt
            });
        }
    }

    return _people
}




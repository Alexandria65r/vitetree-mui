

export type Toast = {
    id: string
    message: string

}

export type Role = 'tutor' | 'student' | 'employer ' | 'job seeker' | ''


export type UserAvatarAsset = {
    publicId: string;
    secureURL: string;
    initials: string
}

export type UploadPayload = {
    base64: string | ArrayBuffer | null,
    resource_type: string
    preset: string
}
export type UploadResponse = {
    public_id: string
    secure_url: string
}


export type Signin = {
    provider: 'google-provider' | 'schooyard-provider'
    email: string,
    password?: string
    photoURL?: string
}

export type Asset = {
    publicId: string,
    secureURL: string
}



export type Task = {
    _id?: string;
    projectAccessId: string,
    featureType: string,
    parentFeatureId: string,
    name: string,
    description: string,
    createdAt?: string
    isAddingSubFeature?: boolean
    isAddingNote?: boolean
    isShowOptions?: boolean
    color?: string
    isCollapsed?: boolean,
    isNameEdditing?: boolean
    isPickerOpen?: boolean
    priority: {
        value: string,
        accent: string
    },
    status: {
        value: string,
        accent: string
    },
}


export type ImageAsset = {
    imageURL: string,
    public_id: string
}
export type ElementUpdate = {
    _id?: string,
    elementId: string
    author: {
        id: string,
        fullName: string,
        publicId: string,
    },
    editorJSON:  undefined
    createdAt?: string
    isEditMode: boolean
}




export type User = {
    _id?: string;
    firstName: string
    lastName: string,
    email: string,
    birthday: any,
    password: string;
    imageAsset: ImageAsset
    country: string;
    userIsAnArtist: boolean,
    createdAt: string
}

export type Signup = {
    firstName: string
    lastName: string,
    email: string,
    birthday: any,
    password: string;
    country: string;
    createdAt: string
}


export type InviteMember = {
    projectId: string
    author: string,
    username: string,
    email: string,
    message: string
}


export type Member = {
    id: string,
    username: string,
    publicId: string,
    initials: string
}

export interface uploadPayload {
    resource_type: string;
    preset: string;
    base64: string;
}


export type PickerBtn = {
    value: string,
    accent: string,
    type?: string
    icon?: any
}








import mongoose from "mongoose"

export type Project = {
    _id?: string
    authorId: string,
    name: string,
    description: string,
    roadmapId?: string,
    accessId: string,
    isAddingFeature?: boolean
    color?: string,
    elements: Element[]
    featuresCount: number,
    problems_to_solve: string
    has_competitors: string
    competitors_years_of_existing: string
    has_team: string
    has_existing_product: string
    has_features: string;
    dead_line: Date | null,
    setup: boolean,
    project_to_build?: string
    members?: string[],
    createdAt?: string,
    updatedAt?: string,
}



export const _ProjectSchema = new mongoose.Schema<Project>({
    authorId: String,
    name: String,
    roadmapId: String,
    accessId: String,
    color: String,
    description: String,
    updatedAt: String,
    problems_to_solve: String,
    has_competitors: String,
    competitors_years_of_existing: String,
    has_team: String,
    has_existing_product: String,
    has_features: String,
    dead_line: String,
    setup: Boolean,
    project_to_build: { type: String, required: false },
    members: { type: Array, required: false },
    createdAt: { type: Date, default: Date.now },
})

export const ProjectModel = mongoose.models?.project || mongoose.model("project", _ProjectSchema);


export const ProjectSchema: Project = {
    authorId: '',
    name: '',
    description: '',
    accessId: '',
    elements: [],
    featuresCount: 0,
    problems_to_solve: "",
    has_competitors: "",
    competitors_years_of_existing: "",
    has_team: "",
    has_existing_product: "",
    has_features: "",
    dead_line: null,
    setup: true,
    project_to_build: ""
}
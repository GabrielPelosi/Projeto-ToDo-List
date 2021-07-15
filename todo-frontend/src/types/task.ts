
export type TaskObject = {
    id: number;
    title: string;
    description: string;
}

export type TaskRequest = {
    title: string;
    description: string;
}


export type TaskPage = {
    content?: TaskObject[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: string;
    number: number;
    first:boolean;
    numberOfElements?: number;
    empty?: boolean;
}
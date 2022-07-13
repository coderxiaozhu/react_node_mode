export interface relatedTypes {
    body: string;
    categories: string[];
    createdAt: string;
    name: string;
    updatedAt: string;
    _id: string;
    __v: number
}

export interface articleDataTypes {
    body: string;
    categories: string[];
    createdAt: string;
    name: string;
    updatedAt: string;
    _id: string;
    __v: number
    related: relatedTypes[]
}
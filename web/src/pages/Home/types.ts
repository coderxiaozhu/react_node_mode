export interface newsListsType {
    _id: string;
    categories: string[];
    categoryName: string;
    createdAt: string;
    name: string;
    updatedAt: string;
    __v: number;
    body: string
}

export interface newsDataType { 
    _id: string;
    parents: string;
    name: string;
    __v: number;
    newsList: newsListsType[]
}

export interface skillDataType {
    icon: string;
    _id: string;
    description: string;
    name: string
}

export interface heroListsType {
    avatar: string;
    battleTips: string;
    categories: string[];
    items1: string[];
    items2: string[];
    name: string;
    teamTips: string;
    title: string;
    usageTips: string;
    _id: string;
    scores: {
        attack: number;
        difficult: number;
        skill: number;
        survive: number
    };
    skills: skillDataType[]
}

export interface heroDataType {
    name: string;
    parents: string;
    _id: string;
    __v: number;
    heroList: heroListsType[]
}
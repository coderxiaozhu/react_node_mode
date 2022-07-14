interface categoriesType {
    _id: string;
    parents: string;
    name: string;
    __v: number
}

interface itemType {
    icon: string;
    name: string;
    __v: number;
    _id: string;
}

interface skillType {
    description: string;
    icon: string;
    name: string;
    _id: string
}

export interface heroDataType {
    name: string;
    avatar: string;
    scores: {
        attack: number
        difficult: number
        skill: number
        survive: number
    },
    teamTips: string;
    usageTips: string;
    title: string;
    battleTips: string;
    _id: string;
    categories: categoriesType[],
    items1: itemType[],
    items2: itemType[],
    skills: skillType[]
}
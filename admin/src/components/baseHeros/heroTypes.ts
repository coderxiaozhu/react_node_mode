export interface selectType {
    children: string;
    key: string;
    value: string;
}

export interface OptionData {
    _id: string;
    name: string;
    icon: string;
    __v: number;
}

export interface cateDataType {
    _id: string;
    name: string;
    __v: number;
    parents: string;
}

export interface cateDataArr {
    cateData: cateDataType[]   
}

export interface selectTypes {
    key: string;
    name: string
}
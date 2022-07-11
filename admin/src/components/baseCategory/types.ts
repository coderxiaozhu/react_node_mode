export interface OptionData {
    _id: string;
    name: string;
    parents: {
        name: string;
        _id: string;
    }
    __v: number;
}
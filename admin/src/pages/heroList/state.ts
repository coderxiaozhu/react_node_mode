import { atom } from "jotai";
import { TableData } from "../../components/herosTable";
import { cateDataArr } from '../../components/baseHeros/heroTypes'

export interface scoreTypes {
    difficult: number;
    skill: number;
    attack: number;
    survive: number
}

// 模态框的标题
export const modelTitle = atom("")

// 编辑英雄某一项的id
export const editHerosId = atom("");

// 英雄称号
export const editHerosTitle = atom("");

// 英雄头像
export const editHerosAvatar = atom("")

// 获取表格数据
export const herosTableType = atom<TableData>({
    tableData: []
})
// 英雄分类
export const editCategory = atom<any>([]);

// 顺风出装
export const editItem1 = atom<any>([]);

// 逆风出装
export const editItem2 = atom<any>([]);

// 英雄评分
export const editHeroScore = atom<scoreTypes>({
    difficult: 0,
    skill: 0,
    attack: 0,
    survive: 0
});

// 英雄技能
export const editHeroSkills = atom([]);

// 英雄使用技巧
export const editHeroUseTips = atom("");

// 英雄对抗技巧
export const editHeroBattleTips = atom("");

// 英雄团战思路
export const editHeroTeamTips = atom("");
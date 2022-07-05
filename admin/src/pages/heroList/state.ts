import { atom } from "jotai";
import { TableData } from "../../components/herosTable";

// 模态框的显示
export const modelValue = atom(false);

// 模态框的标题
export const modelTitle = atom("")

// 编辑物品某一项的id
export const editHerosId = atom("");

// 编辑物品的某一项的值
export const editHerosName = atom("");

// 获取表格数据
export const herosTableType = atom<TableData>({
    tableData: []
})

// 编辑物品的icon
export const editHerosAvatar = atom("")
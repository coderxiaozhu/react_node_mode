import { atom } from "jotai";
// import { TableData } from "../../components/goodsTable";

// 模态框的显示
export const modelValue = atom(false);

// 模态框的标题
export const modelTitle = atom("")

// 编辑物品某一项的id
export const editGoodsId = atom("");

// 编辑物品的某一项的值
export const editGoodsName = atom("");

// 获取表格数据
// export const goodsTableData = atom<TableData>({
//     tableData: []
// })

// 编辑物品的icon
export const editGoodsIcon = atom("")
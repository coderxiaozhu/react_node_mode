import { atom } from "jotai";
import { TableData } from "../../components/categoryTable";

// 模态框的显示
export const modelValue = atom(false);

// 模态框的标题
export const modelTitle = atom("")

// 编辑分类某一项的id
export const editCategoryId = atom("");

// 编辑分类的某一项的值
export const editCategoryName = atom("");

// 获取表格数据
export const CategoryTableType = atom<TableData>({
    tableData: []
})

// 获取到编辑时某一项的userId
export const editCategoryUserId = atom("");
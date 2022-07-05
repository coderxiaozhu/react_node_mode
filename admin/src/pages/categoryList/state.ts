import { atom } from "jotai";
import { TableData } from "../../components/categoryTable";

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

// 保存menu选中某一项
export const menuPathValue = atom("");

// 获取表格的父级名称
export const categoryFather = atom("");
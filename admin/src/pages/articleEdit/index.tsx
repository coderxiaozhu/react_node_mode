import React, { memo, useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css'

import { ArticleWapper } from './style'
import { cateDataType } from './types';
import { getCategoryData } from '../../request/category';
import { addArticleData, saveEditArticle, getEditArticleId } from '../../request/article'

const { Option } = Select;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const titleLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 }
}

const Articleedit = memo(() => {
  // 文章分类数据
  const [cateData, setCateData] = useState<cateDataType[]>([]);
  // 文章内容的数据
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );
  // 用于跳转页面
  const navigate = useNavigate();
  // 获取编辑文章的文章项id, 用于获取数据
  const urlParams = useParams();
  // 获取表单的ref，用于操作表单项赋值
  const [form] = useForm();

  useEffect(() => {
    if(urlParams.id) {
      // 编辑文章的文章信息获取
      getEditArticleId(urlParams.id)
      .then(res => {
        // 将后台保存的数据设置到表单项中
        form.setFieldsValue({ ...res.data });
        // 保存文章内容
        setEditorState(BraftEditor.createEditorState(res.data.body));
      })
    }
    // 获取文章分类数据
    getCategoryData()
    .then(res => {
      setCateData(res.data)
    })
  }, [form, urlParams.id])

  const onFinish = (values: any) => {
    // 保存文章内容
    values.body = editorState.toHTML();
    if(urlParams.id) {
      // 保存编辑后的文章信息
      saveEditArticle(urlParams.id, { ...values })
      .then(res => {
        if(res.status === 200) {
          message.success("编辑成功");
          navigate("/home/article/articlelist");
        }
      })
    }else {
      // 保存新建后的文章信息
      addArticleData({...values})
      .then(res => {
        if(res.status === 200) {
          message.success("添加成功");
          navigate("/home/article/articlelist");
        }
      })
    }
  }

  const handleEditorChange = (e: any) => {
    setEditorState(e);
  };
  return (
    <ArticleWapper>
      <div className='title'>
        { urlParams.id ? "编辑" : "新建" }文章
      </div>
      <div className='content'>
        <Form
        onFinish={onFinish}
        form={form}
        name={"article"}
        >
          <Form.Item
          label="所属分类"
          name={"categories"}
          {...titleLayout}
          >
            <Select 
            placeholder="请选择所属分类" 
            mode='multiple'
            allowClear
            showArrow
            >
            {
              cateData.map((item: cateDataType) => {
                return (
                  <Option key={item._id} value={item._id}>
                    { item.name }
                  </Option>
                )
              })
            }
            </Select>
          </Form.Item>
          <Form.Item
          label="文章标题"
          name={"name"}
          {...titleLayout}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>
          <Form.Item
            label="文章内容"
            {...layout}
            rules={[{ required: true, message: "请输入文章内容内容" }]}
          >
            <BraftEditor
              value={editorState}
              onChange={e => handleEditorChange(e)}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ArticleWapper>
  )
})

export default Articleedit
import React, { memo, useCallback, useEffect, useState } from 'react';
import './index.css'
import {
  Modal,
  Input,
  Form,
  message
} from 'antd';
import { useAtom } from 'jotai';

import { 
  addGoodsData, 
  getEditGoodsId, 
  saveEditGoods,
} from '../../request/goods';
import { 
  modelValue, 
  modelTitle, 
  editGoodsId,
  goodsTableType,
  editGoodsIcon
} from '../../pages/goods/state';

const BaseGoodsModel = memo(() => {
    // 弹出框的显示和隐藏
    const [isModalVisible, setIsModalVisible] = useAtom(modelValue);
    // 分类名称
    const [goodsName, setGoodsName] = useState<string>("");
    // 弹出框的标题
    const [modalTitle, ] = useAtom(modelTitle);
    // 管理编辑分类的id
    const [goodsId, ] = useAtom(editGoodsId)
    // 获取表格数据
    const [, setTableData] = useAtom(goodsTableType);
    // 物品的图标
    const [goodsIcon, setGoodsIcon] = useAtom(editGoodsIcon)

    useEffect(() => {
      if(modalTitle === "编辑") {
        getEditGoodsId(goodsId)
        .then(res => {
          setGoodsName(res.data.name)
          setGoodsIcon(res.data.icon);
        })
      }
    }, [modalTitle, goodsId, setTableData, setGoodsIcon])

    const handleOk = useCallback(() => {
        // if(goodsName === "" || goodsIcon === "") {
        //   message.error("物品信息不得为空，需填写完整")
        // }else {
          if(modalTitle === "添加") {
            addGoodsData({
              name: goodsName,
              icon: goodsIcon,
            })
            .then(res => {
              message.success("添加成功");
              setGoodsName("");
            })
          }else if(modalTitle === "编辑") {
            saveEditGoods(goodsId, {
              _id: goodsId,
              name: goodsName,
              icon: goodsIcon,
              __v: 0
            })
            .then(res => {
              console.log(res);
            })
          }
        // }
        window.location.reload()
        setIsModalVisible(false);
    }, [goodsName, setIsModalVisible, modalTitle, goodsIcon, goodsId]);

    const handleCancel = () => {
      setIsModalVisible(false);
      setGoodsName("")
      if(modalTitle === "编辑") {
        getEditGoodsId(goodsId)
        .then(res => {
          setGoodsName(res.data.name)
          setGoodsIcon(res.data.icon);
        })
      }
    };

    const nameChange = (e: any) => {
      setGoodsName(e.target.value);
    }
    return (
        <>
            <Modal title={ modalTitle + "分类" } visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form.Item label={"物品名称"}>
                  <Input value={goodsName} onChange={nameChange} />
                </Form.Item>
                <Form.Item label={"物品图标"}>
                  <Input value={goodsIcon} onChange={nameChange} />
                </Form.Item>
            </Modal>
        </>
    )
})

export default BaseGoodsModel
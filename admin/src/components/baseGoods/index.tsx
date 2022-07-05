import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Input,
  Form,
  message,
  Upload,
  Button
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useParams, useNavigate } from 'react-router-dom';

import { 
  addGoodsData, 
  getEditGoodsId, 
  saveEditGoods,
} from '../../request/goods';
import { baseUrl } from '../../request';
import { 
  modelTitle, 
  editGoodsId,
  goodsTableType,
  editGoodsIcon
} from '../../pages/goods/state';
import { getGoodsTableData } from '../../pages/goods'
import {
  BaseGoodsWapper
} from './style'

const BaseGoodsModel = memo(() => {
    const [loading, ] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    // 物品名称
    const [goodsName, setGoodsName] = useState<string>("");
    // 弹出框的标题
    const [modalTitle, ] = useAtom(modelTitle);
    // 管理编辑分类的id
    const [goodsId, ] = useAtom(editGoodsId)
    // 获取表格数据
    const [, setTableData] = useAtom(goodsTableType);
    // 物品的图标
    const [goodsIcon, setGoodsIcon] = useAtom(editGoodsIcon);
    const urlParams = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      if(urlParams.id) {
        getEditGoodsId(goodsId)
        .then(res => {
          setGoodsName(res.data.name)
          setGoodsIcon(res.data.icon);
          setImageUrl(res.data.icon);
        })
      }else {
        setGoodsIcon("");
        setGoodsName("")
      }
    }, [modalTitle, goodsId, setTableData, setGoodsIcon, urlParams.id])

    const handleOk = useCallback(() => {
        if(urlParams.id) {
          saveEditGoods(goodsId, {
            _id: goodsId,
            name: goodsName,
            __v: 0
          })
          .then(res => {
            message.success("编辑成功");
          })
        }else {
          addGoodsData({
            name: goodsName,
            icon: goodsIcon,
          })
          .then(res => {
            message.success("添加成功");
            setGoodsName("");
          })
        }
        getGoodsTableData();
        navigate("/home/goods/list")
    }, [urlParams.id, navigate, goodsId, goodsName, goodsIcon]);

    const nameChange = (e: any) => {
      setGoodsName(e.target.value);
    }

    const beforeUpload = (file: RcFile) => {
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if(info.file.response) {
        setImageUrl(info.file.response.url)
        setGoodsIcon(info.file.response.url)
      }
    };

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
        <BaseGoodsWapper>
            <div className='title'>
              {
                urlParams.id ? "编辑分类" : "新建分类"
              }
            </div>
            <div className="content">
              <div className='content-edit'>
                <Form.Item label={"物品名称"}>
                  <Input value={goodsName} onChange={nameChange} />
                </Form.Item>
                <Form.Item label={"物品图标"}>
                        <Upload
                          name="file"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action={baseUrl + "/upload"}
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {imageUrl ? <img src={imageUrl} alt="物品" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                </Form.Item>
                <Button onClick={ e => handleOk() } type={"primary"}>保存</Button>
              </div>
            </div>
        </BaseGoodsWapper>
    )
})

export default BaseGoodsModel
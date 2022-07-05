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
  addHerosData, 
  getEditHerosId, 
  saveEditHeros,
} from '../../request/heros';
import { baseUrl } from '../../request';
import { 
  modelTitle, 
  editHerosId,
  herosTableType,
  editHerosAvatar
} from '../../pages/heroList/state';
import { getHerosTableData } from '../../pages/heroList'
import {
  BaseHerosWapper
} from './style'

const BaseHerosModel = memo(() => {
    const [loading, ] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    // 物品名称
    const [herosName, setHerosName] = useState<string>("");
    // 弹出框的标题
    const [modalTitle, ] = useAtom(modelTitle);
    // 管理编辑分类的id
    const [herosId, ] = useAtom(editHerosId)
    // 获取表格数据
    const [, setTableData] = useAtom(herosTableType);
    // 物品的图标
    const [herosAvatar, setHerosAvatar] = useAtom(editHerosAvatar);
    const urlParams = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      if(urlParams.id) {
        getEditHerosId(herosId)
        .then(res => {
          setHerosName(res.data.name)
          setHerosAvatar(res.data.avatar);
        })
      }else {
        setHerosAvatar("");
        setHerosName("")
      }
    }, [modalTitle, herosId, setTableData, setHerosAvatar, urlParams.id])

    const handleOk = useCallback(() => {
        if(urlParams.id) {
          saveEditHeros(herosId, {
            _id: herosId,
            name: herosName,
            __v: 0
          })
          .then(res => {
            message.success("编辑成功");
          })
        }else {
          addHerosData({
            name: herosName,
            avatar: herosAvatar,
          })
          .then(res => {
            message.success("添加成功");
            setHerosName("");
          })
        }
        getHerosTableData();
        navigate("/home/heros/list")
    }, [urlParams.id, navigate, herosId, herosName, herosAvatar]);

    const nameChange = (e: any) => {
      setHerosName(e.target.value);
    }

    const beforeUpload = (file: RcFile) => {
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if(info.file.response) {
        setHerosAvatar(info.file.response.url)
      }
    };

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
        <BaseHerosWapper>
            <div className='title'>
              {
                urlParams.id ? "编辑英雄" : "新建英雄"
              }
            </div>
            <div className="content">
              <div className='content-edit'>
                <Form.Item label={"英雄名称"}>
                  <Input value={herosName} onChange={nameChange} />
                </Form.Item>
                <Form.Item label={"英雄头像"}>
                        <Upload
                          name="file"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action={baseUrl + "/upload"}
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {herosAvatar ? <img src={herosAvatar} alt="英雄头像" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                </Form.Item>
                <Button onClick={ e => handleOk() } type={"primary"}>保存</Button>
              </div>
            </div>
        </BaseHerosWapper>
    )
})

export default BaseHerosModel
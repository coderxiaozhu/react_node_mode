import React, { memo, useEffect, useState } from 'react';
import {
    Row,
    Button,
    Form,
    Input,
    Upload,
    Col,
    FormInstance,
    message
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';

import { SkillWapper } from './style';
import { editHeroSkills } from '../../pages/heroList/state';
import { baseUrl } from '../../request';
const { TextArea } = Input;

const SkillEdit = memo(() => {
    const [loading, ] = useState(false);
    // 英雄的图标
    const [herosAvatar, setHerosAvatar] = useState<string>("");
    const [heroSkillData, setHeroSkillData] = useAtom(editHeroSkills);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [skillsImageUrl, setSkillsImageUrl] = useState<string[]>([]);

    const urlParams = useParams();
    
    useEffect(() => {
    }, [urlParams.id])
    
    // 上传技能图标
    const skillsIconChange = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === "done") {
            message.success("上传技能图标成功");
            let newArr = skillsImageUrl.concat(info.file.response.url)
            setSkillsImageUrl(newArr);
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.file;
    };
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <SkillWapper>
            <div className='content'>
                <Form.List name="skills">
                {(fields, { add, remove }) => (
                    <div>
                        <Row>
                        {fields.map(({ key, name, ...restField }, index) => (
                        <Col span={10} key={key} style={{ marginRight: "80px" }}>
                            <Form.Item
                            {...restField}
                            name={[name, 'skillName']}
                            rules={[{ required: true, message: '请输入技能名称' }]}
                            label="技能名称"
                            >
                                <Input placeholder="请输入技能名称" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                valuePropName="file"
                                getValueFromEvent={normFile}
                                name={[name, 'skillIcon']}
                                rules={[{ required: true, message: '请上传技能图标' }]}
                                label="技能图标"
                            >
                                <Upload
                                    name="file"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action={baseUrl + "/upload"}
                                    onChange={info => skillsIconChange(info)}
                                    >
                                        {skillsImageUrl ? (
                                            <img
                                                src={skillsImageUrl[index]}
                                                alt="技能图标"
                                                style={{ width: "100%" }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                            </Form.Item>
                            <Form.Item
                                name={[name, "skillDesc"]}
                                rules={[{ required: true, message: '请输入技能描述' }]}
                                label="技能描述"
                                >
                                <TextArea rows={4} placeholder="请输入技能描述" />
                            </Form.Item>
                            <Row>
                            <Col span={8} offset={8}>
                                <Button
                                    danger
                                    className="dynamic-delete-button"
                                    style={{ marginBottom: "80px" }}
                                    onClick={() => {
                                        skillsImageUrl.splice(index, 1)
                                        remove(name);
                                    }}
                                >
                                    删除此技能
                                </Button>           
                            </Col>
                            </Row>
                        </Col>
                        ))}
                        </Row>
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                添加技能
                            </Button>
                        </Form.Item>
                    </div>
                )}
                </Form.List>
            </div>
        </SkillWapper>
    )
})

export default SkillEdit
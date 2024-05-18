import React, { FC, useState } from 'react';
import { Avatar, Badge, Button, message, Upload } from 'antd';
import './ImageLoader.css';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { changeAvatar } from 'shared/api/userApi/userApi';
import { setUserData } from 'shared/store/user/userSlice';
import { useDispatch } from 'react-redux';
import { UploadRequestOption } from 'rc-upload/lib/interface';

const ACCEPT_TYPE = '.png, .jpeg, .jpg, .gif';
export const ImageLoader: FC = () => {
  const [uploadedFile, setUploadedFile] = useState<Blob>(new Blob());
  const dispatch = useDispatch();

  /**
   * Метод переопределения загрузки картинки
   * */
  const uploadImage = async (options: UploadRequestOption) => {
    const { file } = options;

    const fmData = new FormData();
    fmData.append('avatar', file);
    try {
      const user = await changeAvatar(fmData);
      if (user) {
        dispatch(setUserData(user));
        message.success('Аватар успешно изменён');
      }
    } catch (err) {
      message.error('Попробуйте загрузить другое изображение');
    }
  };

  const onChangeFile = async (info: UploadChangeParam) => {
    if (info.file.originFileObj) {
      setUploadedFile(info.file.originFileObj);
      info.fileList = [info.file.originFileObj];
    }
  };

  return (
    <Badge
      count={
        <Upload
          id="image-loader"
          accept={ACCEPT_TYPE}
          onChange={onChangeFile}
          showUploadList={false}
          customRequest={uploadImage}>
          <Button type="primary" shape="circle" icon={<UploadOutlined />} className="image-loader-button" />
        </Upload>
      }>
      <Avatar size={100} src={`${URL.createObjectURL(uploadedFile)}`} className="image-loader-avatar">
        U
      </Avatar>
    </Badge>
  );
};

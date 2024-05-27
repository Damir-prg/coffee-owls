import { Avatar, Flex, Tabs } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import './Profile.css';
import { UserProfile } from 'widgets/UserProfile';
import { UserOutlined } from '@ant-design/icons';
import { UserEdit } from 'widgets/UserEdit';
import { BaseUrlApi } from 'shared/config/config';
import { useSelector } from 'react-redux';
import { TRootState } from 'shared/store/store';
import { ImageLoader } from 'features/ImageLoader/ImageLoader';

enum EPROFILE_TAB {
  PREVIEW = 'preview',
  EDIT = 'edit',
}

const TABS = [
  {
    key: EPROFILE_TAB.PREVIEW,
    label: 'Просмотр',
    children: <UserProfile />,
  },
  {
    key: EPROFILE_TAB.EDIT,
    label: 'Редактирование',
    children: <UserEdit />,
  },
];
function Profile() {
  const user = useSelector((state: TRootState) => state.user.userData);

  const [currentTabKey, setCurrentTabKey] = useState<EPROFILE_TAB>(EPROFILE_TAB.PREVIEW);

  const onChangeTab = useCallback((key: string) => {
    setCurrentTabKey(key as EPROFILE_TAB);
  }, []);

  const $image = useMemo(() => {
    if (currentTabKey === EPROFILE_TAB.PREVIEW) {
      return (
        <Avatar size={100} icon={<UserOutlined />} src={user?.avatar ? `${BaseUrlApi}/resources/${user.avatar}` : ''} />
      );
    }
    return <ImageLoader />;
  }, [currentTabKey]);

  return (
    <Flex gap={32} align="center" vertical className="profile-wrapper">
      {$image}
      <Tabs
        items={TABS}
        onChange={onChangeTab}
        defaultActiveKey="preview"
        size="large"
        className="full-width profile-tabs"
        centered
      />
    </Flex>
  );
}

export default Profile;

import React, { FC } from 'react';
import { EditUserDataForm } from 'features/EditUserData';
import { Button, Flex,  } from 'antd';
import { USER_EDIT_FORM } from 'features/EditUserData/model/EditUserData.model';

export const UserEdit: FC = () => {
  return (
    <Flex gap={16} vertical>
      <EditUserDataForm />
      <Button type="primary" htmlType="submit" size="large" form={USER_EDIT_FORM}>
        Сохранить изменения
      </Button>
    </Flex>
  );
};

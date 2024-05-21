import React, { FC, useCallback } from 'react';
import { Form, message } from 'antd';
import { TUserFormData, USER_EDIT_FORM } from 'features/EditUserData/model/EditUserData.model';
import { changePassword } from 'shared/api/userApi/userApi';
import { useSelector } from 'react-redux';
import { TRootState } from 'shared/store/store';
import { EditUserDataFormFields } from 'features/EditUserData/ui/EditUserDataFormFields';

export const EditUserDataForm: FC = () => {
  const [form] = Form.useForm();

  const user = useSelector((state: TRootState) => state.user.userData);
  if (!user) {
    return null;
  }

  const handleSubmit = useCallback(async (data: TUserFormData) => {
    console.log(data);
    const { oldPassword, newPassword } = data;
    try {
      if (newPassword) {
        await changePassword({
          oldPassword,
          newPassword,
        });
        message.success('Пароль успешно изменён');
      }
    } catch (err) {
      message.error('Что-то пошло не так, повторите попытку позже');
    }
  }, []);

  return (
    <Form form={form} name={USER_EDIT_FORM} onFinish={handleSubmit} initialValues={user}>
      <EditUserDataFormFields />
    </Form>
  );
};

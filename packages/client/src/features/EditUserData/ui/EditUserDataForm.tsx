import React, { FC } from 'react';
import { Form, Input, message } from 'antd';
import { TUserFormData, USER_EDIT_FIELDS, USER_EDIT_FORM } from 'features/EditUserData/model/EditUserData.model';
import { changePassword } from 'shared/api/userApi/userApi';
import { useSelector } from 'react-redux';
import { TRootState } from 'shared/store/store';

export const EditUserDataForm: FC = () => {
  const [form] = Form.useForm();

  const user = useSelector((state: TRootState) => state.user.userData);
  if (!user) {
    return null;
  }

  const handleSubmit = async (data: TUserFormData) => {
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
  };

  const $fields = USER_EDIT_FIELDS.map(field => {
    const $input = (() => {
      if (field.type === 'password') {
        return <Input.Password size="large" placeholder={field.placeholder} />;
      }
      return <Input size="large" placeholder={field.placeholder} type={field.type} />;
    })();

    return (
      <Form.Item key={field.name} name={field.name} rules={field.rules} dependencies={field.dependencies}>
        {$input}
      </Form.Item>
    );
  });

  return (
    <Form form={form} name={USER_EDIT_FORM} onFinish={handleSubmit} initialValues={user}>
      {$fields}
    </Form>
  );
};

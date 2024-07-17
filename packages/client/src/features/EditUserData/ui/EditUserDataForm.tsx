import React, { FC, useCallback } from 'react';
import { Form, message } from 'antd';
import { TUserFormData, USER_EDIT_FORM } from 'features/EditUserData/model/EditUserData.model';
import { changePassword, updateProfileData, updateUser } from 'shared/api/userApi/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'shared/store/store';
import { EditUserDataFormFields } from 'features/EditUserData/ui/EditUserDataFormFields';
import { setUserData } from 'shared/store/user/userSlice';

export const EditUserDataForm: FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const user = useSelector((state: TRootState) => state.user.userData);
  if (!user) {
    return null;
  }

  const handleSubmit = useCallback(async (data: TUserFormData) => {
    const { oldPassword, newPassword, ...userData } = data;
    try {
      if (newPassword) {
        await changePassword({
          oldPassword,
          newPassword,
        });
        message.success('Пароль успешно изменён');
      }

      if (userData.display_name === undefined) {
        userData.display_name = '';
      }
      const updatedUser = await updateProfileData(userData);
      if (updatedUser) {
        dispatch(setUserData(updatedUser));
        await updateUser(updatedUser);
      }
      message.success('Данные успешно изменены');
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

import { USER_EDIT_FIELDS } from 'features/EditUserData/model/EditUserData.model';
import { Form, Input } from 'antd';
import React, { FC } from 'react';

export const EditUserDataFormFields: FC = () => {
  return (
    <>
      {USER_EDIT_FIELDS.map(field => {
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
      })}
    </>
  );
};

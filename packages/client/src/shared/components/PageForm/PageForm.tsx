import './PageForm.css';
import type { FormProps } from 'antd';
import { IPageFormProps } from './PageForm.model';
import { Flex, Form, Input, Button, Typography } from 'antd';
import Link from '../Link/Link';

const onFinish: FormProps['onFinish'] = values => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo);
};

const PageForm: React.FC<IPageFormProps> = ({ formName, title, fields, button, link }) => {
  const { Title } = Typography;

  return (
    <Form name={formName} className="form" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      <Flex vertical align="center" gap={48}>
        <Title className="title__primary" level={2}>
          {title}
        </Title>
        <Flex className="form__fields" vertical align="center">
          {fields.map(field => (
            <Form.Item
              className="form__field"
              key={field.name}
              name={field.name}
              dependencies={field.dependencies}
              rules={field.rules}>
              {field.type === 'password' ? (
                <Input.Password size="large" placeholder={field.placeholder} />
              ) : (
                <Input size="large" placeholder={field.placeholder} />
              )}
            </Form.Item>
          ))}
        </Flex>
        <Flex className="form__control" vertical align="center">
          <Form.Item className="form__field">
            <Button type={button.type} size="large" htmlType="submit" block>
              {button.text}
            </Button>
          </Form.Item>
          {link && <Link text={link.text} path={link.path} />}
        </Flex>
      </Flex>
    </Form>
  );
};

export default PageForm;

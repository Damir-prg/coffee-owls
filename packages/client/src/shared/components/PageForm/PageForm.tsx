import './PageForm.css';
import type { FormProps } from 'antd';
import { IPageFormProps, TFieldType } from './PageForm.model';
import { Flex, Form, Input, Button, Typography } from 'antd';
import Link from '../Link/Link';

const PageForm: React.FC<IPageFormProps> = ({ formName, title, fields, link }) => {
  const { Title } = Typography;

  const onFinish: FormProps['onFinish'] = values => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  function defineInput(field: TFieldType) {
    switch (field.type) {
      case 'password':
        return <Input.Password size="large" placeholder={field.placeholder} />;
      default:
        return <Input size="large" placeholder={field.placeholder} />;
    }
  }

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
              {defineInput(field)}
            </Form.Item>
          ))}
        </Flex>
        <Flex className="form__control" vertical align="center">
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" block>
              Зарегистрироваться
            </Button>
          </Form.Item>
          {link && <Link text={link.text} path={link.path} />}
        </Flex>
      </Flex>
    </Form>
  );
};

export default PageForm;

import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const SettingsButton = () => {
  return (
    <Button className="zero-border-radius" size="large">
      <SearchOutlined /> Управление
    </Button>
  );
};

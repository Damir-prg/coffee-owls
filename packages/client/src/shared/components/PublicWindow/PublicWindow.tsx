import './PublicWindow.css';
import { Flex } from 'antd';

function PublicWindow({ children }: { children?: React.ReactNode }) {
  return <Flex className="public-window">{children}</Flex>;
}

export default PublicWindow;

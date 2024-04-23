import './Link.css';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TLinkType } from './Link.models';

function Link({ text, path }: TLinkType) {
  const navigate = useNavigate();

  const { Text } = Typography;

  function onClick() {
    navigate('/' + path);
  }

  return (
    <Text className="link" onClick={onClick}>
      {text}
    </Text>
  );
}

export default Link;

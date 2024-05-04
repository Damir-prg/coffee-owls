import './Link.css';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TLinkType } from './Link.models';

function Link({ text, path, size = 'medium', weight = 'normal' }: TLinkType) {
  const navigate = useNavigate();

  const { Text } = Typography;

  function onClick() {
    navigate('/' + path);
  }

  return (
    <Text className={`link link-${weight} link-${size}`} onClick={onClick}>
      {text}
    </Text>
  );
}

export default Link;

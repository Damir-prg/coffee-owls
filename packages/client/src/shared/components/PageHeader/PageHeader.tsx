import './PageHeader.css';
import EROUTES from '../../../shared/RoutesEnum';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlayCircleOutlined, HomeOutlined, TrophyOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Button } from 'antd';
import { useEffect, useState } from 'react';

const items: MenuProps['items'] = [
  {
    label: 'Играть',
    key: EROUTES.GAME,
    icon: <PlayCircleOutlined />,
  },
  {
    label: 'Главная',
    key: EROUTES.HOME,
    icon: <HomeOutlined />,
  },
  {
    label: 'Рейтинг',
    key: EROUTES.RATING,
    icon: <TrophyOutlined />,
  },
  {
    label: 'Профиль',
    key: EROUTES.PROFILE,
    icon: <UserOutlined />,
  },
  {
    label: 'Форум',
    key: EROUTES.FORUM,
    icon: <TeamOutlined />,
  },
];

function PageHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [currentKey, setCurrentKey] = useState('key');

  function handleLogout() {
    navigate('/' + EROUTES.SIGN_IN);
  }

  const onClick: MenuProps['onClick'] = e => {
    setCurrentKey(e.key);
    navigate('/' + e.key);
  };

  useEffect(() => {
    setCurrentKey(pathname.replace(/^\//, ''));
    return () => {
      setCurrentKey('key');
    };
  }, []);

  return (
    <nav className="header__nav">
      <Menu onClick={onClick} selectedKeys={[currentKey]} mode="horizontal" items={items} />
      <Button onClick={handleLogout} className="header__logout" type="primary">
        ВЫЙТИ
      </Button>
    </nav>
  );
}

export default PageHeader;

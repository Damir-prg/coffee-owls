import './PageHeader.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from 'shared/store/user/userActions';
import type { TAppDispatch } from 'shared/store/store';
import EROUTES from 'shared/lib/RoutesEnum';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlayCircleOutlined, HomeOutlined, TrophyOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Button, Typography } from 'antd';

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

  const { Text } = Typography;

  const [logoutError, setLogoutError] = useState(false);
  const [currentKey, setCurrentKey] = useState('key');

  const dispatch = useDispatch<TAppDispatch>();

  async function onLogout() {
    setLogoutError(false);
    const resultAction = await dispatch(logoutAction());
    if (logoutAction.rejected.match(resultAction)) {
      setLogoutError(true);
    }
  }

  const onClick: MenuProps['onClick'] = e => {
    navigate('/' + e.key);
  };

  useEffect(() => {
    setCurrentKey(pathname.replace(/^\//, ''));
    return () => {
      setCurrentKey('key');
    };
  }, [pathname]);

  return (
    <nav className="header__nav">
      <Menu onClick={onClick} selectedKeys={[currentKey]} mode="horizontal" items={items} />
      <Button onClick={onLogout} className="header__logout" type="primary">
        ВЫЙТИ
      </Button>
      {logoutError && <Text className="header__error">К сожалению, произошла ошибка</Text>}
    </nav>
  );
}

export default PageHeader;

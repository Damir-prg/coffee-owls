import './PageHeader.css';
import EROUTES from '../../../shared/RoutesEnum';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlayCircleOutlined, HomeOutlined, TrophyOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Flex, Button } from 'antd';

const headerNavLinks = [
  {
    link: EROUTES.GAME,
    title: 'Играть',
    icon: <PlayCircleOutlined className="header__nav-icon" />,
  },
  {
    link: EROUTES.HOME,
    title: 'Главная',
    icon: <HomeOutlined className="header__nav-icon" />,
  },
  {
    link: EROUTES.RATING,
    title: 'Рейтинг',
    icon: <TrophyOutlined className="header__nav-icon" />,
  },
  {
    link: EROUTES.PROFILE,
    title: 'Профиль',
    icon: <UserOutlined className="header__nav-icon" />,
  },
  {
    link: EROUTES.FORUM,
    title: 'Форум',
    icon: <TeamOutlined className="header__nav-icon" />,
  },
];

function PageHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/' + EROUTES.SIGN_IN);
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {headerNavLinks.map((item, i) => (
          <li className="header__nav-item" key={i}>
            <NavLink to={`/${item.link}`}>
              {({ isActive }) => (
                <Flex className={`header__nav-link ${isActive ? 'header__nav-link_type_active' : ''}`}>
                  {item.icon}
                  <span className="header__nav-text">{item.title}</span>
                </Flex>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <Button size="large" onClick={handleLogout} className="header__logout" type="primary">
        Выйти
      </Button>
    </nav>
  );
}

export default PageHeader;

import './PageHeader.css';
import EROUTES from '../../../shared/RoutesEnum';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlayCircleOutlined, HomeOutlined, TrophyOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Flex, Button } from 'antd';

function PageHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/' + EROUTES.SIGN_IN);
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <NavLink to={`/${EROUTES.GAME}`}>
            {({ isActive }) => (
              <Flex className={`header__nav-link ${isActive ? 'header__nav-link_type_active' : ''}`}>
                <PlayCircleOutlined className="header__nav-icon" />
                <span className="header__nav-text">Играть</span>
              </Flex>
            )}
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink to={`/${EROUTES.HOME}`}>
            {({ isActive }) => (
              <Flex className={`header__nav-link ${isActive ? 'header__nav-link_type_active' : ''}`}>
                <HomeOutlined className="header__nav-icon" />
                <span className="header__nav-text">Главная</span>
              </Flex>
            )}
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink to={`/${EROUTES.RATING}`}>
            {({ isActive }) => (
              <Flex className={`header__nav-link ${isActive ? 'header__nav-link_type_active' : ''}`}>
                <TrophyOutlined className="header__nav-icon" />
                <span className="header__nav-text">Рейтинг</span>
              </Flex>
            )}
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink to={`/${EROUTES.PROFILE}`}>
            {({ isActive }) => (
              <Flex className={`header__nav-link ${isActive ? 'header__nav-link_type_active' : ''}`}>
                <UserOutlined className="header__nav-icon" />
                <span className="header__nav-text">Профиль</span>
              </Flex>
            )}
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink to={`/${EROUTES.FORUM}`}>
            {({ isActive }) => (
              <Flex className={`header__nav-link ${isActive ? 'header__nav-link_type_active' : ''}`}>
                <TeamOutlined className="header__nav-icon" />
                <span className="header__nav-text">Форум</span>
              </Flex>
            )}
          </NavLink>
        </li>
      </ul>
      <Button size="large" onClick={handleLogout} className="header__logout" type="primary">
        Выйти
      </Button>
    </nav>
  );
}

export default PageHeader;

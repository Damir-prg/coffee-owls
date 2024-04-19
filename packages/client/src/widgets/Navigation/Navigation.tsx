import { Link } from 'react-router-dom';
import './Navigation.css';
import EROUTES from '../../shared/RoutesEnum';

function Navigation() {
  return (
    <nav>
      <Link to={`/${EROUTES.SIGN_IN}`}>Авторизация</Link>
      <Link to={`/${EROUTES.SIGN_UP}`}>Регистрация</Link>
      <Link to={`/${EROUTES.HOME}`}>Главная</Link>
      <Link to={`/${EROUTES.PROFILE}`}>Профиль</Link>
      <Link to={`/${EROUTES.GAME}`}>Игра</Link>
      <Link to={`/${EROUTES.RATING}`}>Рейтинг</Link>
      <Link to={`/${EROUTES.FORUM}`}>Форум</Link>
      <Link to={`/${EROUTES.FORUM}/topic/123`}>Топик</Link>
      <Link to={`/${EROUTES.INTERNAL_ERROR}`}>Ошибка 500</Link>
      <Link to="/invalid-path">Ошибка 404</Link>
    </nav>
  );
}

export default Navigation;

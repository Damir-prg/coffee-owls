import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from 'pages/Login/Login';
import Registration from 'pages/Registration/Registration';
import Home from 'pages/Home/Home';
import Profile from 'pages/Profile/Profile';
import Game from 'pages/Game/Game';
import LeaderBoard from 'pages/LeaderBoard/LeaderBoard';
import Forum from 'pages/Forum/Forum';
import Topic from 'pages/Topic/Topic';
import InternalError from 'pages/InternalError/InternalError';
import NotFound from 'pages/NotFound/NotFound';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <div className="app">
      <nav>
        <Link to="/sign-in">Авторизация</Link>
        <Link to="/sign-up">Регистрация</Link>
        <Link to="/">Главная</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/game">Игра</Link>
        <Link to="/rating">Рейтинг</Link>
        <Link to="/forum">Форум</Link>
        <Link to="/forum/topic/123">Топик</Link>
        <Link to="/internal-error">Ошибка 500</Link>
        <Link to="/not-found">Ошибка 404</Link>
      </nav>

      <Routes>
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Registration />} />

        <Route path="" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="game" element={<Game />} />
        <Route path="rating" element={<LeaderBoard />} />
        <Route path="forum" element={<Forum />}>
          <Route path="topic/:id" element={<Topic />} />
        </Route>

        <Route path="internal-error" element={<InternalError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

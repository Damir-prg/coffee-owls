import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EROUTES from 'shared/lib/RoutesEnum';
import { useAuth } from 'shared/context/AuthContext';
import { getUser } from 'shared/api/authApi';
import { Spin } from 'antd';
import PublicLayout from 'shared/components/PublicLayout/PublicLayout';
import PageLayout from 'shared/components/PageLayout/PageLayout';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import Game from '../../pages/Game/Game';
import LeaderBoard from '../../pages/LeaderBoard/LeaderBoard';
import Forum from '../../pages/Forum/Forum';
import Topic from '../../pages/Topic/Topic';
import InternalError from '../../pages/InternalError/InternalError';
import NotFound from '../../pages/NotFound/NotFound';

function WithRoutes() {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    getUser()
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }, []);

  if (isLoadingData) {
    return <Spin>Загрузка..</Spin>;
  }

  return (
    <Routes>
      {isLoggedIn ? (
        <Route element={<PageLayout />}>
          <Route path={EROUTES.HOME} element={<Home />} />
          <Route path={EROUTES.PROFILE} element={<Profile />} />
          <Route path={EROUTES.GAME} element={<Game />} />
          <Route path={EROUTES.RATING} element={<LeaderBoard />} />
          <Route path={EROUTES.FORUM} element={<Forum />} />
          <Route path={`${EROUTES.FORUM}/topic/:id`} element={<Topic />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      ) : (
        <Route element={<PublicLayout />}>
          <Route path={EROUTES.SIGN_IN} element={<Login />} />
          <Route path={EROUTES.SIGN_UP} element={<Registration />} />
          <Route path="*" element={<Navigate to={EROUTES.SIGN_IN} />} />
        </Route>
      )}
      <Route path={EROUTES.INTERNAL_ERROR} element={<InternalError />} />
    </Routes>
  );
}

export default WithRoutes;

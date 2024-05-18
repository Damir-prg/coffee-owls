import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from 'shared/store/user/userActions';
import type { TRootState, TAppDispatch } from 'shared/store/store';
import EROUTES from 'shared/lib/RoutesEnum';
import { Spin } from 'antd';
import PublicLayout from 'shared/components/PublicLayout/PublicLayout';
import PageLayout from 'shared/components/PageLayout/PageLayout';
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

function WithRoutes() {
  const { isLoadingUserData } = useSelector((state: TRootState) => state.user);

  const dispatch = useDispatch<TAppDispatch>();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  if (isLoadingUserData) {
    return <Spin>Загрузка..</Spin>;
  }

  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path={EROUTES.HOME} element={<Home />} />
        <Route path={EROUTES.PROFILE} element={<Profile />} />
        <Route path={EROUTES.GAME} element={<Game />} />
        <Route path={EROUTES.RATING} element={<LeaderBoard />} />
        <Route path={EROUTES.FORUM} element={<Forum />} />
        <Route path={`${EROUTES.FORUM}/topic/:id`} element={<Topic />} />
      </Route>

      <Route element={<PublicLayout />}>
        <Route path={EROUTES.SIGN_IN} element={<Login />} />
        <Route path={EROUTES.SIGN_UP} element={<Registration />} />
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path={EROUTES.INTERNAL_ERROR} element={<InternalError />} />
    </Routes>
  );
}

export default WithRoutes;

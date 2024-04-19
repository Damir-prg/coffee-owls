import { Routes, Route } from 'react-router-dom';
import EROUTES from 'shared/RoutesEnum';
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
  return (
    <Routes>
      <Route path={EROUTES.SIGN_IN} element={<Login />} />
      <Route path={EROUTES.SIGN_UP} element={<Registration />} />

      <Route
        path={EROUTES.HOME}
        element={
          <PageLayout>
            <Home />
          </PageLayout>
        }
      />
      <Route
        path={EROUTES.PROFILE}
        element={
          <PageLayout>
            <Profile />
          </PageLayout>
        }
      />
      <Route
        path={EROUTES.GAME}
        element={
          <PageLayout>
            <Game />
          </PageLayout>
        }
      />
      <Route
        path={EROUTES.RATING}
        element={
          <PageLayout>
            <LeaderBoard />
          </PageLayout>
        }
      />
      <Route path={EROUTES.FORUM} element={<PageLayout />}>
        <Route index element={<Forum />} />
        <Route path="topic/:id" element={<Topic />} />
      </Route>

      <Route path={EROUTES.INTERNAL_ERROR} element={<InternalError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default WithRoutes;

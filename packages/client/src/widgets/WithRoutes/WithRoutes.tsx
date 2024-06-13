import EROUTES from 'shared/lib/RoutesEnum';
import PublicLayout, { initPublicLayout } from 'shared/components/PublicLayout/PublicLayout';
import PageLayout, { initPageLayout } from 'shared/components/PageLayout/PageLayout';
import InternalError, { initInternalErrorPage } from 'pages/InternalError/InternalError';
import NotFound, { initNotFoundPage } from 'pages/NotFound/NotFound';
import Login from 'pages/Login/Login';
import Registration from 'pages/Registration/Registration';
import Home from 'pages/Home/Home';
import Profile from 'pages/Profile/Profile';
import Game from 'pages/Game/Game';
import LeaderBoard from 'pages/LeaderBoard/LeaderBoard';
import Forum from 'pages/Forum/Forum';
import Topic from 'pages/Topic/Topic';
import { TAppDispatch, TRootState } from 'shared/store/store';

export const routes = [
  {
    path: '/',
    element: <PageLayout />,
    fetchData: initPageLayout,
    children: [
      {
        path: `/${EROUTES.HOME}`,
        element: <Home />,
      },
      {
        path: `/${EROUTES.PROFILE}`,
        element: <Profile />,
      },
      {
        path: `/${EROUTES.GAME}`,
        element: <Game />,
      },
      {
        path: `/${EROUTES.RATING}`,
        element: <LeaderBoard />,
      },
      {
        path: `/${EROUTES.FORUM}`,
        element: <Forum />,
      },
      {
        path: `/${EROUTES.FORUM}/topic/:id`,
        element: <Topic />,
      },
    ],
  },
  {
    path: '/',
    element: <PublicLayout />,
    fetchData: initPublicLayout,
    children: [
      {
        path: `/${EROUTES.SIGN_IN}`,
        element: <Login />,
      },
      {
        path: `/${EROUTES.SIGN_UP}`,
        element: <Registration />,
      },
    ],
  },
  {
    path: EROUTES.INTERNAL_ERROR,
    element: <InternalError />,
    fetchData: initInternalErrorPage,
  },
  {
    path: '*',
    element: <NotFound />,
    fetchData: initNotFoundPage,
  },
];

export type TPageInitContext = {
  clientToken?: string;
};

export type TPageInitArgs = {
  dispatch: TAppDispatch;
  state: TRootState;
  ctx: TPageInitContext;
};

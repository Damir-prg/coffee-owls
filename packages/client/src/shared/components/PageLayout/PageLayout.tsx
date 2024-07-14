import './PageLayout.css';
import { Layout, Spin } from 'antd';

import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../PageHeader/PageHeader';
import PageFooter from '../PageFooter/PageFooter';

import EROUTES from 'shared/lib/RoutesEnum';
import { ErrorBoundary } from 'react-error-boundary';
import { usePage } from 'shared/hooks/usePage';
import { getUserData } from 'shared/store/user/userActions';
import { selectUser } from 'shared/store/user/userSlice';

import type { TPageInitArgs } from 'widgets/WithRoutes/WithRoutes';
import type { TAppDispatch } from 'shared/store/store';

const PageLayout = ({ children }: { children?: React.ReactNode }) => {
  usePage({ initPage: initPageLayout });
  const { Header, Content, Footer } = Layout;
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState<boolean>(true);

  const dispatch = useDispatch<TAppDispatch>();

  const getUser = useCallback(async () => {
    setIsPending(true);
    try {
      const resultAction = await dispatch(getUserData());
      if (getUserData.rejected.match(resultAction)) {
        navigate('/' + EROUTES.SIGN_IN);
      }
    } catch (error) {
      console.error(error);
      navigate('/' + EROUTES.SIGN_IN);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    void getUser();
  }, []);

  return (
    <Layout>
      {isPending ? (
        <Spin />
      ) : (
        <>
          <Header className="page-layout__header">
            <PageHeader />
          </Header>

          <ErrorBoundary
            fallback={
              <div className="page-layout__error">
                Что-то пошло не так. Перезагрузите страницу или попробуйте позже.
              </div>
            }>
            <Content className="page-layout__main">{children ? children : <Outlet />}</Content>
          </ErrorBoundary>

          <Footer className="page-layout__footer">
            <PageFooter />
          </Footer>
        </>
      )}
    </Layout>
  );
};

export const initPageLayout = async ({ dispatch, state }: TPageInitArgs) => {
  if (!selectUser(state)) {
    return await dispatch(getUserData());
  }
};

export default PageLayout;

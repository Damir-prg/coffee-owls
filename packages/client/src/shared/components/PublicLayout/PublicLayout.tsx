import './PublicLayout.css';
import { Layout, Spin } from 'antd';

import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EROUTES from 'shared/lib/RoutesEnum';
import { usePage } from 'shared/hooks/usePage';
import { getUserData } from 'shared/store/user/userActions';

import type { TAppDispatch } from 'shared/store/store';

const PublicLayout = ({ children }: { children?: React.ReactNode }) => {
  usePage({ initPage: initPublicLayout });
  const { Content } = Layout;
  const [isPending, setIsPending] = useState<boolean>(true);

  const navigate = useNavigate();

  const dispatch = useDispatch<TAppDispatch>();

  const getUser = useCallback(async () => {
    setIsPending(true);
    try {
      const resultAction = await dispatch(getUserData());
      if (getUserData.fulfilled.match(resultAction)) {
        navigate('/' + EROUTES.HOME);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    void getUser();
  }, []);

  return (
    <Layout className="public-layout">
      {isPending ? (
        <Spin />
      ) : (
        <>
          <div className="public-layout__background-img"></div>
          <div className="public-layout__background-overlay"></div>
          <Content className="public-layout__main">{children ?? <Outlet />}</Content>
        </>
      )}
    </Layout>
  );
};

export const initPublicLayout = () => Promise.resolve();

export default PublicLayout;

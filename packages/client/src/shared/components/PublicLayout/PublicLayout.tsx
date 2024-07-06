import './PublicLayout.css';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { usePage } from 'shared/hooks/usePage';

const PublicLayout = ({ children }: { children?: React.ReactNode }) => {
  usePage({ initPage: initPublicLayout });
  const { Content } = Layout;

  return (
    <Layout className="public-layout">
      <div className="public-layout__background-img"></div>
      <div className="public-layout__background-overlay"></div>
      <Content className="public-layout__main">{children ?? <Outlet />}</Content>
    </Layout>
  );
};

export const initPublicLayout = () => Promise.resolve();

export default PublicLayout;

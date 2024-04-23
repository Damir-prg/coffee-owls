import './PublicLayout.css';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

function PublicLayout({ children }: { children?: React.ReactNode }) {
  const { Content } = Layout;

  return (
    <Layout className="public-layout">
      <div className="public-layout__background-img"></div>
      <div className="public-layout__background-overlay"></div>
      <Content className="public-layout__main">{children ? children : <Outlet />}</Content>
    </Layout>
  );
}

export default PublicLayout;

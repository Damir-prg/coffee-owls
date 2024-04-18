import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

function PageLayout({ children }: { children?: React.ReactNode }) {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header></Header>
      <Content>{children ? children : <Outlet />}</Content>
      <Footer></Footer>
    </Layout>
  );
}

export default PageLayout;

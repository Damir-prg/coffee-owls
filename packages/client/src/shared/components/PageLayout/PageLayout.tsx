import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import PageHeader from '../PageHeader/PageHeader';
import PageFooter from '../PageFooter/PageFooter';

function PageLayout({ children }: { children?: React.ReactNode }) {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <PageHeader />
      </Header>

      <Content style={{ display: 'flex', flexDirection: 'column', padding: '0 48px' }}>
        {children ? children : <Outlet />}
      </Content>

      <Footer style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PageFooter />
      </Footer>
    </Layout>
  );
}

export default PageLayout;

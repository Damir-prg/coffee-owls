import './PageLayout.css';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import PageHeader from '../PageHeader/PageHeader';
import PageFooter from '../PageFooter/PageFooter';

function PageLayout({ children }: { children?: React.ReactNode }) {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header className="page-layout__header">
        <PageHeader />
      </Header>

      <Content className="page-layout__main">{children ? children : <Outlet />}</Content>

      <Footer className="page-layout__footer">
        <PageFooter />
      </Footer>
    </Layout>
  );
}

export default PageLayout;

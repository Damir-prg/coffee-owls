import './PageLayout.css';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PageHeader from '../PageHeader/PageHeader';
import PageFooter from '../PageFooter/PageFooter';

function PageLayout({ children }: { children?: React.ReactNode }) {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header className="page-layout__header">
        <PageHeader />
      </Header>

      <ErrorBoundary
        fallback={
          <div className="page-layout__error">Что-то пошло не так. Перезагрузите страницу или попробуйте позже.</div>
        }>
        <Content className="page-layout__main">{children ? children : <Outlet />}</Content>
      </ErrorBoundary>

      <Footer className="page-layout__footer">
        <PageFooter />
      </Footer>
    </Layout>
  );
}

export default PageLayout;

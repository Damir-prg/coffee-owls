import { PageErrorStub } from 'shared/components/PageErrorStub/PageErrorStub';
import { ESTUB_TYPE } from 'shared/components/PageErrorStub/PageErrorStub.models';
import { usePage } from 'shared/hooks/usePage';

function NotFound() {
  usePage({ initPage: initNotFoundPage });

  return <PageErrorStub type={ESTUB_TYPE.NOT_FOUND} />;
}

export const initNotFoundPage = () => Promise.resolve();

export default NotFound;

import { PageErrorStub } from 'shared/components/PageErrorStub/PageErrorStub';
import { ESTUB_TYPE } from 'shared/components/PageErrorStub/PageErrorStub.models';
import { usePage } from 'shared/hooks/usePage';

const InternalError = () => {
  usePage({ initPage: initInternalErrorPage });

  return <PageErrorStub type={ESTUB_TYPE.INTERNAL_SERVICE_ERROR} />;
};

export const initInternalErrorPage = () => Promise.resolve();

export default InternalError;

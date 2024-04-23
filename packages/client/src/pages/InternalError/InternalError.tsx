import { PageErrorStub } from 'shared/components/PageErrorStub/PageErrorStub';
import { ESTUB_TYPE } from 'shared/components/PageErrorStub/PageErrorStub.models';

function InternalError() {
  return <PageErrorStub type={ESTUB_TYPE.INTERNAL_SERVICE_ERROR} />;
}

export default InternalError;

import { PageErrorStub } from 'shared/components/PageErrorStub/PageErrorStub';
import { ESTUB_TYPE } from 'shared/components/PageErrorStub/PageErrorStub.models';

function NotFound() {
  return <PageErrorStub type={ESTUB_TYPE.NOT_FOUND} />;
}

export default NotFound;

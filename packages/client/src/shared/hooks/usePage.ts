import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'shared/store/store';
import { setPageHasBeenInitializedOnServer, selectPageHasBeenInitializedOnServer } from 'shared/store/ssr/ssrSlice';
import { TPageInitContext, TPageInitArgs } from 'widgets/WithRoutes/WithRoutes';
import { getCookie } from 'shared/utils/cookieUtils';

const createContext = (): TPageInitContext => ({
  clientToken: getCookie('token'),
});

type TPageProps = {
  initPage: (data: TPageInitArgs) => Promise<unknown>;
};

export const usePage = ({ initPage }: TPageProps) => {
  const dispatch = useDispatch();
  const pageHasBeenInitializedOnServer = useSelector(selectPageHasBeenInitializedOnServer);
  const store = useStore();

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false));
      return;
    }
    initPage({ dispatch, state: store.getState(), ctx: createContext() });
  }, []);
};

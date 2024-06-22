/* import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TRootState } from 'shared/store/store';
import EROUTES from 'shared/lib/RoutesEnum';
*/

const WithPublic = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: React.ComponentProps<typeof WrappedComponent>) => {
    /* const { isLoggedIn } = useSelector((state: TRootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) {
        navigate('/' + EROUTES.HOME);
      }
    }, [isLoggedIn]);

    return !isLoggedIn ? <WrappedComponent {...props} /> : null;
    */

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default WithPublic;

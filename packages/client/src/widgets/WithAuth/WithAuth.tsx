/* import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TRootState } from 'shared/store/store';
import EROUTES from 'shared/lib/RoutesEnum';
*/

const WithAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: React.ComponentProps<typeof WrappedComponent>) => {
    /*   const { isLoggedIn } = useSelector((state: TRootState) => state.user);
    const navigate = useNavigate();

   useEffect(() => {
      if (!isLoggedIn) {
        navigate('/' + EROUTES.SIGN_IN);
      }
    }, [isLoggedIn]); 

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
    */

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default WithAuth;

import { useContext, useState } from 'react';

import { login } from '../util/auth';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const authCtx = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);

    try {
      const token = await login(email, password);
      setIsAuthenticating(false);
      authCtx.authenticate(token);
    }
    catch (error) {
      Alert.alert('Authentication failed', 'Could not log you in. Please check your credentials or try again later.');
    }

  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging you in...' />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

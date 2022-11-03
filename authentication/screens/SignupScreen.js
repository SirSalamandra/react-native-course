import { useContext, useState } from 'react';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true);

    try {
      const token = await createUser(email, password);
      setIsAuthenticating(false);
      authCtx.authenticate(token);
    }
    catch (error) {
      Alert.alert('Authentication failed', 'Could not create your user. Please try again later.');
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />
  }

  return <AuthContent onAuthenticate={signupHandler.bind(this)} />;
}

export default SignupScreen;
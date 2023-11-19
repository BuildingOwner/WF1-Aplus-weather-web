import LoginForm from '../../containers/auth/LoginForm';
import AuthTemplate from './AuthTemplate';



const LoginPage = () => {
  return(
    <AuthTemplate>
        <LoginForm/>
    </AuthTemplate>
  )
};

export default LoginPage;
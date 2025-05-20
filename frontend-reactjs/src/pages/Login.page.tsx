import { useUser } from '../context/User.context';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    const fakeUser = { name: 'Jane Doe', email: 'jane@example.com' };
    login(fakeUser);
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login as Jane</button>
    </div>
  );
};

export default LoginPage;

import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <Link to="/login">Login</Link> | <Link to="/dashboard">Dashboard</Link>
  </div>
);

export default HomePage;

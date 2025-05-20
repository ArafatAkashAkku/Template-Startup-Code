import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/User.context";
import ProtectedRoute from "./components/ProtectedRoute.component";
import Layout from "./components/Layout.component";
import HomePage from "./pages/Home.page";
import LoginPage from "./pages/Login.page";
import Dashboard from "./pages/Dashboard.page";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Routes that should NOT show layout */}
          <Route
            path="/login"
            element={
              <ProtectedRoute inverse>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          {/* Routes that should show layout (with Header/Footer) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import AccountManagement from "./components/AccountManagement";
import Personal from "./components/Personal";
import Applications from "./components/Applications";
import Research from "./components/Research";
import { useEffect, useState } from "react";
import { UserData } from "./lib/schemas";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./slice/user";
import mixpanel from "mixpanel-browser";
mixpanel.init("96e5c3e3c2fd60563ca21b15487ea028", { debug: true });

function App() {
  console.log('lol')
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<{ success: boolean; user: UserData }>(
          `${import.meta.env.VITE_API_URL}/api/user`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setUser(response.data.user);
          dispatch(getUser(response.data.user));
        }
      } catch (error) {
        return error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) =>
    user && !isLoading ? <>{children}</> : <Navigate to="/login" />;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            user && !isLoading ? (
              <Navigate to="/realms/reunion/account/personal-info" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            user && !isLoading ? (
              <Navigate to="/realms/reunion/account/personal-info" />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/realms/reunion/account/personal-info"
          element={
            <ProtectedRoute>
              <Personal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/realms/reunion/account/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/realms/reunion/account"
          element={
            <ProtectedRoute>
              <AccountManagement />
            </ProtectedRoute>
          }
        />
        <Route path="/research/search" element={<Research />} />
        <Route path="*" element={<p>ERROR 404</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

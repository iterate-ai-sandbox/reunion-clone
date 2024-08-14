import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import AccountManagement from "./components/AccountManagement";
import Personal from "./components/Personal";
import Applications from "./components/Applications";
import Research from "./components/Research";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/realms/reunion/account/personal-info"
            element={<Personal />}
          />
          <Route
            path="/realms/reunion/account/applications"
            element={<Applications />}
          />
          <Route
            path="/realms/reunion/account"
            element={<AccountManagement />}
          />
          <Route path="/research/search" element={<Research />} />
          <Route path="*" element={<p>ERROR 404</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

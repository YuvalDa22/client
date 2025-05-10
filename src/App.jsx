import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SessionPage from "./pages/SessionPage";
import LoginPage from "./pages/LoginPage";
import LogoutButton from "./cmps/LogoutButton";
import { isLoggedIn } from "./services/auth.service";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminSignupPage from "./pages/AdminSignupPage";
import AdminMainPage from "./pages/AdminMainPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    const handler = () => setLoggedIn(isLoggedIn());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <>
      {loggedIn && <LogoutButton onLogout={() => setLoggedIn(false)} />}
      <ToastContainer position="top-center" autoClose={3000} />
      <main>
        <Routes>
        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
        <Route path="/admin-signup" element={<AdminSignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/session/:id"
            element={
              <ProtectedRoute>
                <SessionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminMainPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn() ? "/" : "/login"} />}
          />
        </Routes>
      </main>
    </>
  );
}
export default App;

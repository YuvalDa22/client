import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import SessionPage from "./pages/SessionPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      {/*<AppHeader />*/} {/*To be added... */}
      <ToastContainer position="top-center" autoClose={3000} />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/session/:id" element={<SessionPage />} />
        </Routes>
      </main>
    </>
  );
}
export default App;

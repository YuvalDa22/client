import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SessionPage from "./pages/SessionPage";

function App(){
  return (
    <>
    {/*<AppHeader />*/} {/*To be added... */}
    <ToastContainer position="top-center" autoClose={3000} />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/session/:id" element={<SessionPage />} />
      </Routes>
    </main>
    </>
  )
}
export default App;
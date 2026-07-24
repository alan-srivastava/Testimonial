// App.jsx
// Sets up the three routes for the app:
//   /          -> public submission form
//   /wall      -> public wall of approved testimonials
//   /dashboard -> owner's moderation dashboard (no auth, per spec)

import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import SubmitForm from "./pages/SubmitForm";
import Wall from "./pages/Wall";
import Dashboard from "./pages/Dashboard";

function NavBar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-brand">Testimonial Platform</div>
      <div className="navbar-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          Submit
        </Link>
        <Link className={location.pathname === "/wall" ? "active" : ""} to="/wall">
          Wall
        </Link>
        <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SubmitForm />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

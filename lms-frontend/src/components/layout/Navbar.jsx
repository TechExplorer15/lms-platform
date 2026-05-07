import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        LMS
      </Link>

      {/* Links */}
      <div className="flex items-center gap-4">
        <Link to="/courses">Courses</Link>

        {user?.role === "student" && <Link to="/student">Dashboard</Link>}

        {user?.role === "instructor" && (
          <Link to="/instructor">Instructor</Link>
        )}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

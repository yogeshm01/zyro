import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Zyro
        </Link>

        <div className="space-x-4 text-sm">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Cart
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

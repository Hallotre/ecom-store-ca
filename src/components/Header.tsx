import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="container flex items-center justify-between px-4 py-5 mx-auto sm:px-6">
        <Link
          to="/"
          className="text-xl font-medium tracking-tight text-gray-900 hover:scale-[1.1] transition-transform duration-200"
        >
          eCom Store
        </Link>

        <nav className="flex items-center space-x-6 sm:space-x-8">
          <Link
            to="/"
            className="text-sm transition-colors text-gray-500 hover:text-gray-700 hover:scale-[1.2] sm:text-base"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="text-sm text-gray-500 transition-colors hover:text-gray-700 hover:scale-[1.2] sm:text-base"
          >
            Contact
          </Link>
          <Link to="/cart" className="relative">
            <CartIcon />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

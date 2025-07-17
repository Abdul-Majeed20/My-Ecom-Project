import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state for mobile menu

  const cartCount = useSelector((state) => state.cart.cartItems.length);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
              />
            </svg>
          </button>
        </div>
        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm/6 font-semibold text-gray-900">
            Home
          </Link>
          <Link to="/products" className="text-sm/6 font-semibold text-gray-900">
            Products
          </Link>
          <Link to="/cart" className="text-sm/6 font-semibold text-gray-900">
            Cart
          </Link>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Company
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/register" className="text-sm/6 font-semibold text-gray-900">
            Register <span aria-hidden="true">/</span>
          </Link>
        </div>
        {/* Logout button */}
        <div className="py-6 text-sm/6 font-semibold text-gray-900">
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile menu, shown when `isMenuOpen` is true */}
      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true" id="mobile-menu">
          {/* Background backdrop */}
          <div className="fixed inset-0 z-50" onClick={toggleMenu}></div>
          {/* Slide-over menu */}
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              {/* Close button */}
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={toggleMenu}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Menu items */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Products
                  </Link>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <Link
                    to="/Register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </div>
                <div className="py-6">
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
// DashboardLayout.jsx
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/authActions";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user"));

    if (isLoggedIn && user) {
      setStatus(isLoggedIn);
    }
  }, [dispatch]);

  return (
    <>
      {status && (
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md">
            <div className="p-6 text-xl font-bold text-indigo-600 border-b">
              E-Shop Admin
            </div>
            <nav className="p-4">
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 hover:text-indigo-600 cursor-pointer">
                  <FaTachometerAlt className="mr-3" />{" "}
                  <Link to="/admindashboard/overview">Overview</Link>
                </li>
                <li className="flex items-center text-gray-700 hover:text-indigo-600 cursor-pointer">
                  <FaBoxOpen className="mr-3" />{" "}
                  <Link to="/admindashboard/productList"> Manage Products</Link>
                </li>
                <li className="flex items-center text-gray-700 hover:text-indigo-600 cursor-pointer">
                  <FaShoppingCart className="mr-3" />
                  <Link to="/admindashboard/userslist">Users</Link>
                </li>
                <li className="flex items-center text-gray-700 hover:text-indigo-600 cursor-pointer">
                  <FaUsers className="mr-3" /> Customers
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Top Navbar */}
            <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                A
              </div>
            </header>

            {/* Page Content */}
            <main className="p-6">
              <div className="bg-white p-6 rounded shadow-sm">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

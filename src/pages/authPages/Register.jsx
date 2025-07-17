import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";
const Register = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can dispatch a Redux action here or call an API
    dispatch(registerUser(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Register
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Register
        </button>
        <div className="flex justify-around items-center">
          <span>Already have Account</span>
          <Link
            to="/Login"
            className="w-100% py-3 px-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-200"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

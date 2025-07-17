import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [status, setStatus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, laoding } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "admin") {
      // setStatus(true);
      navigate("/admindashboard");
    } else if (user?.role === "user") {
      // setStatus(true);
      navigate(`/profile/${user.name}`);
    }
  }, [user, navigate]);

  // useEffect(() => {
  //   const data = window.localStorage.getItem("LOGIN_STATUS");
  //   if (data !== null) setStatus(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("LOGIN_STATUS", JSON.stringify(status));
  // }, [status]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Yahan aap Redux action ya API call kar sakte ho
    dispatch(loginUser(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow-lg rounded-xl mt-50">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          {laoding ? "Loadding.." : "Log in"}
        </button>
        <div className="flex justify-between">
          <p>Click Here If you </p>
          <button className="text-blue-700 cursor-pointer">
            <Link to="/forgotpassword">Forgot Password</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

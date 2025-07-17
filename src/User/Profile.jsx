import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <div className="text-center mt-20 text-red-500">User not found</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full transform transition hover:scale-105 duration-300">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold shadow-md">
            {user.name}
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.city}
          </h2>
          <p className="text-gray-500">{user.role.toUpperCase()}</p>
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">Email:</span>
            <span className="text-right text-sm">{user.email}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">Phone:</span>
            <span className="text-right text-sm capitalize">{user.phone}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">Role:</span>
            <span className="text-right text-sm capitalize">{user.role}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">Member Since:</span>
            <span className="text-right text-sm">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

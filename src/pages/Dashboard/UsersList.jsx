import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Role</th>
              <th className="px-4 py-3 border-b">City</th>
              <th className="px-4 py-3 border-b">Contact</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 text-sm text-gray-800"
                >
                  <td className="px-4 py-3 border-b">{user.name || "—"}</td>
                  <td className="px-4 py-3 border-b">{user.email || "—"}</td>
                  <td className="px-4 py-3 border-b capitalize">
                    {user.role || "—"}
                  </td>
                  <td className="px-4 py-3 border-b">{user.city || "—"}</td>
                  <td className="px-4 py-3 border-b">{user.phone || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

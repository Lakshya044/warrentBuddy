'use client'
import { useEffect, useState } from "react";
import axios from "axios";

const SuperAdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/fetch/all");

                // Log the response to check the data structure
                console.log("API Response:", response);

                if (response.status === 200) {
                    // Ensure the response has the 'users' array
                    setUsers(response.data.users || []);
                } else {
                    console.error("Error fetching users:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle role update
    const handleRoleUpdate = async (userId, newRole) => {
        try {
            const response = await axios.post("/api/superAdmin/create", {
                userId,
                role: newRole,
            });

            if (response.status === 200) {
                // Update the user in the state
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === userId ? { ...user, role: newRole } : user
                    )
                );
                alert(response.data.message);
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error updating role:", error);
            alert("An error occurred while updating the role.");
        }
    };

    // Mapping roles to their display names
    const roleNames = {
        1: 'User',
        2: 'Lawyer',
        3: 'Police',
        4: 'Judge',
        5: 'Superuser',
    };
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Super Admin Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Role</th>
                            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-2">No users found</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{roleNames[user.role]}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.phonenumber || 'N/A'}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleUpdate(user._id, Number(e.target.value))}
                                            className="border border-gray-300 px-2 py-1"
                                        >
                                            <option value={1}>User</option>
                                            <option value={2}>Lawyer</option>
                                            <option value={3}>Police</option>
                                            <option value={4}>Judge</option>
                                            {/* <option value={5}>Superuser</option> */}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SuperAdminDashboard;

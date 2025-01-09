'use client'
import { useEffect, useState } from "react";
import axios from "axios";

const SuperAdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/fetch/all");

                console.log("API Response in the SuperUser Dashboard:", response);

                if (response.status === 200) {
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

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            const response = await axios.post("/api/superAdmin/create", {
                userId,
                role: newRole,
            });

            if (response.status === 200) {
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

    const roleNames = {
        1: 'User',
        2: 'Lawyer',
        3: 'Police',
        4: 'Judge',
        5: 'Superuser',
    };
    
    return (
        <div className="container mx-auto p-4"
        >
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table-auto w-full border-collapse border rounded-md border-gray-300 text-[#dda931]">
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
                                <tr key={user._id} className="even:bg-[#FDF8E1] odd:bg-[#6D4C41] even:text-[#6D4C41] odd:text-[#FDF8E1]">
                                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{roleNames[user.role]}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.phonenumber || 'N/A'}</td>
                                    <td className="border border-gray-300 px-4 py-2 items-center text-center">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleUpdate(user._id, Number(e.target.value))}
                                            className="border border-gray-300 px-2 py-1 bg-[#FFB300] items-center text-center"
                                        >
                                            <option value={1}>User</option>
                                            <option value={2}>Lawyer</option>
                                            <option value={3}>Police</option>
                                            <option value={4}>Judge</option>
                                            <option value={5}>SuperAdmin</option>
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

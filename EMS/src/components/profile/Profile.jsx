import { useState, useEffect } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:7000/api/v1/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const data = await response.json();
                console.log(data);
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <div className="mb-2">
                <strong>Name:</strong> {user?.name}
            </div>
            <div className="mb-2">
                <strong>Email:</strong> {user?.email}
            </div>
            <div className="mb-2">
                <strong>Phone:</strong> {user?.phone || "N/A"}
            </div>
        </div>
    );
};

export default Profile;

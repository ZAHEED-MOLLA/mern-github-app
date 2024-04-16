import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Logout = () => {
    const { authUser, setAuthUser } = useAuthContext();

    const handleLogout = async () => {
        try {
            const res = await fetch("api/auth/logout", {
                credentials: "include"
            });

            if (res.ok) {
                // Logout successful, update the authUser state
                setAuthUser(null);
                // Optional: You can display a success message here
                toast.success("Logout successful");
            } else {
                // If the response is not ok, handle error
                const data = await res.json();
                // Display error message
                toast.error(data.message || "Logout failed");
            }
        } catch (error) {
            // Catch any unexpected errors
            toast.error("An error occurred while logging out");
            console.error("Logout error:", error);
        }
    };

    return (
        <>
            <img
                src={authUser?.avatarUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-gray-800 cursor-pointer"
                onClick={handleLogout}
            />
            <div className="cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800" onClick={handleLogout}>
                <MdLogout size={22} />
            </div>
        </>
    );
};

export default Logout;

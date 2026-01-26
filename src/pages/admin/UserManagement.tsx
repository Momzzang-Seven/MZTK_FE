import { useEffect } from "react";
import { useAdminStore } from "@store/adminStore";
import SearchBar from "@components/admin/UserManagement/SearchBar";
import UserTable from "@components/admin/UserManagement/UserTable";

const UserManagement = () => {
    const { fetchUsers, totalUsers, bannedUsers } = useAdminStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="flex justify-end items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-main rounded-lg text-white font-bold text-sm shadow-sm">
                    <span>총 사용자</span>
                    <span className="text-lg">{totalUsers.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#FF4500] rounded-lg text-white font-bold text-sm shadow-sm">
                    <span>정지된 사용자</span>
                    <span className="text-lg">{bannedUsers.toLocaleString()}</span>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                <SearchBar />
            </div>

            {/* Table Section */}
            <UserTable />
        </div>
    );
};

export default UserManagement;

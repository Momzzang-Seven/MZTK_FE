import { useEffect } from "react";
import { useAdminStore } from "@store/adminStore";
import { AdminSearchBar } from "@components/admin/common/AdminSearchBar";
import UserTable from "@components/admin/user/UserTable";
import { ADMIN_TEXT } from "@constant/admin";

const UserManagement = () => {
    const { fetchUsers, totalUsers, bannedUsers, searchUsers, statusFilter, setStatusFilter } = useAdminStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="flex justify-end items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-main rounded-lg text-white font-bold text-sm shadow-sm">
                    <span>{ADMIN_TEXT.USER.TITLE_TOTAL}</span>
                    <span className="text-lg">{totalUsers.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#FF4500] rounded-lg text-white font-bold text-sm shadow-sm">
                    <span>{ADMIN_TEXT.USER.TITLE_BANNED}</span>
                    <span className="text-lg">{bannedUsers.toLocaleString()}</span>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                <AdminSearchBar
                    placeholder={ADMIN_TEXT.USER.SEARCH_PLACEHOLDER}
                    onSearch={searchUsers}
                    filterOptions={[
                        { label: ADMIN_TEXT.COMMON.FILTER.ALL, value: "ALL" },
                        { label: ADMIN_TEXT.COMMON.FILTER.ACTIVE, value: "ACTIVE" },
                        { label: ADMIN_TEXT.COMMON.FILTER.BANNED, value: "BANNED" },
                    ]}
                    currentFilter={statusFilter}
                    onFilterChange={(value) => setStatusFilter(value as any)}
                />
            </div>

            {/* Table Section */}
            <UserTable />
        </div>
    );
};

export default UserManagement;

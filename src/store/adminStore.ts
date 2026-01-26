import { create } from 'zustand';

export interface AdminUser {
    id: number;
    nickname: string;
    email: string;
    joinDate: string; // YYYY.MM.DD
    status: 'ACTIVE' | 'BANNED' | 'DELETED';
    postCount: number;
    commentCount: number;
    profileColor: string; // Hex color for avatar background
}

interface AdminState {
    users: AdminUser[];
    filteredUsers: AdminUser[];
    searchQuery: string;
    statusFilter: 'ALL' | 'ACTIVE' | 'BANNED';
    isLoading: boolean;

    // Stats
    totalUsers: number;
    bannedUsers: number;

    // Actions
    fetchUsers: () => Promise<void>;
    setStatusFilter: (status: 'ALL' | 'ACTIVE' | 'BANNED') => void;
    searchUsers: (query: string) => void;
    banUser: (userId: number) => Promise<void>;
    unbanUser: (userId: number) => Promise<void>;
}

// Mock Data Generator
const generateMockUsers = (): AdminUser[] => {
    return [
        { id: 1, nickname: '김규원의마지막', email: 'gyugyugyu@email.com', joinDate: '2024.01.15', status: 'ACTIVE', postCount: 24, commentCount: 156, profileColor: '#FFD700' },
        { id: 2, nickname: '운동하는직장인', email: 'fitness_lover@test.com', joinDate: '2024.02.03', status: 'ACTIVE', postCount: 18, commentCount: 89, profileColor: '#FFA500' },
        { id: 3, nickname: '헬스장빌런', email: 'villain@bad.com', joinDate: '2023.12.20', status: 'BANNED', postCount: 5, commentCount: 12, profileColor: '#FF4500' },
        { id: 4, nickname: '건강이최고', email: 'health_first@good.com', joinDate: '2024.03.10', status: 'ACTIVE', postCount: 42, commentCount: 231, profileColor: '#32CD32' },
        { id: 5, nickname: '작심삼일', email: 'three_days@fail.com', joinDate: '2024.01.28', status: 'ACTIVE', postCount: 15, commentCount: 67, profileColor: '#1E90FF' },
        { id: 6, nickname: '홍길동', email: 'hong@test.com', joinDate: '2024.04.01', status: 'ACTIVE', postCount: 0, commentCount: 2, profileColor: '#BA55D3' },
        { id: 7, nickname: '스팸계정', email: 'spam@spam.com', joinDate: '2024.04.05', status: 'BANNED', postCount: 100, commentCount: 500, profileColor: '#808080' },
    ];
};

export const useAdminStore = create<AdminState>((set, get) => ({
    users: [],
    filteredUsers: [],
    searchQuery: '',
    statusFilter: 'ALL',
    isLoading: false,
    totalUsers: 0,
    bannedUsers: 0,

    fetchUsers: async () => {
        set({ isLoading: true });
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockData = generateMockUsers();
        set({
            users: mockData,
            filteredUsers: mockData,
            totalUsers: mockData.length,
            bannedUsers: mockData.filter(u => u.status === 'BANNED').length,
            isLoading: false
        });
    },

    setStatusFilter: (status: 'ALL' | 'ACTIVE' | 'BANNED') => {
        set({ statusFilter: status });
        const { users, searchQuery } = get();

        let filtered = users;

        // Apply Status Filter
        if (status !== 'ALL') {
            filtered = filtered.filter(user => user.status === status);
        }

        // Apply Search Filter
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(user =>
                user.nickname.toLowerCase().includes(lowerQuery) ||
                user.email.toLowerCase().includes(lowerQuery)
            );
        }

        set({ filteredUsers: filtered });
    },

    searchUsers: (query: string) => {
        set({ searchQuery: query });
        const { users, statusFilter } = get();

        let filtered = users;

        // Apply Status Filter
        if (statusFilter !== 'ALL') {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        // Apply Search Filter
        if (query.trim()) {
            const lowerQuery = query.toLowerCase();
            filtered = filtered.filter(user =>
                user.nickname.toLowerCase().includes(lowerQuery) ||
                user.email.toLowerCase().includes(lowerQuery)
            );
        }

        set({ filteredUsers: filtered });
    },

    banUser: async (userId: number) => {
        const { users, searchQuery, statusFilter } = get();
        // Simulate API Update
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, status: 'BANNED' as const } : user
        );

        // Re-apply filters
        let filtered = updatedUsers;

        if (statusFilter !== 'ALL') {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(user =>
                user.nickname.toLowerCase().includes(lowerQuery) ||
                user.email.toLowerCase().includes(lowerQuery)
            );
        }

        set({
            users: updatedUsers,
            filteredUsers: filtered,
            bannedUsers: updatedUsers.filter(u => u.status === 'BANNED').length
        });
    },

    unbanUser: async (userId: number) => {
        const { users, searchQuery, statusFilter } = get();
        // Simulate API Update
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, status: 'ACTIVE' as const } : user
        );

        // Re-apply filters
        let filtered = updatedUsers;

        if (statusFilter !== 'ALL') {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(user =>
                user.nickname.toLowerCase().includes(lowerQuery) ||
                user.email.toLowerCase().includes(lowerQuery)
            );
        }

        set({
            users: updatedUsers,
            filteredUsers: filtered,
            bannedUsers: updatedUsers.filter(u => u.status === 'BANNED').length
        });
    }
}));

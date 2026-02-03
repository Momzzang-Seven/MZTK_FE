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

export interface AdminComment {
    id: number;
    author: string;
    content: string;
    date: string; // YYYY-MM-DD HH:mm
    profileColor: string;
    isBanned: boolean;
}

export interface AdminPost {
    id: number;
    author: string;
    date: string; // YYYY-MM-DD HH:mm
    category: string;
    title: string;
    content: string;
    comments: AdminComment[];
    profileColor: string;
    isBanned: boolean;
    likeCount: number;
    commentCount: number;
}

interface AdminState {
    // User Management State
    users: AdminUser[];
    filteredUsers: AdminUser[];
    searchQuery: string;
    statusFilter: 'ALL' | 'ACTIVE' | 'BANNED';
    isLoading: boolean;

    // User Management Stats
    totalUsers: number;
    bannedUsers: number;

    // Post Management State
    posts: AdminPost[];
    filteredPosts: AdminPost[];
    searchPostQuery: string;
    postStatusFilter: 'ALL' | 'ACTIVE' | 'BANNED';

    // Pagination
    page: number;
    hasMore: boolean;
    isFetchingPosts: boolean;

    // User Management Actions
    fetchUsers: () => Promise<void>;
    setStatusFilter: (status: 'ALL' | 'ACTIVE' | 'BANNED') => void;
    searchUsers: (query: string) => void;
    banUser: (userId: number) => Promise<void>;
    unbanUser: (userId: number) => Promise<void>;

    // Post Management Actions
    // Post Management Actions
    fetchPosts: (reset?: boolean) => Promise<void>;
    setPostStatusFilter: (status: 'ALL' | 'ACTIVE' | 'BANNED') => void;
    searchPosts: (query: string) => void;
    banPost: (postId: number) => Promise<void>;
    unbanPost: (postId: number) => Promise<void>;
    deleteComment: (postId: number, commentId: number) => Promise<void>;
    restoreComment: (postId: number, commentId: number) => Promise<void>;
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

const generateMockPosts = (page: number): AdminPost[] => {
    const startId = (page - 1) * 10 + 1;
    const comments: AdminComment[] = [
        { id: 1, author: '박지영', content: 'ㄴㅇㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹ', date: '2024-01-18 15:20', profileColor: '#FFD700', isBanned: false },
        { id: 2, author: '이민호', content: 'ㄴㅇㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹ', date: '2024-01-18 16:45', profileColor: '#FFA500', isBanned: false },
        { id: 3, author: '최수진', content: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ', date: '2024-01-18 17:10', profileColor: '#FF4500', isBanned: false },
        { id: 4, author: '강태양', content: '1점', date: '2024-01-18 13:00', profileColor: '#32CD32', isBanned: false },
        { id: 5, author: '윤성호', content: '010000010101000점', date: '2024-01-18 13:45', profileColor: '#1E90FF', isBanned: false },
    ];

    const posts: AdminPost[] = [];

    // Generate 5 posts per page
    for (let i = 0; i < 5; i++) {
        const id = startId + i;
        posts.push({
            id: id,
            author: id % 2 === 0 ? '로지텍스' : '김기기기기길호',
            date: '2024-01-18 14:30',
            category: id % 2 === 0 ? '자유게시판' : '질문게시판',
            title: id % 2 === 0 ? `내 몸은 짱멋지고 잘생겼어 ${id}` : `내 근육은 100점 ${id}`,
            content: id % 2 === 0
                ? '하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하'
                : '10점 만점에?',
            comments: [comments[0], comments[1], comments[2], comments[3], comments[4]],
            profileColor: id % 2 === 0 ? '#DAA520' : '#CD853F',
            isBanned: false,
            likeCount: 80 + i,
            commentCount: 20 + i
        });
    }

    return posts;
};

// Helper to filter users
const getFilteredUsers = (users: AdminUser[], status: string, query: string) => {
    let filtered = users;
    if (status !== 'ALL') {
        filtered = filtered.filter(user => user.status === status);
    }
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery) {
        filtered = filtered.filter(user =>
            user.nickname.toLowerCase().includes(trimmedQuery) ||
            user.email.toLowerCase().includes(trimmedQuery)
        );
    }
    return filtered;
};

// Helper to filter posts
const getFilteredPosts = (posts: AdminPost[], status: string, query: string) => {
    let filtered = posts;
    if (status !== 'ALL') {
        filtered = filtered.filter(post =>
            status === 'ACTIVE' ? !post.isBanned : post.isBanned
        );
    }
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery) {
        filtered = filtered.filter(post =>
            post.content.toLowerCase().includes(trimmedQuery) ||
            post.title.toLowerCase().includes(trimmedQuery) ||
            post.comments.some(comment => comment.content.toLowerCase().includes(trimmedQuery))
        );
    }
    return filtered;
};

export const useAdminStore = create<AdminState>((set, get) => ({
    // User State
    users: [],
    filteredUsers: [],
    searchQuery: '',
    statusFilter: 'ALL',
    isLoading: false,
    totalUsers: 0,
    bannedUsers: 0,

    // Post State
    posts: [],
    filteredPosts: [],
    searchPostQuery: '',
    postStatusFilter: 'ALL',
    page: 1,
    hasMore: true,
    isFetchingPosts: false,

    // User Actions
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
        set({ filteredUsers: getFilteredUsers(users, status, searchQuery) });
    },

    searchUsers: (query: string) => {
        set({ searchQuery: query });
        const { users, statusFilter } = get();
        set({ filteredUsers: getFilteredUsers(users, statusFilter, query) });
    },

    banUser: async (userId: number) => {
        const { users, searchQuery, statusFilter } = get();
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, status: 'BANNED' as const } : user
        );

        set({
            users: updatedUsers,
            filteredUsers: getFilteredUsers(updatedUsers, statusFilter, searchQuery),
            bannedUsers: updatedUsers.filter(u => u.status === 'BANNED').length
        });
    },

    unbanUser: async (userId: number) => {
        const { users, searchQuery, statusFilter } = get();
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, status: 'ACTIVE' as const } : user
        );

        set({
            users: updatedUsers,
            filteredUsers: getFilteredUsers(updatedUsers, statusFilter, searchQuery),
            bannedUsers: updatedUsers.filter(u => u.status === 'BANNED').length
        });
    },

    // Post Actions
    fetchPosts: async (reset = false) => {
        const { page, isFetchingPosts, hasMore, postStatusFilter, searchPostQuery } = get();

        if (isFetchingPosts || (!hasMore && !reset)) return;

        set({ isFetchingPosts: true });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const nextPage = reset ? 1 : page;
        const newPosts = generateMockPosts(nextPage);
        const isLastPage = nextPage >= 5;
        const allPosts = reset ? newPosts : [...get().posts, ...newPosts];

        set(() => ({
            posts: allPosts,
            filteredPosts: getFilteredPosts(allPosts, postStatusFilter, searchPostQuery),
            page: nextPage + 1,
            hasMore: !isLastPage,
            isFetchingPosts: false
        }));
    },

    setPostStatusFilter: (status: 'ALL' | 'ACTIVE' | 'BANNED') => {
        set({ postStatusFilter: status });
        const { posts, searchPostQuery } = get();
        set({ filteredPosts: getFilteredPosts(posts, status, searchPostQuery) });
    },

    searchPosts: (query: string) => {
        set({ searchPostQuery: query });
        const { posts, postStatusFilter } = get();
        set({ filteredPosts: getFilteredPosts(posts, postStatusFilter, query) });
    },

    banPost: async (postId: number) => {
        const { posts, searchPostQuery, postStatusFilter } = get();
        const updatedPosts = posts.map(post =>
            post.id === postId ? { ...post, isBanned: true } : post
        );
        set({
            posts: updatedPosts,
            filteredPosts: getFilteredPosts(updatedPosts, postStatusFilter, searchPostQuery)
        });
    },

    unbanPost: async (postId: number) => {
        const { posts, searchPostQuery, postStatusFilter } = get();
        const updatedPosts = posts.map(post =>
            post.id === postId ? { ...post, isBanned: false } : post
        );
        set({
            posts: updatedPosts,
            filteredPosts: getFilteredPosts(updatedPosts, postStatusFilter, searchPostQuery)
        });
    },

    deleteComment: async (postId: number, commentId: number) => {
        const { posts, searchPostQuery, postStatusFilter } = get();
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: post.comments.map(c =>
                        c.id === commentId ? { ...c, isBanned: true } : c
                    )
                };
            }
            return post;
        });
        set({
            posts: updatedPosts,
            filteredPosts: getFilteredPosts(updatedPosts, postStatusFilter, searchPostQuery)
        });
    },

    restoreComment: async (postId: number, commentId: number) => {
        const { posts, searchPostQuery, postStatusFilter } = get();
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: post.comments.map(c =>
                        c.id === commentId ? { ...c, isBanned: false } : c
                    )
                };
            }
            return post;
        });
        set({
            posts: updatedPosts,
            filteredPosts: getFilteredPosts(updatedPosts, postStatusFilter, searchPostQuery)
        });
    }
}));


import { useEffect, useState, useRef, useCallback } from "react";
import { useAdminStore } from "../../store/adminStore";

const PostManagement = () => {
    const {
        filteredPosts,
        fetchPosts,
        searchPosts,
        banPost,
        deleteComment,
        hasMore,
        isFetchingPosts
    } = useAdminStore();

    // Search State
    const [inputValue, setInputValue] = useState("");
    const [searchType, setSearchType] = useState<'CONTENT' | 'COMMENT'>('CONTENT');

    // Expanded Comments State (postId -> boolean)
    const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});

    // Modal State
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        type: 'POST' | 'COMMENT' | null;
        targetId: number | null; // postId
        subTargetId: number | null; // commentId (for comments)
    }>({
        isOpen: false,
        type: null,
        targetId: null,
        subTargetId: null
    });

    const [deleteReason, setDeleteReason] = useState("");

    // Infinite Scroll Ref
    const observerRef = useRef<HTMLDivElement | null>(null);

    // Initial Fetch
    useEffect(() => {
        fetchPosts(true);
    }, [fetchPosts]);

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            searchPosts(inputValue, searchType);
        }, 2000);

        return () => clearTimeout(timer);
    }, [inputValue, searchType, searchPosts]);

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isFetchingPosts) {
                    fetchPosts(false);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasMore, isFetchingPosts, fetchPosts]);

    // Handlers
    const handleSearchClick = () => {
        searchPosts(inputValue, searchType);
    };

    const toggleComments = (postId: number) => {
        setExpandedComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const openDeleteModal = (type: 'POST' | 'COMMENT', postId: number, commentId?: number) => {
        setModalConfig({
            isOpen: true,
            type,
            targetId: postId,
            subTargetId: commentId || null
        });
        setDeleteReason("");
    };

    const closeModal = () => {
        setModalConfig({
            isOpen: false,
            type: null,
            targetId: null,
            subTargetId: null
        });
        setDeleteReason("");
    };

    const confirmDelete = async () => {
        if (!modalConfig.targetId) return;

        if (modalConfig.type === 'POST') {
            await banPost(modalConfig.targetId);
        } else if (modalConfig.type === 'COMMENT' && modalConfig.subTargetId) {
            await deleteComment(modalConfig.targetId, modalConfig.subTargetId);
        }

        closeModal();
    };

    const REASONS = [
        "부적절한 내용",
        "저작권 위반",
        "스팸/광고",
        "어뷰징/무의미한 도배",
        "기타"
    ];

    return (
        <div className="space-y-6 pb-20">
            <h1 className="text-2xl font-bold text-gray-800">게시판 관리</h1>

            {/* Search Bar */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:border-main focus:ring-1 focus:ring-main sm:text-sm transition-colors"
                        placeholder="포스트 혹은 댓글 내용을 검색하세요"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <select
                        className="appearance-none bg-white border border-gray-200 text-gray-700 py-4 pl-4 pr-10 rounded-xl leading-Tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm font-bold min-w-[120px] cursor-pointer h-full"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value as 'CONTENT' | 'COMMENT')}
                    >
                        <option value="CONTENT">게시글</option>
                        <option value="COMMENT">댓글</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>

                <button
                    className="bg-main hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap"
                    onClick={handleSearchClick}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    검색
                </button>
            </div>

            {/* Post List */}
            <div className="space-y-4">
                {filteredPosts.map(post => (
                    <div key={post.id} className={`bg-gray-50 p-6 rounded-2xl border ${post.isBanned ? 'border-red-200 bg-red-50' : 'border-gray-100'}`}>
                        {/* Post Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg`} style={{ backgroundColor: post.profileColor }}>
                                    {post.author[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{post.author}</div>
                                    <div className="text-xs text-gray-500">{post.date}</div>
                                </div>
                            </div>
                            <span className="text-main font-semibold text-sm">{post.category}</span>
                        </div>

                        {/* Post Content */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                            <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>
                        </div>

                        {/* Post Actions & Stats */}
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                            <div className="flex gap-4 text-gray-500 text-sm">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                                    {post.comments.length}
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                    {post.likeCount}
                                </span>
                            </div>
                            {!post.isBanned && (
                                <button
                                    onClick={() => openDeleteModal('POST', post.id)}
                                    className="px-4 py-2 bg-red-50 text-red-500 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                    게시글 밴
                                </button>
                            )}
                            {post.isBanned && (
                                <span className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-bold">밴 처리됨</span>
                            )}
                        </div>

                        {/* Comments Section */}
                        {post.comments.length > 0 && (
                            <div className="bg-white rounded-xl p-4 space-y-4">
                                <div className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-main" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                                    댓글 ({post.comments.length})
                                </div>

                                <div className="space-y-3">
                                    {(expandedComments[post.id] ? post.comments : post.comments.slice(0, 3)).map(comment => (
                                        <div key={comment.id} className={`flex justify-between items-start p-3 rounded-lg ${comment.isBanned ? 'bg-red-50 opacity-70' : 'bg-gray-50'}`}>
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ backgroundColor: comment.profileColor }}>
                                                    {comment.author[0]}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-sm text-gray-900">{comment.author}</span>
                                                        <span className="text-[10px] text-gray-400">{comment.date}</span>
                                                    </div>
                                                    <p className={`text-sm ${comment.isBanned ? 'text-red-400 line-through' : 'text-gray-600'}`}>{comment.content}</p>
                                                    {comment.isBanned && <span className="text-xs text-red-500 font-bold">삭제된 댓글</span>}
                                                </div>
                                            </div>
                                            {!comment.isBanned && (
                                                <button
                                                    onClick={() => openDeleteModal('COMMENT', post.id, comment.id)}
                                                    className="w-6 h-6 rounded-full border border-red-200 text-red-400 flex items-center justify-center hover:bg-red-50"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {post.comments.length > 3 && (
                                    <button
                                        onClick={() => toggleComments(post.id)}
                                        className="text-main text-sm font-bold flex items-center gap-1 hover:underline"
                                    >
                                        {expandedComments[post.id] ? (
                                            <>댓글 접기 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                                        ) : (
                                            <>댓글 더보기 ({post.comments.length - 3}개 남음) <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {/* Sentinel for Infinite Scroll */}
                {hasMore && (
                    <div ref={observerRef} className="h-10 flex items-center justify-center">
                        {isFetchingPosts && (
                            <div className="w-6 h-6 border-2 border-main border-t-transparent rounded-full animate-spin"></div>
                        )}
                    </div>
                )}

                {!hasMore && filteredPosts.length > 0 && (
                    <div className="text-center text-gray-400 py-6 text-sm">
                        더 이상 표시할 게시글이 없습니다.
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalConfig.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                정말로 {modalConfig.type === 'POST' ? '게시글' : '댓글'}을 삭제하시겠어요?
                            </h3>
                            <p className="text-sm text-gray-500">
                                복구는 불가능합니다.
                            </p>
                        </div>

                        <div className="mb-6">
                            <select
                                value={deleteReason}
                                onChange={(e) => setDeleteReason(e.target.value)}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main"
                            >
                                <option value="" disabled>이유를 선택해주세요</option>
                                {REASONS.map((reason, idx) => (
                                    <option key={idx} value={reason}>{reason}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={closeModal}
                                className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                취소
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={!deleteReason}
                                className={`flex-1 py-4 text-white font-bold rounded-xl transition-colors ${deleteReason ? 'bg-[#FF4500] hover:bg-[#FF6347]' : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostManagement;

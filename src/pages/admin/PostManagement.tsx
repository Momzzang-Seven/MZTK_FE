import { useEffect, useState, useRef } from "react";
import { useAdminStore } from "../../store/adminStore";
import { AdminSearchBar } from "@components/admin/common/AdminSearchBar";
import { PostItem } from "@components/admin/PostManagement/PostItem";
import { DeleteConfirmModal } from "@components/admin/PostManagement/DeleteConfirmModal";
import { ADMIN_TEXT } from "@constant/admin";

const PostManagement = () => {
    const {
        filteredPosts,
        fetchPosts,
        searchPosts,
        banPost,
        unbanPost,
        deleteComment,
        restoreComment,
        hasMore,
        isFetchingPosts,
        postStatusFilter,
        setPostStatusFilter
    } = useAdminStore();

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

    return (
        <div className="space-y-6 pb-20">
            {/* Search Bar */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                <AdminSearchBar
                    placeholder={ADMIN_TEXT.POST.SEARCH_PLACEHOLDER}
                    onSearch={searchPosts}
                    filterOptions={[
                        { label: ADMIN_TEXT.COMMON.FILTER.ALL, value: "ALL" },
                        { label: ADMIN_TEXT.COMMON.FILTER.POSTING, value: "ACTIVE" },
                        { label: ADMIN_TEXT.COMMON.FILTER.DELETED, value: "BANNED" },
                    ]}
                    currentFilter={postStatusFilter}
                    onFilterChange={(value) => setPostStatusFilter(value as any)}
                />
            </div>

            {/* Post List */}
            <div className="space-y-4">
                {filteredPosts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                        onOpenDeleteModal={openDeleteModal}
                        onRestorePost={unbanPost}
                        onRestoreComment={restoreComment}
                    />
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
                        {ADMIN_TEXT.POST.MSG_NO_MORE_POSTS}
                    </div>
                )}
            </div>

            {/* Modal */}
            <DeleteConfirmModal
                isOpen={modalConfig.isOpen}
                type={modalConfig.type}
                deleteReason={deleteReason}
                onReasonChange={setDeleteReason}
                onClose={closeModal}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default PostManagement;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "antd";

import config from "@/Services";
import { UserAuth } from "@/Context/UserContext";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import type {
  CommentCreateRequest,
  CommentGetResponse,
  ProfileGetResponse,
} from "@/Models/Comment";

interface CommentsProps {
  productId: string;
}

const Comments = ({ productId }: CommentsProps) => {
  const { user } = UserAuth();
  const [backendComments, setBackendComments] = useState<CommentGetResponse[]>(
    [],
  );
  const [activeComment, setActiveComment] = useState<{
    id: string;
    type: "replying";
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const rootComments = backendComments.filter((c) => c.parentId === null);

  const getReplies = (commentId: string) =>
    backendComments.filter((c) => c.parentId === commentId);

  const addComment = async (text: string, parentId: string | null) => {
    try {
      const data = await config.createCommentAPI({
        productId,
        comment: text,
        parentId,
      } as CommentCreateRequest);

      const newComment: CommentGetResponse = {
        ...data.result,
        user: {
          id: user?.id,
          nickName: user?.nickName,
          email: user?.email,
        } as ProfileGetResponse,
      };
      console.log("New comment created:", newComment.id);
      setBackendComments([newComment, ...backendComments]);
      setActiveComment(null);
      toast.success("Đã gửi bình luận!");
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra. Hãy thử lại!");
    }
  };

  const handleOpenDeleteModal = (commentId: string) => {
    setCommentToDelete(commentId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!commentToDelete) return;
    try {
      await config.deleteCommentAPI(commentToDelete);
      setBackendComments((prev) =>
        prev.filter((c) => c.id !== commentToDelete),
      );
      toast.success("Đã xóa bình luận!");
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi xóa bình luận!");
    } finally {
      setIsModalOpen(false);
      setCommentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setCommentToDelete(null);
  };
  useEffect(() => {
    const fetchComments = async () => {
      if (!productId) return;
      try {
        const data = await config.getCommentByProductIdAPI(productId);

        setBackendComments(data.result.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    };

    fetchComments();
  }, [productId]);

  return (
    <div className="mx-auto w-full max-w-3xl rounded-lg bg-white p-4 shadow-md">
      <div className="mb-3 text-lg font-semibold text-gray-800">Bình luận</div>

      <div className="mb-6">
        <CommentForm
          submitLabel="Gửi"
          handleSubmit={(text) => addComment(text, null)}
        />
      </div>

      <div className="space-y-5">
        {rootComments.map((root) => (
          <Comment
            key={root.id}
            comment={root}
            replies={getReplies(root.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={() => handleOpenDeleteModal(root.id)}
            currentUserId={user?.id}
          />
        ))}
      </div>

      <Modal
        title="Xóa bình luận?"
        open={isModalOpen}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Hành động này không thể hoàn tác!</p>
      </Modal>
    </div>
  );
};

export default Comments;

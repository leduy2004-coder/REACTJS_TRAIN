import Image from "@/Components/Image";
import CommentForm from "./CommentForm";
import { CommentOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CommentGetResponse } from "@/Models/Comment";

interface CommentProps {
  comment: CommentGetResponse;
  replies: CommentGetResponse[];
  activeComment: { id: string; type: "replying" } | null;
  setActiveComment: React.Dispatch<
    React.SetStateAction<{ id: string; type: "replying" } | null>
  >;
  deleteComment: (commentId: string) => void;
  addComment: (text: string, parentId: string | null) => void;
  parentId?: string | null;
  currentUserId?: string;
}

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}: CommentProps) => {
  const isReplying =
    activeComment?.id === comment.id && activeComment.type === "replying";

  const canDelete = currentUserId === comment.user.id;
  const canReply = Boolean(currentUserId);

  const replyId = parentId ?? comment.id;

  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border border-gray-200">
        <Image src="" alt="avatar" className="h-full w-full object-cover" />
      </div>

      <div className="flex-1">
        <div className="group relative rounded-xl bg-gray-100/80 p-4 transition hover:bg-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="cursor-pointer font-semibold text-gray-800 hover:text-blue-600">
                {comment.user.nickName}
              </h4>
              <p className="mt-0.5 text-xs text-gray-500">{comment.created}</p>
            </div>

            <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
              {canReply && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: "replying" })
                  }
                  title="Phản hồi"
                  className="rounded p-1 text-gray-600 hover:bg-gray-200"
                >
                  <CommentOutlined />
                </button>
              )}

              {canDelete && (
                <button
                  type="button"
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                  title="Xóa"
                  className="rounded p-1 text-red-600 hover:bg-gray-100"
                >
                  <DeleteOutlined />
                </button>
              )}
            </div>
          </div>

          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-800">
            {comment.comment}
          </p>
        </div>

        {isReplying && (
          <div className="ml-0 mt-3">
            <CommentForm
              submitLabel="Gửi phản hồi"
              handleSubmit={(text) => addComment(text, replyId)}
              handleCancel={() => setActiveComment(null)}
            />
          </div>
        )}

        {replies.length > 0 && (
          <div className="ml-8 mt-4 space-y-3 border-l border-gray-200 pl-4">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replies={[]}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Comment;

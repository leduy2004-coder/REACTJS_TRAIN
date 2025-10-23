import { useState } from "react";
import type { FormEvent } from "react";

interface CommentFormProps {
  handleSubmit: (text: string) => void;
  submitLabel: string;
  hasCancelButton?: boolean;
  handleCancel?: () => void;
  initialText?: string;
}

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}: CommentFormProps) => {
  const [text, setText] = useState<string>(initialText);
  const isTextareaDisabled = text.trim().length === 0;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isTextareaDisabled) return;
    handleSubmit(text.trim());
    setText("");
  };

  const onCancel = () => {
    setText("");
    handleCancel?.();
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <textarea
        className="w-full min-h-[88px] p-3 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-400 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Viết bình luận..."
      />

      <div className="flex items-center gap-3 mt-2">
        <button
          type="submit"
          disabled={isTextareaDisabled}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            isTextareaDisabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {submitLabel}
        </button>

        {hasCancelButton && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 rounded-md text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;

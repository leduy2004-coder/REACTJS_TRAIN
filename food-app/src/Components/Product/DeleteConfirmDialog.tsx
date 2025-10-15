import { useState } from "react";

interface ConfirmDeleteModalProps {
  title?: string;
  message?: string;
  onConfirm: () => Promise<void> | void;
}

const ConfirmDeleteModal = ({
  title = "Xác nhận xoá",
  message = "Bạn có chắc chắn muốn xoá mục này? Hành động này không thể hoàn tác.",
  onConfirm,
}: ConfirmDeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Nút mở modal */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-1 text-sm text-white shadow-sm transition-all hover:bg-red-700"
      >
        🗑 Xóa
      </button>

      {/* Modal */}
      {open && (
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{message}</p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="rounded-md bg-red-600 px-3 py-1 text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Đang xoá..." : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDeleteModal;

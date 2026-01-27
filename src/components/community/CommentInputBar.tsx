import { useState } from "react";

interface Props {
  onSend?: (content: string) => void;
}

const CommentInputBar = ({ onSend }: Props) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;

    onSend?.(value);
    setValue("");
  };

  return (
    <div className="z-[998] fixed bottom-0 w-full fixed max-w-[420px] bg-white border-t border-gray-300 px-4 py-2 flex items-center gap-3">
      {/* 입력창 */}
      <input
        type="text"
        placeholder="댓글을 입력하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 text-sm px-3 py-2 border border-gray-400 rounded-lg outline-none focus:ring-1 focus:ring-gray-300"
      />

      {/* 전송 버튼 */}
      <button onClick={handleSend} className="flex items-center justify-center">
        <img src="/icon/send.svg" alt="send" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CommentInputBar;

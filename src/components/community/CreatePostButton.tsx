import { useNavigate, useLocation } from "react-router-dom";
import { CommonButton } from "@components/common";

const CreatePostButton = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isFree = pathname.includes("/community/free");
  const isQuestion = pathname.includes("/community/question");

  const handleCreatePost = () => {
    if (isFree) {
      navigate("/community/new/free");
    } else if (isQuestion) {
      navigate("/community/new/question");
    }
  };

  return (
    <div className="fixed bottom-[100px] flex w-full max-w-[420px] flex-row items-end justify-end px-4">
      <CommonButton
        onClick={handleCreatePost}
        width="w-[60px]"
        padding="p-0"
        shadow={true}
        className="h-[60px] !rounded-full shadow-xl"
        label="十"
      />
    </div>
  );
};

export default CreatePostButton;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommonModal } from "@components/common";
import { SimpleHeader } from "@components/layout";
import {
  NewPostImageUploader,
  NewPostContentInput,
  RewardToken,
  TokenSelect,
} from "@components/community";

const CreatePost = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const isAnswer = type === "answer";
  const isQuestionPost = type === "question";

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [rewardToken, setRewardToken] = useState(0);
  const [rewardTokenModalOpen, setRewardTokenModalOpen] = useState(false);

  const isSubmitActive =
    content.trim() !== "" && (isQuestionPost ? rewardToken >= 1 : true);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmitClick = () => {
    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    formData.append("content", content);

    // api 로직 추가
    navigate(-1);
  };

  const handleRewardTokenConfirm = () => {
    setRewardTokenModalOpen(false);
  };

  return (
    <div>
      <SimpleHeader
        onBackClick={handleBackClick}
        button={
          isSubmitActive ? (
            <div
              className="font-semibold font-xs text-yellow-400 items-center cursor-pointer"
              onClick={handleSubmitClick}
            >
              등록하기
            </div>
          ) : (
            <div className="font-semibold font-xs text-gray-400 items-center cursor-pointer">
              등록하기
            </div>
          )
        }
      />

      <div className="flex flex-col gap-4">
        <NewPostImageUploader onChange={setImageFile} />
        <NewPostContentInput onChange={setContent} />
      </div>

      {isQuestionPost && !isAnswer && (
        <div className="fixed bottom-10 w-full max-w-[420px] px-6">
          <RewardToken
            rewardToken={rewardToken}
            onClick={() => setRewardTokenModalOpen(true)}
          />
        </div>
      )}

      {isQuestionPost && !isAnswer && rewardTokenModalOpen && (
        <CommonModal
          title="보상 토큰 지급"
          desc={`채택된 답변의 사용자에게 <b>${rewardToken} MZTK</b>을 지급합니다.`}
          confirmLabel="설정"
          onConfirmClick={handleRewardTokenConfirm}
        >
          <TokenSelect setRewardToken={setRewardToken} />
        </CommonModal>
      )}
    </div>
  );
};

export default CreatePost;

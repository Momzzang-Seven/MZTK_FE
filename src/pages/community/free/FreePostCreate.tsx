import { useNavigate } from "react-router-dom";
import { SimpleHeader } from "@components/layout";
import {
  NewPostImageUploader,
  NewPostContentInput,
} from "@components/community";

const FreePostCreate = () => {
  const navigate = useNavigate();

  const handleSubmitClick = () => {
    navigate("/community");
  };

  return (
    <div>
      <SimpleHeader
        button={
          <div
            className="font-semibold font-xs text-yellow-400 items-center cursor-pointer"
            onClick={handleSubmitClick}
          >
            공유하기
          </div>
        }
      />

      <div className="flex flex-col gap-4">
        <NewPostImageUploader
          onChange={(file) => {
            // 전송 시 파일 처리 로직
            console.log(file);
          }}
        />

        <NewPostContentInput
          onChange={(text) => {
            // 전송 시 내용 처리 로직
            console.log(text);
          }}
        />
      </div>
    </div>
  );
};

export default FreePostCreate;

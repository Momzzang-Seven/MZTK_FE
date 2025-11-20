import Lottie from "lottie-react";
import bubble from "@assets/speechbubble.json";

const Err404 = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center mx-auto w-[calc(100%-40px)] gap-y-[20px]">
      <Lottie
        animationData={bubble}
        style={{ width: "150px", height: "150px" }}
      />
      <div className="title font-bold">404</div>
    </div>
  );
};

export default Err404;

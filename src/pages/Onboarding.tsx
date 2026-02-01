import { useNavigate } from "react-router-dom";
import { OnboardingHeader } from "@components/onboarding/OnboardingHeader";
import { OnboardingAnimation } from "@components/onboarding/OnboardingAnimation";
import { CommonButton } from "@components/common";
import { ONBOARDING_TEXT } from "@constant/onboarding";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-white px-6 pt-20 pb-10">
      <OnboardingHeader />
      <OnboardingAnimation />

      <div className="flex flex-col gap-4">
        <CommonButton
          label={ONBOARDING_TEXT.BTN_CREATE}
          onClick={() => navigate("/create-wallet")}
          bgColor="bg-main"
          textColor="text-black"
          className="h-[60px] rounded-xl active:opacity-90 transition-opacity font-base shadow-none"
        // CommonButton's default shadow might need to be overridden if the design was flat
        />

        <div className="relative">
          <CommonButton
            label={ONBOARDING_TEXT.BTN_REGISTER}
            onClick={() => navigate("/register-wallet")}
            bgColor="bg-white"
            textColor="text-black"
            border="border-2 border-main"
            className="h-[60px] rounded-xl active:bg-orange-50 transition-colors font-base shadow-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

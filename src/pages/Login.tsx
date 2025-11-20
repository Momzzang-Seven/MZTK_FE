import { GetGoogleLogin, GetKakaoLogin } from "@services/auth";

const Login = () => {
  const goToKakaoLogin = async () => {
    const res = await GetKakaoLogin();
    window.location.href = res;
  };

  const goToGoogleLogin = async () => {
    const res = await GetGoogleLogin();
    window.location.href = res;
  };

  return (
    <div className="mx-5">
      <div className="title">Login Lab</div>
      <button
        type="button"
        className="bg-main p-2"
        onClick={() => goToKakaoLogin()}
      >
        카카오로 로그인하기
      </button>
      <button
        type="button"
        className="bg-sub p-2"
        onClick={() => goToGoogleLogin()}
      >
        구글로 로그인하기
      </button>
    </div>
  );
};

export default Login;

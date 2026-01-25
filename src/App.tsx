import { Layout } from "@components/layout";
import {
  Callback,
  Err404,
  Home,
  Login,
  My,
  MyTx,
  Verify,
  Community,
  FreeDetailPage,
  FreeCreatePage,
  QuestionDetailPage,
  QuestionCreatePage,
} from "@pages";
import ExerciseAuth from "./pages/ExerciseAuth";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/login-success" element={<Navigate to="/" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Protected Routes (Temporarily Open) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<Verify />} />
            {/* Community */}
            <Route path="/community" element={<Community />} />
            <Route path="/community/f/postId" element={<FreeDetailPage />} />
            <Route path="/community/f/new" element={<FreeCreatePage />} />
            <Route
              path="/community/q/postId"
              element={<QuestionDetailPage />}
            />
            <Route path="/community/q/new" element={<QuestionCreatePage />} />
            {/* my */}
            <Route path="/my" element={<My />} />
            <Route path="/myTknTx" element={<MyTx />} />
            {/* auth */}
            <Route path="/exercise-auth" element={<ExerciseAuth />} />
          </Route>

          {/* Error */}
          <Route path="/404" element={<Err404 />} />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

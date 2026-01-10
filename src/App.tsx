import { Layout } from "@components/layout";
import {
  Callback,
  Err404,
  Home,
  Login,
  My,
  MyTx,
  Verify,
  FreeListPage,
  FreeDetailPage,
  FreeCreatePage,
  QuestionListPage,
  QuestionDetailPage,
  QuestionCreatePage,
} from "@pages";
import ExerciseAuth from "./pages/ExerciseAuth";
import Onboarding from "./pages/Onboarding";

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
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          {/* Community */}
          <Route path="/community" element={<FreeListPage />} />
          <Route path="/community/free" element={<FreeListPage />} />
          <Route path="/community/free/postId" element={<FreeDetailPage />} />
          <Route path="/community/free/new" element={<FreeCreatePage />} />
          <Route path="/community/question" element={<QuestionListPage />} />
          <Route
            path="/community/question/:postId"
            element={<QuestionDetailPage />}
          />
          <Route
            path="/community/question/new"
            element={<QuestionCreatePage />}
          />
          {/* my */}
          <Route path="/my" element={<My />} />
          <Route path="/myTknTx" element={<MyTx />} />
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/login-success" element={<Navigate to="/" replace />} />
          <Route path="/exercise-auth" element={<ExerciseAuth />} />

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

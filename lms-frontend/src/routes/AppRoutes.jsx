import { Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import Courses from "@/pages/public/Courses";
import CourseDetails from "@/pages/public/CourseDetails";

import StudentDashboard from "@/pages/student/StudentDashboard";
import InstructorDashboard from "@/pages/instructor/InstructorDashboard";
import LecturePlayer from "@/pages/student/LecturePlayer";

import ProtectedRoute from "@/routes/ProtectedRoute";

const Home = () => (
  <div className="flex items-center justify-center h-[80vh]">
    <h1 className="text-4xl font-bold">LMS Platform 🚀</h1>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />

      {/* Student */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student" element={<StudentDashboard />} />

        <Route path="/course/:courseId/player" element={<LecturePlayer />} />
      </Route>

      {/* Instructor */}
      <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
        <Route path="/instructor" element={<InstructorDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Courses from "@/pages/public/Courses";
import CourseDetails from "@/pages/public/CourseDetails";
import ProtectedRoute from "@/routes/ProtectedRoute";
import LecturePlayer from "@/pages/student/LecturePlayer";

// Temp dashboards
const StudentDashboard = () => <h1>Student Dashboard</h1>;
const InstructorDashboard = () => <h1>Instructor Dashboard</h1>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />

      {/* Student */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student" element={<StudentDashboard />} />
      </Route>
      <Route path="/course/:courseId/player" element={<LecturePlayer />} />

      {/* Instructor */}
      <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
        <Route path="/instructor" element={<InstructorDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

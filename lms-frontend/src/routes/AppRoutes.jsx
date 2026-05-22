import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import PageLoader from "@/shared/ui/page-loader";

// Lazy Loaded Pages

const Courses = lazy(() => import("@/pages/public/Courses"));

const CourseDetails = lazy(() => import("@/pages/public/CourseDetails"));

const Login = lazy(() => import("@/pages/auth/Login"));

const Register = lazy(() => import("@/pages/auth/Register"));

const StudentDashboard = lazy(() => import("@/pages/student/StudentDashboard"));

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Courses />
            </PublicLayout>
          }
        />

        <Route
          path="/courses/:id"
          element={
            <PublicLayout>
              <CourseDetails />
            </PublicLayout>
          }
        />

        {/* AUTH ROUTES */}

        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />

        <Route
          path="/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />

        {/* STUDENT REDIRECT */}

        <Route
          path="/student"
          element={<Navigate to="/student/dashboard" replace />}
        />

        {/* STUDENT ROUTES */}

        <Route
          path="/student/dashboard"
          element={
            <DashboardLayout>
              <StudentDashboard />
            </DashboardLayout>
          }
        />

        {/* FALLBACK */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;

import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>

        <Link to="/courses" className="text-indigo-600 font-medium">
          Browse Courses →
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;

import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";

const InstructorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Manage Courses</h2>

        <Button asChild>
          <Link to="/courses">View Courses</Link>
        </Button>
      </div>
    </div>
  );
};

export default InstructorDashboard;

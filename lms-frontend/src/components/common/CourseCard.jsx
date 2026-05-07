import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/courses/${course._id}`)}
      className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer"
    >
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>

      <p className="text-sm text-gray-600 mb-3">{course.description}</p>

      <span className="text-sm font-medium text-indigo-600">
        {course.instructor?.name || "Instructor"}
      </span>
    </div>
  );
};

export default CourseCard;

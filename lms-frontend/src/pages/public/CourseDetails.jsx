import { useParams, useNavigate } from "react-router-dom";
import {
  useGetCourseByIdQuery,
  useEnrollCourseMutation,
} from "@/features/course/courseApi";
import { useSelector } from "react-redux";
import { Button } from "@/shared/ui/button";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ INSIDE component

  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError } = useGetCourseByIdQuery(id);
  const [enroll, { isLoading: enrolling }] = useEnrollCourseMutation();

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load course</p>
    );
  }

  const course = data?.course || data;

  const handleEnroll = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await enroll({
        courseId: course._id,
        userId: user._id || user.id,
      }).unwrap();

      alert("Enrolled successfully!");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Enrollment failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>

      <p className="text-gray-700 mb-4">{course.description}</p>

      <p className="mb-4">
        <strong>Price:</strong> ₹{course.price}
      </p>

      <Button onClick={handleEnroll} disabled={enrolling}>
        {enrolling ? "Enrolling..." : "Enroll Now"}
      </Button>

      {/* ✅ Start Learning Button */}
      <Button
        className="mt-4"
        onClick={() => navigate(`/course/${course._id}/player`)}
      >
        Start Learning
      </Button>
    </div>
  );
};

export default CourseDetails;

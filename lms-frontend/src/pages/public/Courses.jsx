import { useGetCoursesQuery } from "@/features/course/courseApi";
import CourseCard from "@/components/common/CourseCard";

const Courses = () => {
  const { data, isLoading, isError } = useGetCoursesQuery();

  if (isLoading) {
    return <p className="text-center mt-10">Loading courses...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load courses</p>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {data?.courses?.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default Courses;

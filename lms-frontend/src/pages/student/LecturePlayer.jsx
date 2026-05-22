import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  useGetLecturesQuery,
  useMarkCompleteMutation,
} from "@/features/lecture/lectureApi";
import { Button } from "@/shared/ui/button";

const LecturePlayer = () => {
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError } = useGetLecturesQuery(courseId);
  const [markComplete] = useMarkCompleteMutation();

  const lectures = data?.lectures || [];

  const [activeLecture, setActiveLecture] = useState(null);

  // Set first lecture when data loads
  if (!activeLecture && lectures.length > 0) {
    setActiveLecture(lectures[0]);
  }

  const handleComplete = async (lectureId) => {
    try {
      await markComplete({
        lectureId,
        userId: user._id || user.id,
      }).unwrap();

      alert("Lecture marked complete!");
    } catch (err) {
      alert(err?.data?.message || "Failed");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading lectures...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load lectures</p>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
        <h2 className="font-bold mb-4 text-lg">Lectures</h2>

        {lectures.map((lecture) => (
          <div
            key={lecture._id}
            onClick={() => setActiveLecture(lecture)}
            className={`mb-3 p-3 rounded cursor-pointer transition ${
              activeLecture?._id === lecture._id
                ? "bg-indigo-100 border border-indigo-400"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <p className="font-medium">{lecture.title}</p>

            <Button
              size="sm"
              className="mt-2"
              onClick={(e) => {
                e.stopPropagation();
                handleComplete(lecture._id);
              }}
            >
              Mark Complete
            </Button>
          </div>
        ))}
      </div>

      {/* Player */}
      <div className="flex-1 p-6">
        {activeLecture ? (
          <>
            <h1 className="text-xl font-bold mb-4">{activeLecture.title}</h1>

            <video
              controls
              className="w-full rounded-lg shadow"
              src={activeLecture.videoUrl}
            />
          </>
        ) : (
          <p>Select a lecture to start</p>
        )}
      </div>
    </div>
  );
};

export default LecturePlayer;

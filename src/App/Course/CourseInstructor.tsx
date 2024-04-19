import { useEffect, useState } from "react";
import { getProfile } from "../../Services/api/user";
import CourseInstructor from "../../Components/Table/Course/CourseInstructor";

function PageCourseInstructor() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const handleGetCourse = async () => {
    setLoading(true);
    getProfile()
      .then((res) => {
        setData(res?.data?.data?.coursesPosted);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetCourse();
    setLoading(false);
  }, []);
  return (
    <>
      <CourseInstructor
        data={data}
        loading={loading}
        handleGetCourse={handleGetCourse}
      />
    </>
  );
}

export default PageCourseInstructor;

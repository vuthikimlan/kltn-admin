import { useEffect, useState } from "react";
import { getUserById } from "../../Services/api/user";
import CourseInstructor from "../../Components/Table/Course/CourseInstructor";
import { useParams } from "react-router-dom";

function PageCourseInstructorAdmin() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [name, setName] = useState();
  const { id } = useParams();
  const handleGetInforUser = async () => {
    setLoading(true);
    getUserById(id)
      .then((res) => {
        if (res.status === 200) {
          setData(res?.data?.data?.coursesPosted);
          setName(res?.data?.data?.name);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetInforUser();
    setLoading(false);
  }, [id]);

  return (
    <>
      <CourseInstructor
        data={data}
        loading={loading}
        nameInstructor={name}
        handleGetCourse={handleGetInforUser}
      />
    </>
  );
}

export default PageCourseInstructorAdmin;

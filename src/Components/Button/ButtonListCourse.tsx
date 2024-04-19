import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function ButtonListCourse({ id }: any) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          navigate(`/admin/course-instructor/${id}`);
        }}
      >
        Khóa học
      </Button>
    </>
  );
}

export default ButtonListCourse;

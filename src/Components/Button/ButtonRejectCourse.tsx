import { Button, message } from "antd";
import { rejectedCourse } from "../../Services/api/course";

function RejectedCourse({ requestId, key, getCourse }: any) {
  const handleAcceptCourse = () => {
    rejectedCourse(requestId).then((res) => {
      if (res.status === 200) {
        message.success("Từ chối khóa học");
      }
    });
  };
  return (
    <>
      <Button
        onClick={() => {
          handleAcceptCourse();
          getCourse();
        }}
        key={key}
      >
        Từ chối
      </Button>
    </>
  );
}

export default RejectedCourse;

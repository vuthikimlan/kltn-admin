import { Button, message } from "antd";
import { isAcceptCourse } from "../../Services/api/course";

function AcceptCourse({ requestId, key, getCourse }: any) {
  const handleAcceptCourse = () => {
    isAcceptCourse(requestId).then((res) => {
      if (res.status === 200) {
        message.success("Phê duyệt khóa học");
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
        Chấp nhận
      </Button>
    </>
  );
}

export default AcceptCourse;

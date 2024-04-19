import { Button, notification } from "antd";
import { approveCourse } from "../../Services/api/course";

function ButtonApprove({ idCourse }: any) {
  const handleApproveCourse = () => {
    approveCourse(idCourse).then((res) => {
      if (res.status === 201) {
        notification.success({
          message: "Gửi yêu cầu phê duyệt thành công",
        });
      }
    });
  };
  return (
    <>
      <Button
        onClick={() => {
          handleApproveCourse();
        }}
      >
        Gửi yêu cầu phê duyệt
      </Button>
    </>
  );
}

export default ButtonApprove;

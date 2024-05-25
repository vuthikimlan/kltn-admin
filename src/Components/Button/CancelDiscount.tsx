import { Button, message } from "antd";
import { cancelDiscount } from "../../Services/api/course";

function CancelDiscount({ record, handleGetCourse }: any) {
  const handleCancelDiscount = () => {
    cancelDiscount(record).then((res) => {
      if (res.status === 200) {
        message.success("Hủy mã giảm giá thành công");
        handleGetCourse();
      }
    });
  };
  return (
    <>
      <Button onClick={handleCancelDiscount}>Hủy mã giảm giá</Button>
    </>
  );
}

export default CancelDiscount;

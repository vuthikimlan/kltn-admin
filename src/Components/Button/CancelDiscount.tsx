import { Button, message } from "antd";
import { cancelDiscount } from "../../Services/api/course";

function CancelDiscount({ record }: any) {
  const handleCancelDiscount = () => {
    cancelDiscount(record).then((res) => {
      console.log(res);
      if (res.status === 200) {
        message.success("Hủy mã giảm giá thành công");
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

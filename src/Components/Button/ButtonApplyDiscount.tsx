import { Button } from "antd";
import { useDispatch } from "react-redux";
import { modalAddEditOpen } from "../../store/modalSlice";

const ButtonApplyDiscount = ({ record, modalKey }: any) => {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        onClick={() => {
          dispatch(modalAddEditOpen({ modalKey, data: record }));
        }}
      >
        Áp dụng mã giảm giá
      </Button>
    </>
  );
};

export default ButtonApplyDiscount;

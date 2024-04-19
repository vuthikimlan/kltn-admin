import { Button } from "antd";
import { useDispatch } from "react-redux";
import { modalAddEditOpen } from "../../../store/modalSlice";

function ButtonAddLectures() {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        onClick={() => {
          dispatch(modalAddEditOpen({ modalKey: "modalLectures", data: {} }));
        }}
      >
        Thêm bài giảng
      </Button>
    </>
  );
}

export default ButtonAddLectures;

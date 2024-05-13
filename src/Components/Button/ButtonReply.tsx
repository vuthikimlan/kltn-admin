import { Button, Popover } from "antd";
import ReplyCourse from "../PopOver/ReplyCourse";
import { openPopOver } from "../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";

function ButtonReply(idComment: any) {
  const hiddenPopOver = useSelector((state: any) => state?.modal.hiddenPopOver);
  const dispatch = useDispatch();
  return (
    <div>
      <Popover
        title="Phản hồi đánh giá"
        content={<ReplyCourse idComment={idComment} />}
        open={hiddenPopOver}
        onOpenChange={() => {
          dispatch(openPopOver());
        }}
        trigger="click"
      >
        <Button>Phản hồi</Button>
      </Popover>
    </div>
  );
}

export default ButtonReply;

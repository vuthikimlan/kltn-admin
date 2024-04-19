import { FilterOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { openPopOver } from "../../store/modalSlice";

const ButtonFilter = ({ content }: any) => {
  const dispatch = useDispatch();
  const hiddenPopOver = useSelector(
    (state: RootState) => state?.modal.hiddenPopOver
  );
  return (
    <div>
      <Popover
        trigger="click"
        content={content}
        open={hiddenPopOver}
        onOpenChange={() => {
          dispatch(openPopOver());
        }}
      >
        <Button>
          <FilterOutlined />
          Lọc
        </Button>
      </Popover>
    </div>
  );
};

export default ButtonFilter;

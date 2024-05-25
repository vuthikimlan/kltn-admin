import { Button, Popover } from "antd";
import AddPart from "../../PopOver/addCourse";

function ButtonAddCourse({ getCourse }: any) {
  return (
    <>
      <Popover
        title="Thêm phần mới"
        content={<AddPart getCourse={getCourse()} trigger="click" />}
      >
        <Button>+ Phần</Button>
      </Popover>
    </>
  );
}

export default ButtonAddCourse;

import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { deletePart } from "../../../Services/api/course";
import { useLocation } from "react-router-dom";

const DeletePart = ({ id, getCourse }: any) => {
  const location = useLocation();
  const pathItems = location.pathname.split("/");
  const idCourse = pathItems[pathItems.length - 1];
  const handleDelPart = () => {
    deletePart(idCourse, id).then((res) => {
      if (res.status === 200) {
        getCourse(idCourse);
      }
    });
  };
  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    handleDelPart();
  };

  return (
    <>
      <Popconfirm
        title="Xóa phần học"
        description="Bạn có chắc chắn xóa phần học này"
        onConfirm={confirm}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Button
          danger
          className="delete ml-[10px] "
          icon={<DeleteOutlined />}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          Xóa phần
        </Button>
      </Popconfirm>
    </>
  );
};

export default DeletePart;

import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useLocation } from "react-router-dom";
import { deleteLecture } from "../../../Services/api/course";

function DeleteLecture({ idPart, idLecture, getCourse }: any) {
  const location = useLocation();
  const pathItems = location.pathname.split("/");
  const idCourse = pathItems[pathItems.length - 1];
  const handleDelLecture = () => {
    deleteLecture(idCourse, idPart, idLecture).then((res) => {
      if (res.status === 200) {
        getCourse(idCourse);
      }
    });
  };
  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log("e", e);
    handleDelLecture();
  };
  return (
    <>
      <Popconfirm
        title="Xóa bài giảng"
        description="Bạn có chắc chắn xóa bài giảng này"
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
          Xóa bài giảng
        </Button>
      </Popconfirm>
    </>
  );
}

export default DeleteLecture;

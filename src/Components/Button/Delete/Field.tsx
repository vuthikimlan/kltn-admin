import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { deleteField } from "../../../Services/api/category";

const DeleteField = ({ fieldId, getField }: any) => {
  const handleDelField = () => {
    deleteField(fieldId).then((res) => {
      if (res.status === 200) {
        getField();
      }
    });
  };
  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    handleDelField();
  };

  return (
    <>
      <Popconfirm
        title="Xóa thể loại "
        description="Bạn có chắc chắn xóa thể loại này"
        onConfirm={confirm}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Button danger className="delete ml-[10px] " icon={<DeleteOutlined />}>
          Xóa thể loại
        </Button>
      </Popconfirm>
    </>
  );
};

export default DeleteField;

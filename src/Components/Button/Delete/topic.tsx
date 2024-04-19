import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { deleteTopic } from "../../../Services/api/category";

const DeleteTopic = ({ fieldId, getField, topicId }: any) => {
  const handleDelField = () => {
    deleteTopic(fieldId, topicId).then((res) => {
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
        title="Xóa chủ đề "
        description="Bạn có chắc chắn xóa chủ đề này"
        onConfirm={confirm}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Button danger className="delete ml-[10px] " icon={<DeleteOutlined />}>
          Xóa chủ đề
        </Button>
      </Popconfirm>
    </>
  );
};

export default DeleteTopic;

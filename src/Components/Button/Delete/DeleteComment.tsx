import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { deleteComment } from "../../../Services/api/Comment";
import { useParams } from "react-router-dom";

interface DataType {
  onSuccess: () => void;
  record: any;
}

function DeleteComment({ record, onSuccess }: DataType) {
  const { id }: any = useParams();
  const handleDelete = () => {
    deleteComment(id, record._id).then((res) => {
      if (res.status === 200) {
        onSuccess();
      }
    });
  };
  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    handleDelete();
  };
  return (
    <>
      <>
        <Popconfirm
          title="Xóa đánh giá "
          description="Bạn có chắc chắn xóa đánh giá này"
          onConfirm={confirm}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <Button danger className="delete" icon={<DeleteOutlined />}></Button>
        </Popconfirm>
      </>
    </>
  );
}

export default DeleteComment;

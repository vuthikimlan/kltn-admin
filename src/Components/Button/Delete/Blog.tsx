import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { deleteBlog } from "../../../Services/api/blog";

interface DataType {
  onSuccess: () => void;
  record: any;
}

const DeleteBlog = ({ onSuccess, record }: DataType) => {
  const handleDelete = () => {
    deleteBlog(record._id).then((res) => {
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
      <Popconfirm
        title="Xóa bài viết"
        description="Bạn có chắc chắn xóa bài viết này"
        onConfirm={confirm}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Button danger className="delete" icon={<DeleteOutlined />}></Button>
      </Popconfirm>
    </>
  );
};

export default DeleteBlog;

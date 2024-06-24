import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { deleteAssignment } from "../../../Services/api/course";

const DeleteAssignment = ({ onSuccess, courseId, assignmentId }: any) => {
  const handleDelete = () => {
    deleteAssignment(courseId, assignmentId).then((res) => {
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
        title="Xóa bài tập"
        description="Bạn có chắc chắn xóa bài tập này"
        onConfirm={confirm}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Button danger className="delete" icon={<DeleteOutlined />}></Button>
      </Popconfirm>
    </>
  );
};

export default DeleteAssignment;

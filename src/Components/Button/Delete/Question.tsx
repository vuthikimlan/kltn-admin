import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { deleteQuestion } from "../../../Services/api/course";

const DeleteQuestion = ({
  onSuccess,
  courseId,
  assignmentId,
  questionId,
}: any) => {
  const handleDelete = () => {
    deleteQuestion(courseId, assignmentId, questionId).then((res) => {
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
        title="Xóa câu hỏi"
        description="Bạn có chắc chắn xóa câu hỏi này"
        onConfirm={confirm}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Button danger className="delete" icon={<DeleteOutlined />}></Button>
      </Popconfirm>
    </>
  );
};

export default DeleteQuestion;

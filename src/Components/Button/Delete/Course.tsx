import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { deleteCourse } from "../../../Services/api/course";
import React from "react";

const DeleteCourse = ({ onSuccess, record, disabled }: any) => {
  const handleDelete = () => {
    deleteCourse(record._id).then((res) => {
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
        title="Xóa khóa học"
        description="Bạn có chắc chắn xóa khóa học này"
        onConfirm={confirm}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Button
          danger
          disabled={disabled}
          className="delete"
          icon={<DeleteOutlined />}
        ></Button>
      </Popconfirm>
    </>
  );
};

export default DeleteCourse;

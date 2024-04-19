import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { deleteDiscount } from "../../../Services/api/discount";

interface DataType {
  onSuccess: () => void;
  record: any;
}

const DeleteDiscount = ({ onSuccess, record }: DataType) => {
  const handleDelete = () => {
    deleteDiscount(record._id).then((res) => {
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
        title="Xóa mã giảm giá"
        description="Bạn có chắc chắn xóa mã giảm giá này"
        onConfirm={confirm}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Button danger className="delete" icon={<DeleteOutlined />}></Button>
      </Popconfirm>
    </>
  );
};

export default DeleteDiscount;

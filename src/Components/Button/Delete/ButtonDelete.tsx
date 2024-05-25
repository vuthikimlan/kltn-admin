import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { deleteUser } from "../../../Services/api/user";
// import './style.css'
import "../../style.css";

// interface DataType {
//   onSuccess: () => void;
//   record: any;
//   disabled: any;
// }

const ButtonDelete = ({ onSuccess, record, disabled }: any) => {
  const handleDelete = () => {
    deleteUser(record._id).then((res) => {
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
        title="Xóa người dùng"
        description="Bạn có chắc chắn xóa người dùng này"
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

export default ButtonDelete;

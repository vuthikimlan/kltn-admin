import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { modalAddEditOpen } from "../../store/modalSlice";

const ButtonEdit = ({ record, modalKey }: any) => {
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(modalAddEditOpen({ modalKey, data: record }));
  };

  return (
    <>
      <Button
        className="update"
        icon={<EditOutlined />}
        onClick={() => {
          showModal();
        }}
      ></Button>
    </>
  );
};

export default ButtonEdit;

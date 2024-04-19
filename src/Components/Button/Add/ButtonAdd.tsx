import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { modalAddEditOpen } from "../../../store/modalSlice";

type DataType = {
  text: string;
  modalKey: string;
};

const ButtonAdd = ({ text, modalKey }: DataType) => {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        onClick={() => {
          dispatch(modalAddEditOpen({ modalKey, data: {} }));
        }}
      >
        {text}
      </Button>
    </>
  );
};

export default ButtonAdd;

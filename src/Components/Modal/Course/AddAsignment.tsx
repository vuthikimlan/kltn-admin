import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { modalAddEditClose } from "../../../store/modalSlice";
import {
  createAssignment,
  updateAssignment,
} from "../../../Services/api/course";
import { FormInstance, message } from "antd";
import { useRef } from "react";

const AddAssignment = ({ courseId, getAssignment }: any) => {
  const formRef = useRef<FormInstance>(null);

  const dispatch = useDispatch();
  const modalOpen = useSelector(
    (state: RootState) => state?.modal?.modalOpen.modalAssignment
  );
  const updateData = useSelector((state: any) => state?.modal?.modalData);

  const hiddenModal = () => {
    dispatch(modalAddEditClose({ modalKey: "modalAssignment" }));
  };

  const handleCreateAssignment = (values: any) => {
    createAssignment(courseId, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo bài tập thành công");
        getAssignment();
        hiddenModal();
      }
    });
  };
  const handleUpdateAssignment = (values: any) => {
    updateAssignment(courseId, updateData._id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật bài tập thành công");
        getAssignment();
        hiddenModal();
      }
    });
  };

  return (
    <>
      <ModalForm
        title={updateData._id ? "Chỉnh sửa khóa học" : "Thêm khóa học"}
        initialValues={updateData}
        open={modalOpen}
        formRef={formRef}
        modalProps={{
          destroyOnClose: true,
        }}
        onOpenChange={(open) => {
          if (!open) {
            dispatch(modalAddEditClose({ modalKey: "modalAssignment" }));
          }
        }}
        onFinish={async (values) => {
          if (updateData?._id) {
            handleUpdateAssignment(values);
          } else {
            handleCreateAssignment(values);
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="nameAssignment"
            label="Tên bài tập"
            placeholder="Tên bài tập"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên bài tập",
              },
            ]}
          />

          <ProFormTextArea
            width="md"
            name="descriptionAssignment"
            label="Mô tả"
            placeholder="Mô tả"
          />
          <ProFormDatePicker
            width="md"
            name="dueDate"
            label="Thời gian hoàn thành"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian hoàn thành",
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default AddAssignment;

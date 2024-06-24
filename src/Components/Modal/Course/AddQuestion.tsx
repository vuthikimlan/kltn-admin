import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { modalAddEditClose } from "../../../store/modalSlice";
import { addQuestion, updateQuestion } from "../../../Services/api/course";
import { FormInstance, message } from "antd";
import { useRef } from "react";

const AddQuestion = ({ courseId, assignmentId, getQuestion }: any) => {
  const formRef = useRef<FormInstance>(null);

  const dispatch = useDispatch();
  const modalOpen = useSelector(
    (state: RootState) => state?.modal?.modalOpen.modalQuestion
  );
  const updateData = useSelector((state: any) => state?.modal?.modalData);

  const hiddenModal = () => {
    dispatch(modalAddEditClose({ modalKey: "modalQuestion" }));
  };

  const handleCreateQuestion = (values: any) => {
    addQuestion(courseId, assignmentId, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo câu hỏi thành công");
        getQuestion();
        hiddenModal();
      }
    });
  };
  const handleUpdateQuestion = (values: any) => {
    updateQuestion(courseId, assignmentId, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhập câu hỏi thành công");
        // getAssignment();
        hiddenModal();
      }
    });
  };

  return (
    <>
      <ModalForm
        title={updateData._id ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi"}
        initialValues={updateData}
        open={modalOpen}
        formRef={formRef}
        modalProps={{
          destroyOnClose: true,
        }}
        onOpenChange={(open) => {
          if (!open) {
            dispatch(modalAddEditClose({ modalKey: "modalQuestion" }));
          }
        }}
        onFinish={async (values) => {
          handleCreateQuestion(values);
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            name="type"
            label="Loại câu hỏi"
            placeholder=" Chọn loại câu hỏi"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại câu hỏi",
              },
            ]}
            options={[
              { label: "Trắc nghiệm", value: "multiple-choice" },
              { label: "Tự luận", value: "open-ended" },
            ]}
          />
          <ProFormText
            width="md"
            name="question"
            label="Tên câu hỏi"
            placeholder="Tên câu hỏi"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên câu hỏi",
              },
            ]}
          />

          <ProFormTextArea
            width="md"
            name="answer"
            label="Câu trả lời"
            placeholder="Câu trả lời"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default AddQuestion;

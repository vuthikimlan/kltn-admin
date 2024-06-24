import {
  ProForm,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import { useDispatch } from "react-redux";
import { hiddenPopOverAnswer } from "../../store/modalSlice";
import { Button, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { addOptions } from "../../Services/api/course";

const AddAnswer = ({
  courseId,
  assignmentId,
  questionId,
  getQuestion,
}: any) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const hide = () => {
    dispatch(hiddenPopOverAnswer());
  };

  const handleCreateOptions = (values: any) => {
    addOptions(courseId, assignmentId, questionId, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Thêm mới câu trả lời thành công");
        hide();
        getQuestion();
        form.resetFields();
      }
    });
  };
  // const handleUpdateAssignment = (values: any) => {
  //   updateAssignment(courseId, values).then((res) => {
  //     if (res?.data?.success === true) {
  //       message.success("Tạo bài tập thành công");
  //       getAssignment();
  //       hiddenModal();
  //     }
  //   });
  // };

  return (
    <>
      <ProForm
        onFinish={async (values) => {
          handleCreateOptions(values);
        }}
        form={form}
        submitter={false}
      >
        <ProFormText
          width="md"
          name="option"
          label="Câu trả lời"
          placeholder="Câu trả lời"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập câu trả lời",
            },
          ]}
        />
        <ProFormSwitch
          name="isCorrect"
          label="Đáp án đúng"
          initialValue={false}
        />
        <Form.Item>
          <Button
            style={{ border: "1px solid #d9d9d9", marginRight: 10 }}
            type="primary"
            htmlType="submit"
          >
            Đồng ý
          </Button>
          <Button
            style={{
              border: "1px solid #d9d9d9",
              backgroundColor: "#fff",
              color: "black",
            }}
            type="primary"
            onClick={hide}
          >
            Hủy
          </Button>
        </Form.Item>
      </ProForm>
    </>
  );
};

export default AddAnswer;

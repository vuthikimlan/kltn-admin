import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { hiddenPopOver } from "../../store/modalSlice";
import { replyCourse } from "../../Services/api/comment";

function ReplyCourse({ idComment }: any) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const hide = () => {
    dispatch(hiddenPopOver());
  };

  const handleReplyCourse = (values: any) => {
    replyCourse(idComment, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Phản hồi thành công");
        hide();
        form.resetFields();
      }
    });
    hide();
  };

  return (
    <>
      <>
        <ProForm
          title="Phản hồi đánh giá"
          onFinish={async (values) => {
            handleReplyCourse(values);
          }}
          form={form}
          submitter={false}
        >
          <ProFormText
            width="md"
            name="content"
            placeholder="Nội phản hồi"
            label="Phản hồi"
            //   initialValue={partName}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập phản hồi",
              },
            ]}
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
    </>
  );
}

export default ReplyCourse;

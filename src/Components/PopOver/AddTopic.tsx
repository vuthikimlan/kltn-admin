import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { hiddenPopOver } from "../../store/modalSlice";
import { createTopic } from "../../Services/api/category";

function AddTopic({ fieldId, getField }: any) {
  const [form] = useForm();
  const dispatch = useDispatch();

  const hide = () => {
    dispatch(hiddenPopOver());
  };

  const handleAddTopic = (values: any) => {
    createTopic(fieldId, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo phần mới thành công");
        getField();
        hide();
        form.resetFields();
      }
    });
  };

  return (
    <>
      <ProForm
        title="Thêm chủ đề mới"
        onFinish={async (values) => {
          handleAddTopic(values);
        }}
        form={form}
        submitter={false}
      >
        <ProFormText
          width="md"
          name="nameTopic"
          placeholder="Nhập tên chủ đề "
          label="Chủ đề"
          //   initialValue={partName}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên chủ đề",
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
  );
}
export default AddTopic;

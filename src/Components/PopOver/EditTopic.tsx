import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { hiddenPopOverEdit } from "../../store/modalSlice";
import { updateTopic } from "../../Services/api/category";

function EditTopic({ fieldId, topicId, getField, nameTopic }: any) {
  const [form] = useForm();

  const dispatch = useDispatch();
  const hide = () => {
    dispatch(hiddenPopOverEdit());
  };
  const handleUpdateTopic = (values: any) => {
    updateTopic(fieldId, topicId, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật chủ đề thành công");
        getField();
        hide();
        form.resetFields();
      }
    });
  };
  return (
    <>
      <ProForm
        title="Chỉnh sửa chủ đề"
        onFinish={async (values) => {
          handleUpdateTopic(values);
        }}
        form={form}
        submitter={false}
      >
        <ProFormText
          width="md"
          name="nameTopic"
          placeholder="Nhập chủ đề"
          label="Chủ đề"
          initialValue={nameTopic}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chủ đề",
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
export default EditTopic;

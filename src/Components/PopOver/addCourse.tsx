import { ProForm, ProFormText } from "@ant-design/pro-components";
import { useLocation } from "react-router-dom";
import { Button, Form, message } from "antd";
import { createPart } from "../../Services/api/course";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { hiddenPopOver } from "../../store/modalSlice";

function AddPart({ getCourse }: any) {
  const [form] = useForm();
  const location = useLocation();
  const pathItems = location.pathname.split("/");
  const idCourse = pathItems[pathItems.length - 1];

  const dispatch = useDispatch();
  const hide = () => {
    dispatch(hiddenPopOver());
  };

  const handleAddPart = (values: any) => {
    createPart(idCourse, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo phần mới thành công");
        hide();
        getCourse();
        form.resetFields();
      }
    });
  };

  return (
    <>
      <ProForm
        title="Thêm bài giảng mới"
        onFinish={async (values) => {
          handleAddPart(values);
        }}
        form={form}
        submitter={false}
      >
        <ProFormText
          width="md"
          name="partName"
          placeholder="Nhập tiêu đề"
          label="Tiêu đề"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề",
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

export default AddPart;

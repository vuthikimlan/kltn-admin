import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { updatePart } from "../../Services/api/course";
import { useForm } from "antd/es/form/Form";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hiddenPopOverEdit } from "../../store/modalSlice";

function EditPart({ getCourse, idPart, partName }: any) {
  const [form] = useForm();
  const location = useLocation();
  const pathItems = location.pathname.split("/");
  const idCourse = pathItems[pathItems.length - 1];

  const dispatch = useDispatch();
  const hide = () => {
    dispatch(hiddenPopOverEdit());
  };
  const handleUpdatePart = (values: any) => {
    updatePart(idCourse, idPart, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật khóa học thành công");
        getCourse(idCourse);
        hide();
        form.resetFields();
      }
    });
  };
  return (
    <>
      <ProForm
        title="Chỉnh sửa bài giảng"
        onFinish={async (values) => {
          handleUpdatePart(values);
        }}
        form={form}
        submitter={false}
      >
        <ProFormText
          width="md"
          name="partName"
          placeholder="Nhập tiêu đề"
          label="Tiêu đề"
          initialValue={partName}
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
export default EditPart;

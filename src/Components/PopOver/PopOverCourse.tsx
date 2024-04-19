import { ProForm, ProFormDigit, ProFormText } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { hiddenPopOver } from "../../store/modalSlice";
import { Button, Form } from "antd";

const PopOverCourse = ({ onSearch }: any) => {
  const [form] = useForm();
  const dispatch = useDispatch();

  const hide = () => {
    dispatch(hiddenPopOver());
  };

  const handleFilterData = (values: any): any => {
    onSearch(values);
    hide();
    form.resetFields();
  };

  return (
    <>
      <ProForm
        submitter={false}
        form={form}
        onFinish={handleFilterData}
        onReset={() => {
          console.log("e");
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Tên khóa học"
            placeholder="Nhập tên khóa học"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="field"
            label="Lĩnh vực"
            placeholder="Nhập lĩnh vực"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="category"
            label="Thể loại"
            placeholder="Nhập thể loại"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            width="md"
            name="price"
            label="Giá"
            placeholder="Nhập giá"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="level"
            label="Trình độ"
            placeholder="Nhập trình độ"
          />
        </ProForm.Group>
        <Form.Item>
          <Button
            style={{ border: "1px solid #d9d9d9", marginRight: 10 }}
            type="primary"
            htmlType="submit"
          >
            Lọc
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

export default PopOverCourse;

import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { hiddenPopOver } from "../../store/modalSlice";

const PopOverBlog = ({ onSearch }: any) => {
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
            label="Tên blog"
            placeholder="Nhập tên blog"
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
            name="author"
            label="Tên tác giả"
            placeholder="Nhập tên tác giả"
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

export default PopOverBlog;

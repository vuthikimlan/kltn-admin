import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { hiddenPopOver } from "../../store/modalSlice";

const PopOverUser = ({ onSearch }: any) => {
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
    <div>
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
            label="Tên người dùng"
            placeholder="Nhập tên người dùng"
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            width="md"
            name="username"
            label="Username"
            placeholder="Nhập username"
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            width="md"
            name="email"
            label="Email"
            placeholder="Nhập Email"
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            width="md"
            name="accountName"
            label="Tên tài khoản ngân hàng"
            placeholder="Nhập tên tài khoản ngân hàng"
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            width="md"
            name="accountNumber"
            label="Số tài khoản ngân hàng"
            placeholder="Nhập số tài khoản ngân hàng"
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
    </div>
  );
};

export default PopOverUser;

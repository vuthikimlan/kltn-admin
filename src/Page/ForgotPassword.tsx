import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { forgotPasword } from "../Services/api/auth";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const onFinish = (values: string) => {
    forgotPasword(values).then((res) => {
      if (res?.status === 200) {
        message.success("Đã gửi email đặt lại mật khẩu!");
        navigate("/login");
      } else {
        message.error("Gửi email đặt lại mật khẩu thất bại!");
      }
    });
  };
  return (
    <>
      return (
      <div className="w-[28%] mx-[auto] p-[30px] border-solid border-[1px]  shadow-xl mt-[15rem] mb-[12%] ">
        <h1 className=" text-2xl font-semibold text-center mb-[10px] ">
          Đặt lại mật khẩu
        </h1>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              className="input w-[100%] "
              prefix={<LockOutlined />}
              type="Email "
              placeholder="Email "
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className=" bg-[#fff] border-[#4096ff]  rounded-none text-white font-semibold w-[100%] "
            >
              Đồng ý
            </Button>
            <Button
              type="link"
              className="button w-[100%]  "
              onClick={() => navigate("/")}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
      );
    </>
  );
}

export default ForgotPassword;

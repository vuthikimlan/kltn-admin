import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/api/auth";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { permission } from "../store/modalSlice";

interface Datatype {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onFinish = (values: Datatype) => {
    setLoading(true);
    login(values)
      .then((res) => {
        if (res?.data?.success === true) {
          const checkPermission = res?.data?.data?.role;
          dispatch(permission(checkPermission));
          if (checkPermission === "ADMIN") {
            Cookies.set("token", res?.data?.data?.token);
            message.success("Đăng nhập thành công");
            setLoading(false);
            navigate("/admin/student");
          } else if (checkPermission === "TEACHER") {
            Cookies.set("token", res?.data?.data?.token);
            message.success("Đăng nhập thành công");
            setLoading(false);
            navigate("/instructor/courses");
          } else {
            message.error("Bạn không có quyền đăng nhập");
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-[28%] m-[auto] h-[100vh] ">
      <div className="p-[30px] border-solid border-[1px]  shadow-xl mt-[30%] ">
        <Form onFinish={onFinish} className=" ">
          <h1 className="m-[auto] w-[45%] pb-[16px] text-2xl font-bold font-serif text-center ">
            {" "}
            Đăng nhập{" "}
          </h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Tên tài khoản tối thiểu 6 ký tự",
              },
            ]}
          >
            <Input
              className="input"
              prefix={<UserOutlined />}
              placeholder="Tên tài khoản"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                message: "Mật khẩu tối thiểu 6 - 20 ký tự",
              },
            ]}
          >
            <Input.Password
              className="input"
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="button block w-[100%] rounded-none"
              loading={loading}
            >
              Đăng nhập
            </Button>
            <Button
              type="link"
              className="button w-[100%]  "
              onClick={() => navigate("/forgot-password")}
            >
              Quên mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;

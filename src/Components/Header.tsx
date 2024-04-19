import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Avatar, Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerOpen } from "../store/modalSlice";
import ProfileUser from "./ProfileUser/ProfileUser";
import { RootState } from "../store/store";

function Headers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const checkPermission = (data as any)?.role === "ADMIN";
  const role = useSelector((state: RootState) => state?.modal?.role);

  const items = [
    {
      icon: <UserOutlined />,
      label: "Hồ sơ",
      key: "1",
      onClick: () => {
        dispatch(drawerOpen({ drawerKey: "drawerProfile" }));
        if (role === "ADMIN") {
          navigate("/admin/profile");
        } else if (role === "TEACHER") {
          navigate("/instructor/profile");
        }
      },
    },
    {
      icon: <EditOutlined />,
      label: "Đổi mật khẩu",
      key: "2",
      onClick: () => {
        // setOpenModal(true);
      },
    },
    {
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      key: "3",
      onClick: () => {
        navigate("/");
        Cookies.remove("token");
        Cookies.remove("role");
      },
    },
  ];

  return (
    <div className="flex justify-between ">
      <h1 className="font-sans text-xl font-medium pt-2 ">{`Xin chào ${
        role === "ADMIN" ? "ADMIN" : "Giảng viên"
      } 👋🏼`}</h1>
      <div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Space>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Dropdown>
        <ProfileUser />
      </div>
    </div>
  );
}

export default Headers;

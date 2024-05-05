import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { LineChartOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../Services/api/user";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleGetProfile = () => {
    getProfile().then(
      (res: { data: { data: { role: React.SetStateAction<{}> } } }) => {
        setData(res?.data?.data?.role);
      }
    );
  };

  const checkPermission = data === "ADMIN";

  useEffect(() => {
    handleGetProfile();
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const adminItems: MenuItem[] = [
    getItem("Quản lý người dùng", "sub1", <TeamOutlined />, [
      getItem("Quản lý học viên", "student"),
      getItem("Quản lý giảng viên", "teacher"),
    ]),
    getItem("Quản lý khóa học", "course"),
    getItem("Quản lý đơn hàng", "order"),
    getItem("Quản lý blog - Bài viết", "blog"),
    getItem("Quản lý mã giảm giá", "discount"),
    getItem("Quản lý thể loại", "category"),
    getItem("Quản lý doanh thu", "sub2", <LineChartOutlined />, [
      getItem("Doanh thu của hệ thống", "total-revenue"),
    ]),
  ];
  const instructorItems: MenuItem[] = [
    getItem("Quản lý khóa học", "courses"),
    getItem("Quản lý Học viên", "students"),
    getItem("Quản lý doanh thu", "sub3", <LineChartOutlined />, [
      getItem("Doanh thu của các khóa học", "total-revenue"),
      getItem("Quản lý thanh toán", "payment-management"),
    ]),
  ];

  return (
    <div className="leading-[200px]">
      <Menu
        theme="dark"
        mode="inline"
        items={checkPermission ? adminItems : instructorItems}
        onClick={handleMenuClick}
        defaultOpenKeys={["sub1"]}
      />
    </div>
  );
};

export default Sidebar;

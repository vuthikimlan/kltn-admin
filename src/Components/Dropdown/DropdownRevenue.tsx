import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function DropdownRevenue({ record }: any) {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state?.modal?.role);

  const items: MenuProps["items"] = [
    {
      label: "Doanh thu theo ngày",
      key: "1",
      onClick: () => {
        if (role === "TEACHER") {
          navigate(`/instructor/revenue-course-day/${record._id}`);
        } else if (role === "ADMIN") {
          navigate(`/admin/revenue-course-day/${record.courseId}`);
        }
      },
    },
    {
      label: "Doanh thu theo tháng",
      key: "2",
      onClick: () => {
        if (role === "TEACHER") {
          navigate(`/instructor/revenue-course-month/${record._id}`);
        } else if (role === "ADMIN") {
          navigate(`/admin/revenue-course-month/${record.courseId}`);
        }
      },
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button>Tùy chọn</Button>
      </Dropdown>
    </>
  );
}

export default DropdownRevenue;

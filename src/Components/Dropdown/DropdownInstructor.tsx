import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function DropdownInstructor({ record }: any) {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state?.modal?.role);

  const items: MenuProps["items"] = [
    {
      label: "Chương trình giảng dạy",
      key: "1",
      onClick: () => {
        if (role === "TEACHER") {
          navigate(`/instructor/lectures/${record._id}`);
        } else if (role === "ADMIN") {
          navigate(`/admin/lectures/${record._id}`);
        }
      },
    },
    {
      label: "Bài tập",
      key: "2",
      onClick: () => {
        if (role === "TEACHER") {
          navigate(`/instructor/assignment/${record._id}`);
        } else if (role === "ADMIN") {
          navigate(`/admin/assignment/${record._id}`);
        }
      },
    },
    {
      label: "Học viên của khóa học",
      key: "3",
      onClick: () => {
        if (role === "TEACHER") {
          navigate(`/instructor/student-course/${record._id}`);
        } else if (role === "ADMIN") {
          navigate(`/admin/student-course/${record._id}`);
        }
      },
    },
    {
      label: "Đánh giá về khóa học",
      key: "4",
      onClick: () => {
        if (role === "TEACHER") {
          navigate(`/instructor/ratings-course/${record._id}`);
        } else if (role === "ADMIN") {
          navigate(`/admin/ratings-course/${record._id}`);
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

export default DropdownInstructor;

import React, { useEffect, useState } from "react";
import { Button, Progress, Space, Table, type TableProps } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { getCourseById } from "../../../Services/api/course";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { progressUser } from "../../../Services/api/user";

interface DataType {
  key: string;
  name: string;
}

const StudentOfCourse: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<[]>([]);
  const [name, setName] = useState<any>([]);
  const [progress, setProgress] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const role = useSelector((state: RootState) => state?.modal?.role);

  const handleGetStudentOfCourse = () => {
    getCourseById(id).then((res) => {
      if (res.status === 200) {
        setName(res?.data?.data?.name);
        setData(res?.data?.data?.users || []);
      }
    });
  };

  const getProgress = () => {
    data.map(async (user: any) => {
      const res = await progressUser(user._id, id);
      if (res.status === 200) {
        setProgress(res?.data?.data?.progressPercentage);
      }
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tiến độ học",
      key: "progress",
      render: (record: any) => (
        <>
          <Progress type="circle" percent={progress} size={50} />
        </>
      ),
    },
  ];

  const total = data.length;

  useEffect(() => {
    handleGetStudentOfCourse();
    getProgress();
    setLoading(false);
  }, [id]);

  return (
    <>
      <PageContainer
        title={`Tất cả học viên của  "${name}" là : ${total} học viên`}
        extra={[
          <Space>
            <Button
              onClick={() => {
                if (role === "TEACHER") {
                  navigate("/instructor/courses");
                } else if (role === "ADMIN") {
                  navigate("/admin/course");
                }
              }}
            >
              Quay lại
            </Button>
          </Space>,
        ]}
      >
        <Table
          columns={columns}
          size="middle"
          dataSource={data}
          loading={loading}
          scroll={{
            y: 413,
          }}
          pagination={{
            pageSize: 7,
          }}
        />
      </PageContainer>
    </>
  );
};

export default StudentOfCourse;

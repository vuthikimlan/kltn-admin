import React, { useEffect, useState } from "react";
import { Table, type TableProps } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { getStudentOfTeacher } from "../../../Services/api/user";

interface DataType {
  key: string;
  name: string;
}

const StudentOfTeacher: React.FC = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState();

  const handleGetStudentOfTeacher = () => {
    getStudentOfTeacher().then((res) => {
      setData(res.data.data.students);
      setTotal(res.data.data.totalStudent);
      setLoading(false);
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
  ];

  useEffect(() => {
    handleGetStudentOfTeacher();
    setLoading(false);
  }, []);

  return (
    <>
      <PageContainer title={`Tất cả học viên: ${total} học viên`}>
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

export default StudentOfTeacher;

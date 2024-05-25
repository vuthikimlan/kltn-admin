import { PageContainer } from "@ant-design/pro-components";
import { Button, Space, Table, type TableProps } from "antd";
import { useEffect, useState } from "react";
import { revenueInstructorBymonth } from "../../../Services/api/revenue";
import ExportFile from "../../Button/ExportFile";

interface DataType {
  key: string;
  name: string;
  teacher: any;
  revenueByMonth: any;
}

function RevenueInstructor() {
  const [data, setData] = useState<any>();
  const [month, setMonth] = useState<any>();
  const [loading, setLoading] = useState(true);

  const handleGetRevenueInstructor = () => {
    setLoading(true);
    revenueInstructorBymonth()
      .then((res) => {
        setData(res?.data?.data);
        setMonth(res?.data?.month);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetRevenueInstructor();
    setLoading(false);
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên giảng viên",
      dataIndex: "teacher",
      key: "teacher",
      render: (_, { teacher }) => <>{teacher.name} </>,
    },
    {
      title: "Email",
      dataIndex: "teacher",
      key: "teacher",
      render: (_, { teacher }) => <>{teacher.email} </>,
    },
    {
      title: "Tên ngân hàng",
      dataIndex: "teacher",
      key: "teacher",
      render: (_, { teacher }) => <>{teacher.paymentMethod.accountName} </>,
    },
    {
      title: "Số tài khoản ngân hàng",
      dataIndex: "teacher",
      key: "teacher",
      render: (_, { teacher }) => <>{teacher.paymentMethod.accountNumber} </>,
    },
    {
      title: "Mã ngân hàng",
      dataIndex: "teacher",
      key: "teacher",
      render: (_, { teacher }) => <>{teacher.paymentMethod.bankCode} </>,
    },
    {
      title: "Số tiền tạm tính",
      dataIndex: "revenueByMonth",
      key: "revenueByMonth",
      render: (_, { revenueByMonth }) => (
        <>{revenueByMonth.pendingEarning.toLocaleString("en")} VND </>
      ),
    },
    {
      title: "Số tiền thực nhận",
      dataIndex: "revenueByMonth",
      key: "revenueByMonth",
      render: (_, { revenueByMonth }) => (
        <>{revenueByMonth.paidEarning.toLocaleString("en")} VND</>
      ),
    },
  ];

  return (
    <PageContainer
      title={`Doanh thu của giảng viên trong tháng ${month} `}
      extra={[<Space>{data && <ExportFile dataInstructor={data} />}</Space>]}
    >
      <Table
        size="large"
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1300 }}
      />
    </PageContainer>
  );
}

export default RevenueInstructor;

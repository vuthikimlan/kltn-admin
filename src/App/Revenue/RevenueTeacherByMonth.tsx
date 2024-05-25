import { Table, TableProps } from "antd";
import { revenueTeacherByMonth } from "../../Services/api/user";
import { useEffect, useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
interface DataType {
  key: string;
  name: string;
  pendingEarning: number;
  costDeduction: number;
  paidEarning: number;
}

function RevenueTeacherByMonth() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const handleGetRevenueInstructor = () => {
    revenueTeacherByMonth()
      .then((res) => {
        console.log("res", res);
        setData(res?.data?.data);
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
      title: "Tháng",
      dataIndex: "month",
      key: "month",
    },

    {
      title: "Số tiền tạm tính",
      dataIndex: "pendingEarning",
      key: "pendingEarning",
      render: (_, { pendingEarning }) => (
        <>{pendingEarning.toLocaleString("en")} VND </>
      ),
    },
    {
      title: "Tiền khấu trừ",
      dataIndex: "costDeduction",
      key: "costDeduction",
      render: (_, { costDeduction }) => (
        <>{costDeduction.toLocaleString("en")} VND </>
      ),
    },
    {
      title: "Số tiền thực nhận",
      dataIndex: "paidEarning",
      key: "paidEarning",
      render: (_, { paidEarning }) => (
        <>{paidEarning.toLocaleString("en")} VND </>
      ),
    },
  ];
  return (
    <PageContainer title="Doanh thu giảng viên theo tháng">
      <Table columns={columns} dataSource={data} loading={loading} />
    </PageContainer>
  );
}

export default RevenueTeacherByMonth;

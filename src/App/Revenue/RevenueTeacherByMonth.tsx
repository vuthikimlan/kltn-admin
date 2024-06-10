import { DatePicker, Space, Table, TableProps } from "antd";
import { revenueTeacherByMonth } from "../../Services/api/user";
import { useEffect, useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { Moment } from "moment";
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
  const [selectedDates, setSelectedDates] = useState<Moment[] | undefined>(
    undefined
  );

  const { RangePicker } = DatePicker;
  const handleValue = (dates: any) => {
    setSelectedDates(dates);
  };

  const handleGetRevenueInstructor = () => {
    if (selectedDates) {
      const fromDate = selectedDates[0].format("MM/DD/YYYY");
      const toDate = selectedDates[1].format("MM/DD/YYYY");
      setLoading(true);
      revenueTeacherByMonth({ fromDate, toDate })
        .then((res) => {
          setData(res?.data?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      revenueTeacherByMonth()
        .then((res) => {
          setData(res?.data?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    handleGetRevenueInstructor();
    setLoading(false);
  }, [selectedDates]);
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
    <PageContainer
      title="Doanh thu giảng viên theo tháng"
      extra={[
        <Space>
          <RangePicker format="MM/DD/YYYY" onChange={handleValue} />
        </Space>,
      ]}
    >
      <Table columns={columns} dataSource={data} loading={loading} />
    </PageContainer>
  );
}

export default RevenueTeacherByMonth;

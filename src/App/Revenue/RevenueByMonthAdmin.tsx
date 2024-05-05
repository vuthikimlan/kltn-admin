import { useEffect, useState } from "react";
import TotalRevenueSystem from "../../Components/Chart/TotalRevenueSystem";
import { totalRevenueSystemByMonth } from "../../Services/api/statistics";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

function RevenueByMonthAdmin() {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();

  const handleStatisticRevenueByMonth = () => {
    totalRevenueSystemByMonth().then((res: any) => {
      setData(res?.data?.data);
    });
  };

  useEffect(() => {
    handleStatisticRevenueByMonth();
  }, []);
  return (
    <>
      <PageContainer
        extra={[
          <Space>
            <Button
              onClick={() => {
                navigate("/admin/total-revenue");
              }}
            >
              Doanh thu theo ngày{" "}
            </Button>
          </Space>,
        ]}
      >
        <h1 className=" text-xl font-semibold text-center ">
          Doanh thu theo tháng{" "}
        </h1>
        <TotalRevenueSystem data={data} xField="month" />
      </PageContainer>
    </>
  );
}

export default RevenueByMonthAdmin;

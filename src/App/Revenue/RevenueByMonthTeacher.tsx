import { useEffect, useState } from "react";
import TotalRevenueSystem from "../../Components/Chart/TotalRevenueSystem";
import { totalRevenueTeacherByMonth } from "../../Services/api/statistics";
import { PageContainer } from "@ant-design/pro-components";

function RevenueByMonthTeacher() {
  const [data, setData] = useState<any>([]);

  const handleStatisticRevenueByMonth = () => {
    totalRevenueTeacherByMonth().then((res: any) => {
      setData(res?.data?.data);
    });
  };

  useEffect(() => {
    handleStatisticRevenueByMonth();
  }, []);
  return (
    <>
      <PageContainer>
        <h1 className=" text-xl font-semibold text-center ">
          Doanh thu theo tháng{" "}
        </h1>
        <TotalRevenueSystem data={data} xField="month" />
      </PageContainer>
    </>
  );
}

export default RevenueByMonthTeacher;

import { useEffect, useState } from "react";
import TotalRevenueSystem from "../../Components/Chart/TotalRevenueSystem";
import { totalRevenueTeacherByMonth } from "../../Services/api/statistics";
import { PageContainer } from "@ant-design/pro-components";

function RevenueByMonthTeacher() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const handleStatisticRevenueByMonth = () => {
    totalRevenueTeacherByMonth().then((res: any) => {
      setData(res?.data?.data);
    });
  };

  useEffect(() => {
    handleStatisticRevenueByMonth();
    setLoading(false);
  }, []);

  return (
    <>
      <PageContainer>
        <h1 className=" text-xl font-semibold text-center mt-[20px] ">
          Doanh thu theo tháng{" "}
        </h1>
        <TotalRevenueSystem data={data} xField="month" />
      </PageContainer>
    </>
  );
}

export default RevenueByMonthTeacher;

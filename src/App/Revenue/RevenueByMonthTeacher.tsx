import { useEffect, useState } from "react";
import TotalRevenueSystem from "../../Components/Chart/TotalRevenueSystem";
import { totalRevenueTeacherByMonth } from "../../Services/api/statistics";
import { PageContainer } from "@ant-design/pro-components";
import { revenueInstructor } from "../../Services/api/user";

function RevenueByMonthTeacher() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState<any>();

  const handleGetRevenue = async () => {
    setLoading(true);
    revenueInstructor()
      .then((res: any) => {
        setRevenue(res?.data?.data?.teacher);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStatisticRevenueByMonth = () => {
    totalRevenueTeacherByMonth().then((res: any) => {
      setData(res?.data?.data);
    });
  };

  useEffect(() => {
    handleStatisticRevenueByMonth();
    handleGetRevenue();
    setLoading(false);
  }, []);

  const deductionAmount = revenue?.pendingEarning - revenue?.paidEarning;

  return (
    <>
      <PageContainer>
        <div className="flex ">
          <div className="flex mr-[20px] ">
            <h1 className=" text-xl font-semibold mr-[10px] ">
              Số tiền tạm duyệt:{" "}
            </h1>
            <p className=" text-lg text-cyan-500 ">
              {revenue?.pendingEarning.toLocaleString("en")} VND
            </p>
            <h1 className=" text-xl font-semibold ml-[20px] mr-[10px] ">
              Phần trăm khấu trừ phí dịch vụ:
            </h1>
            <p className=" text-lg text-cyan-500 ">
              {deductionAmount.toLocaleString("en")} VND
            </p>
          </div>
          <div className="flex ">
            <h1 className=" text-xl font-semibold mr-[10px] ">
              Số tiền thực nhận:{" "}
            </h1>
            <p className=" text-lg text-cyan-500 ">
              {revenue?.paidEarning.toLocaleString("en")} VND
            </p>
          </div>
        </div>

        <h1 className=" text-xl font-semibold text-center mt-[20px] ">
          Doanh thu theo tháng{" "}
        </h1>
        <TotalRevenueSystem data={data} xField="month" />
      </PageContainer>
    </>
  );
}

export default RevenueByMonthTeacher;

import { PageContainer } from "@ant-design/pro-components";
import TotalRevenueSystem from "../../Components/Chart/TotalRevenueSystem";
import { useEffect, useState } from "react";
import { revenueCourseByDay } from "../../Services/api/statistics";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function RevenueCourseByDay() {
  const [data, setData] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state?.modal?.role);

  const handleStatisticRevenueByDay = () => {
    revenueCourseByDay(id).then((res: any) => {
      setData(res?.data?.data);
    });
  };

  useEffect(() => {
    handleStatisticRevenueByDay();
  }, [id]);
  return (
    <>
      <PageContainer
        extra={[
          <Space>
            <Button
              onClick={() => {
                if (role === "TEACHER") {
                  navigate("/instructor/revenue-course");
                } else if (role === "ADMIN") {
                  navigate("/admin/revenue-course");
                }
              }}
            >
              Quay lại{" "}
            </Button>
          </Space>,
        ]}
      >
        <h1 className=" text-xl font-semibold text-center ">
          Doanh thu khóa học theo ngày{" "}
        </h1>

        <TotalRevenueSystem data={data} xField="day" />
      </PageContainer>
    </>
  );
}

export default RevenueCourseByDay;

import { useEffect, useState } from "react";
import { getProfile } from "../../Services/api/user";
import { PageContainer } from "@ant-design/pro-components";

function PaymentOfTeacher() {
  const [data, setData] = useState<any>();

  const handleGetProfile = () => {
    getProfile().then((res) => {
      setData(res?.data?.data);
    });
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <>
      <PageContainer>
        <div className="flex ">
          <div className="flex mr-[20px] ">
            <h1 className=" text-xl font-semibold mr-[10px] ">
              Số tiền tạm duyệt:{" "}
            </h1>
            <p className=" text-lg text-cyan-500 ">
              {data?.teacher?.pendingEarning.toLocaleString("en")} VND
            </p>
          </div>
          <div className="flex ">
            <h1 className=" text-xl font-semibold mr-[10px] ">
              Số tiền được nhận:{" "}
            </h1>
            <p className=" text-lg text-cyan-500 ">
              {data?.teacher?.paidEarning.toLocaleString("en")} VND
            </p>
          </div>
        </div>

        <h1>Hiển thị bảng lịch sử thanh toán</h1>
      </PageContainer>
    </>
  );
}

export default PaymentOfTeacher;

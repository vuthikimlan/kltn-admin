import { useEffect, useState } from "react";
import { totalRevenueSystem } from "../../Services/api/statistics";
import TotalRevenueSystem from "../../Components/Chart/TotalRevenueSystem";

function RevenueByDayAdmin() {
    const [data, setData] = useState<any>([]);

  const handleStatisticRevenueByDay = () => {
    totalRevenueSystem().then((res: any) => {
      setData(res?.data?.data)
    })
  }

  useEffect(() => {
    handleStatisticRevenueByDay()
  },[])
    return(<>
      <h1 className=' text-xl font-semibold text-center ' >Doanh thu theo ngày</h1>
        <TotalRevenueSystem data={data} xField="day" />

    </>)
}

export default RevenueByDayAdmin;
import { PageContainer } from "@ant-design/pro-components";
import { Button, Space } from "antd";
import RevenueByDayAdmin from "./RevenueByDayAdmin";
import { useNavigate } from "react-router-dom";

function PageStatistic() {
    const navigate = useNavigate();
    return(
        <>
            <PageContainer
                extra={[
                    <Space>
                        <Button 
                            onClick={() => { 
                                navigate("/admin/total-revenue-month")
                            } }
                        >Doanh thu theo tháng</Button>
                    </Space>
                ]}
            >
                <RevenueByDayAdmin/>
            </PageContainer>
        </>
    )
}

export default PageStatistic;
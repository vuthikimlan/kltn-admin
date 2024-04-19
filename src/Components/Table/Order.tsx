import { PageContainer } from "@ant-design/pro-components";
import { Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { getListOrder } from "../../Services/api/order";
import ButtonDetail from "../Button/Detail/DetailOrder";
import DetailOrder from "../Drawer/detailOrder";

interface DataType {
  key: string;
  name: string;
}

function TableOrder() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const handleGetAll = () => {
    setLoading(true);
    getListOrder()
      .then((res) => {
        setData(res?.data?.data?.items);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAll();
    setLoading(false);
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <ButtonDetail record={record} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageContainer>
        <Table
          size="middle"
          columns={columns}
          loading={loading}
          dataSource={data}
          pagination={{
            pageSize: 7,
          }}
        />
        <DetailOrder />
      </PageContainer>
    </>
  );
}

export default TableOrder;

import { PageContainer } from "@ant-design/pro-components";
import { Space, Table, TableProps } from "antd";
import { Key, useEffect, useState } from "react";
import { getListOrder } from "../../Services/api/order";
import ButtonDetail from "../Button/Detail/DetailOrder";
import DetailOrder from "../Drawer/detailOrder";
import formatDate from "../../Services/helper";

interface DataType {
  key: string;
  name: string;
  price: [];
  totalPrice: number;
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
      title: "Khóa học",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => (
        <>
          {price.map((course: any, ind: Key) => (
            <ul key={ind}>
              <li>{course.name}</li>
            </ul>
          ))}
        </>
      ),
    },
    {
      title: "Chi phí",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => (
        <>
          {price.map((course: any, ind: Key) => (
            <ul key={ind}>
              <li>{course.price.toLocaleString("en")} VND </li>
            </ul>
          ))}
        </>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, { totalPrice }) => (
        <>{totalPrice.toLocaleString("en")} VND </>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "user",
      key: "user",
      render: (_, { user }: any, record: any) => <>{<p>{user?.name} </p>}</>,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (_, { orderDate }: any, record: any) => (
        <>{<p>{formatDate(`${orderDate}`)}</p>}</>
      ),
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

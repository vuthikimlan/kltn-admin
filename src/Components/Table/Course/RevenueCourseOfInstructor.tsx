import { useEffect, useState } from "react";
import { getProfile } from "../../../Services/api/user";
import { PageContainer } from "@ant-design/pro-components";
import { Space, Table, TableProps } from "antd";
import DropdownRevenue from "../../Dropdown/DropdownRevenue";

interface DataType {
  key: string;
  name: string;
  price: number;
  revenue: number;
}

function RevenueCourseOfInstructor() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const handleGetCourse = async () => {
    setLoading(true);
    getProfile()
      .then((res) => {
        setData(res?.data?.data?.coursesPosted);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetCourse();
    setLoading(false);
  }, []);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Lĩnh vực",
      dataIndex: "field",
      key: "field",
      render: (_, { field }: any, record: any) => <>{<p>{field?.title} </p>}</>,
    },
    {
      title: "Chi phí",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => <>{price.toLocaleString("en")} VND </>,
    },
    {
      title: "Số học viên",
      dataIndex: "numBought",
      key: "numBought",
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (_, { revenue }) => <>{revenue.toLocaleString("en")} VND </>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <DropdownRevenue record={record} />
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
          dataSource={data}
          loading={loading}
          scroll={{
            y: 413,
          }}
          pagination={{
            pageSize: 7,
          }}
        />
      </PageContainer>
    </>
  );
}

export default RevenueCourseOfInstructor;

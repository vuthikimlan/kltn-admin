import { PageContainer } from "@ant-design/pro-components";
import { Space, Table, type TableProps } from "antd";
import ButtonSearch from "../../Button/ButtonSearch";
import ButtonFilter from "../../Button/ButtonFilter";
import PopOverCourse from "../../PopOver/PopOverCourse";
import { useEffect, useState } from "react";
import { filterCourse, getListCourse } from "../../../Services/api/course";
import DropdownRevenue from "../../Dropdown/DropdownRevenue";

interface DataType {
  key: string;
  name: string;
  price: number;
  revenue: number;
}

function RevenueCourse() {
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);

  const handleGetCourse = () => {
    setLoading(true);
    getListCourse()
      .then((res) => {
        setData(res?.data?.data?.items);
        setTotal(res?.data?.data?.total);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchData = (values: string) => {
    filterCourse({
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  const handleFilterData = (values: any) => {
    filterCourse(values).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data?.items);
      }
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
      title: "Giảng viên",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (_, { createdBy }: any, record: any) => (
        <>{<p>{createdBy?.name} </p>}</>
      ),
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
      render: (_, record: any) => (
        <Space>
          <DropdownRevenue record={record} />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title={`Tất cả khóa học: ${total} khóa học`}
      extra={[
        <Space>
          <ButtonSearch
            text="Nhập tên khóa học"
            handleSearchData={handleSearchData}
          />
          <ButtonFilter
            content={
              <PopOverCourse
                onSearch={(values: any) => {
                  handleFilterData(values);
                }}
              />
            }
          />
        </Space>,
      ]}
    >
      <Table
        size="large"
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1300 }}
      />
    </PageContainer>
  );
}

export default RevenueCourse;

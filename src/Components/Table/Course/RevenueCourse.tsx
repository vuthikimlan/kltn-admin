import { PageContainer } from "@ant-design/pro-components";
import { Space, Table, type TableProps, DatePicker } from "antd";
import ButtonSearch from "../../Button/ButtonSearch";
import ButtonFilter from "../../Button/ButtonFilter";
import PopOverCourse from "../../PopOver/PopOverCourse";
import { useEffect, useState } from "react";
import { filterCourse } from "../../../Services/api/course";
import DropdownRevenue from "../../Dropdown/DropdownRevenue";
import { revenueCourseByTime } from "../../../Services/api/revenue";
import moment, { Moment } from "moment";

interface DataType {
  key: string;
  name: string;
  price: number;
  revenue: number;
}

function RevenueCourse() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState<Moment[] | undefined>(
    undefined
  );

  const { RangePicker } = DatePicker;

  const handleValue = (dates: any) => {
    setSelectedDates(dates);
  };

  const handleGetRevenueCourse = () => {
    if (selectedDates) {
      const fromDate = selectedDates[0].format("MM/DD/YYYY");
      const toDate = selectedDates[1].format("MM/DD/YYYY");
      setLoading(true);
      revenueCourseByTime({ fromDate, toDate })
        .then((res) => {
          setData(res?.data?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      revenueCourseByTime()
        .then((res) => {
          setData(res?.data?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
    handleGetRevenueCourse();
    setLoading(false);
  }, [selectedDates]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
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
      title={`Tất cả khóa học `}
      extra={[
        <Space>
          <RangePicker format="MM/DD/YYYY" onChange={handleValue} />

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
        pagination={{
          pageSize: 7,
        }}
      />
    </PageContainer>
  );
}

export default RevenueCourse;

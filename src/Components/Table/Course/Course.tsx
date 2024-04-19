import { PageContainer } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Table, type TableProps } from "antd";
import { useEffect, useState } from "react";
import { filterCourse, getListCourse } from "../../../Services/api/course";
import ButtonSearch from "../../Button/ButtonSearch";
import ButtonFilter from "../../Button/ButtonFilter";
import DeleteCourse from "../../Button/Delete/Course";
import PopOverCourse from "../../PopOver/PopOverCourse";
import ButtonDetail from "../../Button/Detail/DetailCourse";
import DetailCourse from "../../Drawer/detailCourse";
import { useNavigate } from "react-router-dom";
import DropdownInstructor from "../../Dropdown/DropdownInstructor";
import ApplyDiscount from "../../PopOver/applyDiscount";
import ButtonApplyDiscount from "../../Button/ButtonApplyDiscount";

interface DataType {
  key: string;
  name: string;
}

const TableCourse = () => {
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  const items = [
    {
      label: "Các khóa học đang chờ duyệt",
      key: "1",
      onClick: () => {
        navigate("/admin/course-approve");
      },
    },
    {
      label: "Các khóa học đã duyệt",
      key: "2",
      onClick: () => {
        navigate("/admin/course-approved");
      },
    },
    {
      label: "Các khóa học đã từ chối",
      key: "3",
      onClick: () => {
        navigate("/admin/course-rejected");
      },
    },
  ];

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
    },
    {
      title: "Chi phí sau khi giảm giá",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
    },
    {
      title: "Mã giảm giá",
      dataIndex: "discountedCodeApplied",
      key: "discountedCodeApplied",
    },
    {
      title: "Trình độ",
      dataIndex: "level",
      key: "level",
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
      title: "Action",
      key: "action",
      // render: (_, record, idx) => {
      //   console.log("idx", idx);

      //   return null;
      // },
      render: (_, record: any, idx) => (
        <Space>
          <DeleteCourse
            onSuccess={() => {
              handleGetCourse();
            }}
            record={record}
          />
          <ButtonDetail record={record} />
          <DropdownInstructor record={record} />
          <ButtonApplyDiscount modalKey="modalDiscount" record={record?._id} />
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
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button>Khác</Button>
          </Dropdown>
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
      <ApplyDiscount
        onSuccess={() => {
          handleGetCourse();
        }}
      />

      <DetailCourse />
    </PageContainer>
  );
};

export default TableCourse;

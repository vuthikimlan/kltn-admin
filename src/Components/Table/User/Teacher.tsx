import React, { useEffect, useState } from "react";
import { Space, Table, type TableProps } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import ButtonAdd from "../../Button/Add/ButtonAdd";
import ButtonDelete from "../../Button/Delete/ButtonDelete";
import ButtonEdit from "../../Button/ButtonEdit";
import { filterTeacher } from "../../../Services/api/user";
import AddEditUser from "../../Modal/AddEditUser";
import DetailUser from "../../Drawer/detailUser";
import ButtonSearch from "../../Button/ButtonSearch";
import ButtonFilter from "../../Button/ButtonFilter";
import PopOverUser from "../../PopOver/PopOverUser";
import DetailTeacher from "../../Button/Detail/DetailTeacher";
import ButtonListCourse from "../../Button/ButtonListCourse";

interface DataType {
  key: string;
  name: string;
}

const TableTeacher: React.FC = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState();

  const handleGetAll = (values: any = {}) => {
    setLoading(true);
    filterTeacher(values)
      .then((res) => {
        setData(res?.data?.data?.items);
        setTotal(res?.data?.data?.total);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchData = (values: string) => {
    filterTeacher({
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  const handleFilterData = (values: any) => {
    filterTeacher(values).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <ButtonEdit modalKey="modalUser" record={record} />
          {record?.coursesPosted?.length > 0 ? (
            <ButtonDelete
              onSuccess={() => {
                handleGetAll();
              }}
              record={record}
              disabled={true}
            />
          ) : (
            <ButtonDelete
              onSuccess={() => {
                handleGetAll();
              }}
              record={record}
              disabled={false}
            />
          )}

          <DetailTeacher record={record} />
          <ButtonListCourse id={record?._id} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetAll();
    setLoading(false);
  }, []);

  return (
    <>
      <PageContainer
        title={`Tất cả giảng viên: ${total} giảng viên`}
        extra={[
          <Space>
            <ButtonSearch
              text="Nhập tên giảng viên"
              handleSearchData={handleSearchData}
            />
            <ButtonFilter
              content={
                <PopOverUser
                  onSearch={(values: any) => {
                    handleFilterData(values);
                  }}
                />
              }
            />
            <ButtonAdd modalKey="modalUser" text="Thêm giảng viên" />
          </Space>,
        ]}
      >
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
        <AddEditUser
          getUser={() => {
            handleGetAll();
          }}
        />
        <DetailUser />
      </PageContainer>
    </>
  );
};

export default TableTeacher;

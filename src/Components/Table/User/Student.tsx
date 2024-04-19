import React, { useEffect, useState } from "react";
import { Space, Table, type TableProps } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import AddEditUser from "../../Modal/AddEditUser";
import { filterStudent } from "../../../Services/api/user";
import ButtonAdd from "../../Button/Add/ButtonAdd";
import ButtonDelete from "../../Button/Delete/ButtonDelete";
import ButtonEdit from "../../Button/ButtonEdit";
import ButtonDetail from "../../Button/Detail/DetailStudent";
import ButtonSearch from "../../Button/ButtonSearch";
import ButtonFilter from "../../Button/ButtonFilter";
import DetailUser from "../../Drawer/detailUser";
import PopOverUser from "../../PopOver/PopOverUser";

interface DataType {
  key: string;
  name: string;
}

const TableStudent: React.FC = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState();

  const handleGetAll = (values: any = {}) => {
    setLoading(true);
    filterStudent(values)
      .then((res) => {
        setData(res?.data?.data?.items);
        setTotal(res?.data?.data?.total);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchData = (values: string) => {
    filterStudent({
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  const handleFilterData = (values: any) => {
    filterStudent(values).then((res) => {
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
          <ButtonDelete
            onSuccess={() => {
              handleGetAll();
            }}
            record={record}
          />
          <ButtonDetail record={record} />
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
        title={`Tất cả học viên: ${total} học viên`}
        extra={[
          <Space>
            <ButtonSearch
              text="Nhập tên học viên"
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
            <ButtonAdd modalKey="modalUser" text="Thêm học viên" />
          </Space>,
        ]}
      >
        <Table
          columns={columns}
          size="middle"
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

export default TableStudent;

import { PageContainer } from "@ant-design/pro-components";
import { Space, Table, type TableProps } from "antd";
import ButtonEdit from "../Button/ButtonEdit";
import { useEffect, useState } from "react";
import { filterBlog, getListBlog } from "../../Services/api/blog";
import ButtonAdd from "../Button/Add/ButtonAdd";
import AddEditBlog from "../Modal/AddEditBlog";
import DeleteBlog from "../Button/Delete/Blog";
import DetailBLog from "../Drawer/detailBlog";
import ButtonDetail from "../Button/Detail/DetailBlog";
import ButtonSearch from "../Button/ButtonSearch";
import ButtonFilter from "../Button/ButtonFilter";
import PopOverBlog from "../PopOver/PopOverBlog";

interface DataType {
  key: string;
  name: string;
}

function TableBlog() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const handleGetAll = () => {
    setLoading(true);
    getListBlog()
      .then((res) => {
        setData(res?.data?.data?.items);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchData = (values: string) => {
    filterBlog({ name: values }).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  const handleFilterData = (values: any) => {
    filterBlog(values).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    handleGetAll();
    setLoading(false);
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên Blog - Bài viết",
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
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      render: (_, { author }: any, record: any) => (
        <>{<p>{author?.nameAuthor} </p>}</>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <ButtonEdit modalKey="modalBlog" record={record} />
          <DeleteBlog
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
  return (
    <>
      <PageContainer
        title="Quản lý Blog"
        extra={[
          <Space>
            <ButtonSearch
              text="Nhập tên blog"
              handleSearchData={handleSearchData}
            />
            <ButtonFilter
              content={
                <PopOverBlog
                  onSearch={(values: any) => {
                    handleFilterData(values);
                  }}
                />
              }
            />
            <ButtonAdd modalKey="modalBlog" text="Thêm blog - bài viết" />
          </Space>,
        ]}
      >
        <Table
          size="middle"
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            pageSize: 7,
          }}
        />
        <AddEditBlog
          getBlog={() => {
            handleGetAll();
          }}
        />
        <DetailBLog />
      </PageContainer>
    </>
  );
}

export default TableBlog;

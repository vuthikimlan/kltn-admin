import { Button, Space, Table, TableProps } from "antd";
import ButtonDetail from "../../Button/Detail/DetailCourse";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import DetailCourse from "../../Drawer/detailCourse";

interface DataType {
  key: string;
  name: string;
}

function CourseOfTopic({ data }: any) {
  const navigate = useNavigate();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chi phí",
      dataIndex: "price",
      key: "price",
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
      render: (record) => (
        <Space>
          <ButtonDetail record={record} />
          <Button
            onClick={() => {
              navigate(`/admin/lectures/${record._id}`);
            }}
          >
            Chương trình giảng dạy
          </Button>
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
          scroll={{
            y: 413,
          }}
          pagination={{
            pageSize: 7,
          }}
        />

        <DetailCourse />
      </PageContainer>
    </>
  );
}

export default CourseOfTopic;

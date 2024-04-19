import { PageContainer } from "@ant-design/pro-components";
import { Button, Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { getCourseAprroved } from "../../../Services/api/course";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
}

function CourseApproved() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  const handldGetApproveCourse = () => {
    setLoading(true);
    getCourseAprroved()
      .then((res) => {
        const course = res?.data?.data?.items?.flatMap((el: any) => {
          return el.courseId;
        });
        // flatMap trả về một mảng chứa các object [{....}]
        // map trả về một mảng chứa mảng object [ [{...}] ]

        setData(course);
        setTotal(res?.data?.data?.total);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handldGetApproveCourse();
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
      title: "Chương trình giảng dạy",
      key: "lectures",
      render: (record) => (
        <Space>
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
      <PageContainer
        title={`Tất cả khóa học đã phê duyệt: ${total} khóa học`}
        extra={[
          <Space>
            <Button
              onClick={() => {
                navigate("/admin/course");
              }}
            >
              Quay lại
            </Button>
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
      </PageContainer>
    </>
  );
}

export default CourseApproved;

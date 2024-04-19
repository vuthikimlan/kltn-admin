import { PageContainer } from "@ant-design/pro-components";
import { Button, Space, Table, type TableProps } from "antd";
import { getCourseById } from "../../../Services/api/course";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteComment from "../../Button/Delete/DeleteComment";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface DataType {
  key: string;
  name: string;
}

function RatingsCourse() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<[]>([]);
  const [totalRatings, setTotalRatings] = useState<any>();
  const [userRatings, setUserRatings] = useState<any>();
  const { id } = useParams();
  const navigate = useNavigate();

  const role = useSelector((state: RootState) => state?.modal?.role);

  const handleGetRatingsCourse = () => {
    getCourseById(id).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.ratings || []);
        setTotalRatings(res?.data?.data?.totalRatings);
        setUserRatings(res?.data?.data?.userRatings);
        setLoading(false);
      }
    });
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Người đánh giá",
      dataIndex: "postedBy",
      key: "postedBy",
      render: (_, { postedBy }: any, record: any) => (
        <>{<p>{postedBy?.name} </p>}</>
      ),
    },
    {
      title: "Số sao",
      dataIndex: "star",
      key: "star",
    },
    {
      title: "Nội dung đánh giá",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <DeleteComment
            record={record}
            onSuccess={() => {
              handleGetRatingsCourse();
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetRatingsCourse();
    setLoading(false);
  }, [id]);

  return (
    <PageContainer
      title={` ${totalRatings} sao với số lượt đánh giá là ${userRatings} `}
      extra={[
        <Space>
          <Button
            onClick={() => {
              if (role === "TEACHER") {
                navigate("/instructor/courses");
              } else if (role === "ADMIN") {
                navigate("/admin/course");
              }
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
      />
    </PageContainer>
  );
}
export default RatingsCourse;

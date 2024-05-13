import { PageContainer } from "@ant-design/pro-components";
import { Button, Popover, Space, Table, type TableProps } from "antd";
import { getCourseById } from "../../../Services/api/course";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteComment from "../../Button/Delete/DeleteComment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getComment } from "../../../Services/api/comment";
import { openPopOver } from "../../../store/modalSlice";
import ReplyCourse from "../../PopOver/ReplyCourse";
import ButtonReply from "../../Button/ButtonReply";

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
        setTotalRatings(res?.data?.data?.totalRatings);
        setUserRatings(res?.data?.data?.userRatings);
        setLoading(false);
      }
    });
  };

  const commentResult = useMemo(() => {
    return getComment(id);
  }, [id]);

  commentResult.then((res) => {
    setData(res?.data?.comments);
  });

  useEffect(() => {
    handleGetRatingsCourse();
    setLoading(false);
  }, []);

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
      title: "Phản hồi",
      dataIndex: "reply",
      key: "reply",
      render: (_, { reply }: any, record: any) => (
        // <>{console.log("reply", reply)}</>
        <>
          {
            <>
              <div>
                Phản hồi từ giảng viên: <p>{reply?.postedBy?.name}</p>
                <p> {reply?.content} </p>
              </div>
            </>
          }
        </>
      ),
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
          <ButtonReply idComment={record?._id} />
        </Space>
      ),
    },
  ];

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

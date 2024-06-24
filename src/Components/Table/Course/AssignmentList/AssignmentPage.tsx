import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAssignment } from "../../../../Services/api/course";
import { Button, List } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import ButtonAdd from "../../../Button/Add/ButtonAdd";
import AddAssignment from "../../../Modal/Course/AddAsignment";
import { useDispatch } from "react-redux";
import { getCourseId } from "../../../../store/modalSlice";
import ButtonEdit from "../../../Button/ButtonEdit";
import DeleteAssignment from "../../../Button/Delete/Assignment";

function AssignmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState<any>([]);

  const handleGetAssignment = () => {
    getAssignment(id).then((res) => {
      setData(res?.data?.data);
    });
  };
  useEffect(() => {
    handleGetAssignment();
  }, []);

  return (
    <PageContainer
      title={`Danh sách bài tập của khóa học`}
      extra={[<ButtonAdd modalKey="modalAssignment" text="Thêm bài tập" />]}
    >
      <List
        itemLayout="horizontal"
        className="demo-loadmore-list border-b-[1px] border-solid  "
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <Button
                onClick={() => {
                  navigate(`/instructor/question/${item._id}`);
                  dispatch(getCourseId(id));
                }}
              >
                Xem danh sách câu hỏi
              </Button>,
              <ButtonEdit modalKey="modalAssignment" record={item} />,
              <DeleteAssignment
                courseId={id}
                assignmentId={item._id}
                onSuccess={handleGetAssignment}
              />,
            ]}
          >
            <List.Item.Meta title={<p>{item.nameAssignment}</p>} />
          </List.Item>
        )}
      />
      <AddAssignment courseId={id} getAssignment={handleGetAssignment} />
    </PageContainer>
  );
}

export default AssignmentPage;

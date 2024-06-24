import { PageContainer } from "@ant-design/pro-components";
import { getQuestion } from "../../../../Services/api/course";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useParams } from "react-router-dom";
import { Button, Collapse, Popover } from "antd";
import QuestionAnswer from "./QuestionAnswer";
import ButtonAdd from "../../../Button/Add/ButtonAdd";
import AddQuestion from "../../../Modal/Course/AddQuestion";
import AddAnswer from "../../../PopOver/AddAnswer";
import { openPopOverAnswer } from "../../../../store/modalSlice";
import ButtonEdit from "../../../Button/ButtonEdit";
import DeleteQuestion from "../../../Button/Delete/Question";
type ItemType = any;

function QuestionList() {
  const [data, setData] = useState<any>([]);
  const { id } = useParams();
  const courseId = useSelector((state: RootState) => state?.modal?.courseId);
  const hiddenPopOver = useSelector(
    (state: RootState) => state?.modal.hiddenPopOverAnswer
  );
  console.log(hiddenPopOver);

  const dispatch = useDispatch();

  const handleGetQuestion = () => {
    getQuestion(courseId, id).then((res) => setData(res?.data?.data));
  };
  useEffect(() => {
    handleGetQuestion();
  }, []);

  const genExtra = (item: any, ids: number) => {
    return (
      <>
        <Popover
          title="Thêm câu trả lời mới"
          content={
            <AddAnswer
              courseId={courseId}
              assignmentId={id}
              questionId={item?._id}
              getQuestion={handleGetQuestion}
            />
          }
          trigger="click"
          open={hiddenPopOver[ids]}
          onOpenChange={() => {
            dispatch(openPopOverAnswer({ ids }));
          }}
        >
          <Button
            onClick={(event) => {
              event.stopPropagation();
            }}
            className=" mx-[8px] "
          >
            Thêm câu trả lời
          </Button>
        </Popover>

        <DeleteQuestion
          courseId={courseId}
          assignmentId={id}
          questionId={item?._id}
          onSuccess={handleGetQuestion}
        />
      </>
    );
  };

  const itemsQuestion = (items: any): ItemType[] | undefined => {
    const result = items?.map((item: any, ids: any) => {
      const i = String(ids + 1);
      return {
        key: item?._id,
        label: `Câu hỏi ${i}: ${item?.question} `,
        children: (
          <div key={ids}>
            <QuestionAnswer options={item?.options} answer={item?.answer} />
          </div>
        ),
        extra: genExtra(item, ids),
      };
    });
    return result;
  };
  return (
    <PageContainer
      title={`Danh sách câu hỏi `}
      extra={[<ButtonAdd modalKey="modalQuestion" text="Thêm câu hỏi" />]}
    >
      <Collapse items={itemsQuestion(data)} />
      <AddQuestion
        courseId={courseId}
        assignmentId={id}
        getQuestion={handleGetQuestion}
      />
    </PageContainer>
  );
}

export default QuestionList;

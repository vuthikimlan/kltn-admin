import { Button, Popover, Tabs } from "antd";
import CourseOfTopic from "../Course/CourseOfTopic";
import AddTopic from "../../PopOver/AddTopic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { openPopOver, openPopOverEdit } from "../../../store/modalSlice";
import { useState } from "react";
import DeleteTopic from "../../Button/Delete/topic";
import EditTopic from "../../PopOver/EditTopic";

type ItemType = any;

function Topic({ data, fieldId, getField }: any) {
  const dispatch = useDispatch();
  const [topicId, setTopicId] = useState();
  const hiddenPopOver = useSelector(
    (state: RootState) => state?.modal.hiddenPopOver
  );
  const hidenPopOverEdit = useSelector(
    (state: RootState) => state?.modal.hiddenPopOverEdit
  );
  const itemsLecture = (items: any): ItemType[] | undefined => {
    const result = items?.map((item: any, ids: any) => {
      return {
        key: item?._id,
        label: `${item.nameTopic}`,
        children: (
          <div>
            <CourseOfTopic data={item?.courses} />
            <Popover
              title="Chỉnh sửa chủ đề"
              content={
                <EditTopic
                  fieldId={fieldId}
                  topicId={topicId}
                  getField={getField}
                  nameTopic={item.nameTopic}
                />
              }
              open={hidenPopOverEdit}
              onOpenChange={(open) => {
                dispatch(openPopOverEdit());
              }}
              trigger="click"
            >
              <Button>Chỉnh sửa chủ đề</Button>
            </Popover>
            <DeleteTopic
              fieldId={fieldId}
              topicId={topicId}
              getField={getField}
            />
          </div>
        ),
      };
    });
    return result;
  };

  const onChange = (e: any) => {
    setTopicId(e);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={itemsLecture(data)}
        tabPosition={"left"}
        onChange={onChange}
      />
      <div>
        <Popover
          title="Thêm chủ đề mới"
          content={<AddTopic fieldId={fieldId} getField={getField} />}
          open={hiddenPopOver}
          onOpenChange={() => {
            dispatch(openPopOver());
          }}
          trigger="click"
        >
          <Button>Thêm chủ đề</Button>
        </Popover>
      </div>
    </>
  );
}

export default Topic;

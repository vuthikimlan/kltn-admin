import { Button, Descriptions, Popover } from "antd";
import { Key } from "react";
import ButtonAddLectures from "../../Button/Add/ButtonAddLectures";
import AddEditLecture from "../../Modal/Course/AddLectures";
import DeletePart from "../../Button/Delete/Part";
import DeleteLecture from "../../Button/Delete/Lectures";
import EditPart from "../../PopOver/EditPart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { openPopOverEdit } from "../../../store/modalSlice";
import ButtonEdit from "../../Button/ButtonEdit";

function ItemLectures({ data, idPart, getCourse, partName }: any) {
  const dispatch = useDispatch();
  const hidenPopOver = useSelector(
    (state: RootState) => state?.modal.hiddenPopOverEdit
  );
  const role = useSelector((state: RootState) => state?.modal?.role);

  return (
    <div>
      {role === "TEACHER" ? (
        <div className="mb-[10px] ">
          <ButtonAddLectures />
        </div>
      ) : undefined}
      {data.map((el: any, ind: Key) => {
        const handleDownload = () => {
          const downloadLink = document.createElement("a");
          downloadLink.href = `${el?.video}`;
          downloadLink.download = `${el?.lectureName}`;
          downloadLink.click();
        };
        return (
          <div
            key={ind}
            className="border-[1px] border-solid border-[#d9d9d9] p-[5px] mb-[10px] "
          >
            <div>
              <Descriptions>
                <Descriptions.Item label="Tên bài giảng" span={4}>
                  {el?.lectureName}{" "}
                </Descriptions.Item>
                <Descriptions.Item label="Mô tả" span={3}>
                  {el?.descriptionLectures}{" "}
                </Descriptions.Item>
                {el?.video && (
                  <Descriptions.Item label="video" span={2}>
                    <Button onClick={handleDownload}>Xem video</Button>
                  </Descriptions.Item>
                )}
                {el?.document && (
                  <Descriptions.Item label="Tài liệu" span={2}>
                    {el?.document}{" "}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
            {role === "TEACHER" ? (
              <div className="ml-[55rem] mb-[5px] flex ">
                {/* <ButtonEditLecture record={el} modalKey="modalLectures" /> */}
                <ButtonEdit record={el} modalKey="modalLectures" />
                <DeleteLecture
                  idPart={idPart}
                  idLecture={el?._id}
                  getCourse={getCourse}
                />
              </div>
            ) : undefined}
          </div>
        );
      })}
      {role === "TEACHER" ? (
        <div className="ml-[52rem] flex  ">
          <Popover
            title="Chỉnh sửa phần"
            content={
              <EditPart
                partName={partName}
                idPart={idPart}
                getCourse={getCourse}
              />
            }
            open={hidenPopOver}
            onOpenChange={(open) => {
              dispatch(openPopOverEdit());
            }}
            trigger="click"
          >
            <Button>Chỉnh sửa phần</Button>
          </Popover>
          <DeletePart id={idPart} getCourse={getCourse} />
        </div>
      ) : undefined}
      <AddEditLecture idPart={idPart} getCourse={getCourse} />
    </div>
  );
}

export default ItemLectures;

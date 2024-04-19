/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { getCourseById } from "../../../Services/api/course";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Collapse, Popover, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AddPart from "../../PopOver/addCourse";
import ItemLectures from "./ItemsLectures";
import { openPopOver } from "../../../store/modalSlice";
import ButtonApprove from "../../Button/ButtonApprove";

type ItemType = any;

const Lectures = () => {
  const [data, setData] = useState();
  const [idPart, setIdPart] = useState<string | string[]>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const hiddenPopOver = useSelector(
    (state: RootState) => state?.modal.hiddenPopOver
  );
  const role = useSelector((state: RootState) => state?.modal?.role);

  const pathItems = location.pathname.split("/");
  const id = pathItems[pathItems.length - 1];

  const handleGetInfor = async (idPath: string) => {
    getCourseById(idPath).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.parts);
      }
    });
  };

  useEffect(() => {
    handleGetInfor(id);
  }, []);

  // const LecturesEmpty = () => {
  //   return (
  //     <Result
  //       status="403"
  //       title="Chương trình giảng dạy của bạn đang trống."
  //       subTitle="Vui lòng click vào nút dưới đây để tạo mới khóa học"
  //       extra={<ButtonAddCourse />}
  //     />
  //   );
  // };

  const parts = data as any;
  const getCourseCallBack = useCallback((id: string) => {
    handleGetInfor(id);
  }, []);

  const itemsLecture = (items: any): ItemType[] | undefined => {
    const result = items?.map((item: any, ids: any) => {
      const i = String(ids + 1);
      return {
        key: item?._id,
        label: `Phần ${i}: ${item?.partName} `,
        children: (
          <div key={ids}>
            <ItemLectures
              partName={item?.partName}
              data={item.lectures}
              idPart={idPart}
              getCourse={getCourseCallBack}
            />
          </div>
        ),
      };
    });
    return result;
  };

  const onChange = (key: string | string[]) => {
    const id = key[0];
    setIdPart(id);
  };

  return (
    <div>
      <PageContainer
        title="Chương trình giảng dạy"
        extra={[
          <Space>
            {/* Thêm phần khóa học */}
            {role === "TEACHER" ? (
              <>
                <Popover
                  title="Thêm phần mới"
                  content={
                    <AddPart
                      idPart={idPart}
                      getCourse={() => {
                        handleGetInfor(id);
                      }}
                    />
                  }
                  open={hiddenPopOver}
                  onOpenChange={() => {
                    dispatch(openPopOver());
                  }}
                  trigger="click"
                >
                  <Button>+ Phần</Button>
                </Popover>
                <ButtonApprove idCourse={id} />
              </>
            ) : undefined}

            <Button
              onClick={() => {
                if (role === "ADMIN") {
                  navigate("/admin/course");
                } else if (role === "TEACHER") {
                  navigate("/instructor/courses");
                }
              }}
            >
              Quay lại khóa học
            </Button>
            {role === "ADMIN" ? (
              <>
                <Button
                  onClick={() => {
                    navigate("/admin/course-approve");
                  }}
                >
                  Khóa học chờ phê duyệt
                </Button>
              </>
            ) : undefined}
          </Space>,
        ]}
      >
        {/* {lectures.length === 0 ? (
          <LecturesEmpty />
        ) : (
          <Collapse items={itemsLetture(lectures)} />
        )} */}
        <Collapse items={itemsLecture(parts)} onChange={onChange} />
      </PageContainer>
    </div>
  );
};

export default Lectures;

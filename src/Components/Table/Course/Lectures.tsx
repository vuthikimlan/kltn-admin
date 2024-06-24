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
  const [parts, setParts] = useState<any>();
  const [data, setData] = useState<any>();
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
        setData(res?.data?.data);
        setParts(res?.data?.data?.parts);
      }
    });
  };

  useEffect(() => {
    handleGetInfor(id);
  }, []);

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
        title={`Chương trình giảng dạy khóa học ${data?.name} `}
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
                {data?.isApprove === false ? (
                  <ButtonApprove idCourse={id} />
                ) : undefined}
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
          </Space>,
        ]}
      >
        <Collapse items={itemsLecture(parts)} onChange={onChange} />
      </PageContainer>
    </div>
  );
};

export default Lectures;

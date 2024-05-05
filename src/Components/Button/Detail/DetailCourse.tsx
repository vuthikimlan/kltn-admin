/* eslint-disable @typescript-eslint/no-unused-expressions */
import { SolutionOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerOpen } from "../../../store/modalSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";

const ButtonDetail = ({ record }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state: RootState) => state?.modal?.role);

  const showDrawer = () => {
    dispatch(drawerOpen({ drawerKey: "drawerCourse" }));
  };
  return (
    <div>
      <Button
        className="detail"
        icon={<SolutionOutlined />}
        onClick={() => {
          showDrawer();
          if (role === "TEACHER") {
            navigate(`/instructor/courses/detailCourse/${record._id}`);
          } else if (role === "ADMIN") {
            navigate(`/admin/course/detailCourse/${record._id}`);
          }
        }}
      ></Button>
    </div>
  );
};

export default ButtonDetail;

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { SolutionOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { drawerOpen } from "../../../store/modalSlice";
import { useNavigate } from "react-router-dom";

const DetailStudent = ({ record }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDrawer = () => {
    dispatch(drawerOpen({ drawerKey: "drawerUser" }));
  };
  return (
    <div>
      <Button
        className="detail"
        icon={<SolutionOutlined />}
        onClick={() => {
          showDrawer();
          navigate(`/admin/student/detailStudent/${record._id}`);
        }}
      ></Button>
    </div>
  );
};

export default DetailStudent;

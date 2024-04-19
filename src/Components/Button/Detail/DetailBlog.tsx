/* eslint-disable @typescript-eslint/no-unused-expressions */
import { SolutionOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { drawerOpen } from "../../../store/modalSlice";
import { useNavigate } from "react-router-dom";

const ButtonDetail = ({ record }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDrawer = () => {
    dispatch(drawerOpen({ drawerKey: "drawerBlog" }));
  };
  return (
    <div>
      <Button
        className="detail"
        icon={<SolutionOutlined />}
        onClick={() => {
          showDrawer();
          navigate(`/admin/blog/detailBlog/${record._id}`);
        }}
      ></Button>
    </div>
  );
};

export default ButtonDetail;

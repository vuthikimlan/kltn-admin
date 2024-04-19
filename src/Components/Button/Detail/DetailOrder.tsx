import { SolutionOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { drawerOpen } from "../../../store/modalSlice";

function ButtonDetail({ record }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDrawer = () => {
    dispatch(drawerOpen({ drawerKey: "drawerOrder" }));
  };
  return (
    <div>
      <Button
        className="detail"
        icon={<SolutionOutlined />}
        onClick={() => {
          showDrawer();
          navigate(`/admin/order/detailOrder/${record._id}`);
        }}
      ></Button>
    </div>
  );
}

export default ButtonDetail;

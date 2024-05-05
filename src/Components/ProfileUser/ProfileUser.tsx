import { Button, Descriptions, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { drawerClose, modalAddEditOpen } from "../../store/modalSlice";
import { getProfile } from "../../Services/api/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "../Modal/EditProfile";

function ProfileUser() {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>();
  const navigate = useNavigate();

  const drawerOpen = useSelector(
    (state: RootState) => state?.modal.drawerOpen.drawerProfile
  );
  const hiddenDrawer = () => {
    dispatch(drawerClose({ drawerKey: "drawerProfile" }));
  };

  const handleGetProfile = () => {
    getProfile().then((res) => {
      setData(res?.data?.data);
    });
  };

  const checkPermission = data?.role;

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <>
      <Drawer
        title="Thông tin chi tiết của "
        width={600}
        open={drawerOpen}
        onClose={() => {
          hiddenDrawer();
          if (checkPermission === "ADMIN") {
            navigate("/admin/course");
          } else if (checkPermission === "TEACHER") {
            navigate("/instructor/courses");
          }
        }}
      >
        <Descriptions layout="vertical">
          {/* <Descriptions.Item label="Ảnh" span={2}>
            <Image
              src={dataUser?.avatar}
              alt={dataUser?.avatar}
              style={{ width: 200, height: 200 }}
            />
          </Descriptions.Item> */}
          <Descriptions.Item label="Tên người dùng " span={2}>
            {data?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Username" span={2}>
            {data?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {data?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={2}>
            {data?.phone}
          </Descriptions.Item>
          {checkPermission === "TEACHER" ? (
            <>
              <Descriptions.Item label="Chuyên môn" span={2}>
                {data?.teacher?.specialization}
              </Descriptions.Item>
              <Descriptions.Item label="Kinh nghiệm" span={2}>
                {data?.teacher?.experience}
              </Descriptions.Item>
              <Descriptions.Item label="Facebook" span={2}>
                {data?.teacher?.facebook}
              </Descriptions.Item>
              <Descriptions.Item label="Mã ngân hàng" span={2}>
                {data?.paymentMethod?.bankCode}
              </Descriptions.Item>
              <Descriptions.Item label="Tên tài khoản" span={2}>
                {data?.paymentMethod?.accountName}
              </Descriptions.Item>
              <Descriptions.Item label="Số tài khoản" span={2}>
                {data?.paymentMethod?.accountNumber}
              </Descriptions.Item>
            </>
          ) : undefined}
        </Descriptions>
        <Button
          onClick={() => {
            hiddenDrawer();
            dispatch(
              modalAddEditOpen({ modalKey: "modalProfile", data: data })
            );
          }}
        >
          Chỉnh sửa thông tin
        </Button>
      </Drawer>
      <EditProfile getProfile={() => handleGetProfile()} />
    </>
  );
}

export default ProfileUser;

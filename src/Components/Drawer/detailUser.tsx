import { Button, Descriptions, Drawer, Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserById } from "../../Services/api/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { drawerClose } from "../../store/modalSlice";

interface DataType {
  key: string;
  name: string;
}

const DetailUser = () => {
  const [data, setData] = useState<any>();
  const [course, setCourse] = useState<any>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfor = location.pathname.split("/");
  const idPath = userInfor[userInfor.length - 1];
  const drawerOpen = useSelector(
    (state: RootState) => state?.modal.drawerOpen.drawerUser
  );

  const hiddenDrawer = () => {
    dispatch(drawerClose({ drawerKey: "drawerUser" }));
  };

  const handleGetInforUser = async (idPath: string) => {
    getUserById(idPath).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data);
      }
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giảng viên",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (_, { createdBy }: any, record: any) => (
        <>{<p>{createdBy?.name} </p>}</>
      ),
    },
  ];

  useEffect(() => {
    handleGetInforUser(idPath);
  }, [idPath]);

  const courses = data?.boughtCourses;

  return (
    <>
      <Drawer
        title="Thông tin chi tiết người dùng"
        width={700}
        open={drawerOpen}
        onClose={() => {
          hiddenDrawer();
          if (data?.role === "STUDENT") {
            navigate("/admin/student");
          } else if (data?.role === "TEACHER") {
            navigate("/admin/teacher");
          }
        }}
      >
        <Descriptions layout="vertical">
          <Descriptions.Item label="Tên người dùng" span={2}>
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
          {/* <Descriptions.Item label="Vai trò" span={2}>
            {data?.username}
          </Descriptions.Item> */}
          {data?.role === "TEACHER" ? (
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
              <Descriptions.Item label="Số tiền tạm duyệt" span={2}>
                {data?.teacher?.pendingEarning}
              </Descriptions.Item>
              <Descriptions.Item label="Số tiền đã thanh toán" span={2}>
                {data?.teacher?.paidEarning}
              </Descriptions.Item>

              <Descriptions.Item label="Tên tài khoản ngân hàng" span={2}>
                {data?.paymentMethod?.accountName}
              </Descriptions.Item>
              <Descriptions.Item label="Số tài khoản ngân hàng" span={2}>
                {data?.paymentMethod?.accountNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Mã ngân hàng" span={2}>
                {data?.paymentMethod?.bankCode}
              </Descriptions.Item>
            </>
          ) : (
            <>
              <Descriptions.Item span={4}>
                Các khóa học đang tham gia:
              </Descriptions.Item>
              <Descriptions.Item>
                <Table columns={columns} dataSource={courses} />
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Drawer>
    </>
  );
};

export default DetailUser;

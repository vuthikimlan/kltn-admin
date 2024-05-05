import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { Descriptions, Drawer, Image } from "antd";
import { getCourseById } from "../../Services/api/course";
import { drawerClose } from "../../store/modalSlice";

const DetailCourse = () => {
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const drawerOpen = useSelector(
    (state: RootState) => state?.modal.drawerOpen.drawerCourse
  );
  const role = useSelector((state: RootState) => state?.modal?.role);

  const hiddenDrawer = () => {
    dispatch(drawerClose({ drawerKey: "drawerCourse" }));
  };

  const handleGetInfor = async () => {
    getCourseById(id).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    handleGetInfor();
  }, [id]);

  return (
    <>
      <Drawer
        title="Thông tin chi tiết của khóa học"
        width={600}
        open={drawerOpen}
        onClose={() => {
          hiddenDrawer();
          if (role === "ADMIN") {
            navigate("/admin/course");
          } else if (role === "TEACHER") {
            navigate("/instructor/courses");
          }
        }}
      >
        <Descriptions layout="vertical">
          <Descriptions.Item label="Ảnh" span={4}>
            <Image
              src={data?.image}
              alt={data?.image}
              style={{ width: 250, height: 250 }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Tên khóa học" span={2}>
            {data?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả" span={2}>
            {data?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Lĩnh vực" span={2}>
            {data?.field?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Thể loại" span={2}>
            {data?.category}
          </Descriptions.Item>
          <Descriptions.Item label="Giá" span={2}>
            {data?.price}
          </Descriptions.Item>
          <Descriptions.Item label="Điều kiện tham gia" span={2}>
            {data?.conditionParticipate}
          </Descriptions.Item>
          <Descriptions.Item label="Đối tượng" span={2}>
            {data?.object}
          </Descriptions.Item>
          <Descriptions.Item label="Trình độ" span={2}>
            {data?.level}
          </Descriptions.Item>
          <Descriptions.Item label="Tên giảng viên" span={2}>
            {data?.createdBy?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Username" span={2}>
            {data?.createdBy?.username}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default DetailCourse;

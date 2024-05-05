import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { drawerClose } from "../../store/modalSlice";
import { getBlogById } from "../../Services/api/blog";
import { Descriptions, Drawer, Image } from "antd";

function DetailBLog() {
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const drawerOpen = useSelector(
    (state: RootState) => state?.modal.drawerOpen.drawerBlog
  );

  const hiddenDrawer = () => {
    dispatch(drawerClose({ drawerKey: "drawerBlog" }));
  };

  const getById = async () => {
    getBlogById(id).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data);
      }
    });
  };

  console.log("data", data);

  useEffect(() => {
    getById();
  }, [id]);

  return (
    <>
      <Drawer
        title="Thông tin chi tiết của blog - bài viết"
        width={800}
        open={drawerOpen}
        onClose={() => {
          hiddenDrawer();
          navigate("/admin/blog");
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
          <Descriptions.Item label="Tên blog - bài viết" span={2}>
            {data?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả" span={2}>
            {data?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Lĩnh vực" span={2}>
            {data?.field?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Tác giả" span={2}>
            {data?.author?.nameAuthor}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
}

export default DetailBLog;

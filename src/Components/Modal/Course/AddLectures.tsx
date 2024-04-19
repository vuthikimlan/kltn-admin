import {
  ModalForm,
  ProForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import ButtonUpload from "../../Button/ButtonUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { modalAddEditClose } from "../../../store/modalSlice";
import { createLectures, updateLecturse } from "../../../Services/api/course";
import { useLocation } from "react-router-dom";
import { message } from "antd";
import { useForm } from "antd/es/form/Form";

function AddEditLecture({ idPart, getCourse }: any) {
  const [form] = useForm();

  const dispatch = useDispatch();
  const modalOpen = useSelector(
    (state: RootState) => state?.modal?.modalOpen.modalLectures
  );
  const updateData = useSelector((state: RootState) => state?.modal?.modalData);
  const data = updateData as any;

  const location = useLocation();
  const pathItems = location.pathname.split("/");
  const idCourse = pathItems[pathItems.length - 1];

  const hiddenModal = () => {
    dispatch(modalAddEditClose({ modalKey: "modalLectures" }));
  };

  const handleAddLectures = (values: any) => {
    createLectures(idCourse, idPart, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo phần mới thành công");
        getCourse(idCourse);
        hiddenModal();
        form.resetFields();
      }
    });
  };

  const handleUpdateLectures = (values: any) => {
    updateLecturse(idCourse, idPart, data._id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật bài giảng thành công");
        getCourse(idCourse);
        hiddenModal();
        form.resetFields();
      }
    });
  };

  return (
    <>
      <ModalForm
        title={data._id ? "Chỉnh sửa bài giảng" : "Thêm bài giảng"}
        form={form}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) {
            hiddenModal();
          }
        }}
        onFinish={async (values) => {
          if (data._id) {
            handleUpdateLectures(values);
          } else {
            handleAddLectures(values);
          }
        }}
        // initialValues={updateData}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            label="Tên bài giảng"
            name="lectureName"
            initialValue={data._id ? data?.lectureName : ""}
            placeholder="Nhập tên bài giảng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên bài giảng",
              },
            ]}
          />
          <ProFormTextArea
            width="md"
            label="Mô tả"
            initialValue={data._id ? data?.descriptionLectures : ""}
            name="descriptionLectures"
            placeholder="Nhập mô tả"
          />

          <ButtonUpload title="video" initialValue="" label="Video" />
          <ButtonUpload title="document" initialValue="" label="Tài liệu" />
          <ProFormSwitch name="isFree" label="Miễn phí" />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default AddEditLecture;

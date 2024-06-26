import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import ButtonUpload from "../Button/ButtonUpload";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FormInstance } from "antd/lib";
import { modalAddEditClose } from "../../store/modalSlice";
import { message } from "antd";
import {
  createField,
  getFieldById,
  updateField,
} from "../../Services/api/category";
import { useLocation, useNavigate } from "react-router-dom";

function AddField({ fieldId, getField }: any) {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const modalOpen = useSelector(
    (state: RootState) => state?.modal.modalOpen.modalField
  );

  const [data, setData] = useState<any>({});

  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state?.modal?.role);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];

  const hiddenModal = () => {
    dispatch(modalAddEditClose({ modalKey: "modalField" }));
    if (role === "ADMIN") {
      navigate(`/admin/${lastPathSegment}`);
    }
  };

  const handleGetFieldById = () => {
    getFieldById(fieldId).then((res) => {
      setData(res?.data?.data);
    });
  };

  useEffect(() => {
    handleGetFieldById();
  }, []);

  const handleCreateField = (values: any) => {
    createField(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tao thể loại thành công");
        getField();
        hiddenModal();
      }
    });
  };
  const handleUpdateFiels = (values: any) => {
    updateField(fieldId, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật thể loại thành công");
        getField();
        hiddenModal();
      }
    });
  };

  return (
    <>
      <ModalForm
        title={fieldId ? "Cập nhật thể loại" : "Thêm thể loại"}
        open={modalOpen}
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        onOpenChange={(open) => {
          if (!open) {
            hiddenModal();
          }
        }}
        onFinish={async (values) => {
          if (fieldId) {
            handleUpdateFiels(values);
          } else {
            handleCreateField(values);
          }
        }}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="title"
            label="Tên thể loại"
            initialValue={fieldId ? data?.title : ""}
            placeholder="Nhập tên thể loại "
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên của thể loại",
              },
            ]}
          />
          <ButtonUpload
            title="image"
            initialValue=""
            label="Ảnh"
            listType="picture-card"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default AddField;

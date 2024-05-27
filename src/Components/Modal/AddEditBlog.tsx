import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import CKeditor from "../Ckeditor/CKeditor";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { modalAddEditClose } from "../../store/modalSlice";
import { createBlog, updateBlog } from "../../Services/api/blog";
import { message } from "antd";
import { FormInstance } from "antd";
import ButtonUpload from "../Button/ButtonUpload";
import { useLocation, useNavigate } from "react-router-dom";

interface DataType {
  getBlog: () => void;
}

function AddEditBlog({ getBlog }: DataType) {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const modalOpen = useSelector(
    (state: RootState) => state?.modal?.modalOpen?.modalBlog
  );

  const updateData = useSelector((state: RootState) => state?.modal.modalData);
  const data = updateData as any;

  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state?.modal?.role);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];

  const hiddenModal = () => {
    dispatch(modalAddEditClose({ modalKey: "modalBlog" }));

    if (role === "ADMIN") {
      navigate(`/admin/${lastPathSegment}`);
    }
  };

  const handleCreate = (values: any) => {
    createBlog(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo bài viết thành công");
        getBlog();
        hiddenModal();
      } else if (res?.data?.error?.statusCode === 2) {
        res?.data?.error?.errorList.map((e: any) => {
          return message.open({
            type: "error",
            content: e.msg,
            duration: 8,
          });
        });
      }
    });
  };
  const handleUpdate = (values: any) => {
    updateBlog(data._id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật bài viết thành công");
        getBlog();
        hiddenModal();
      }
    });
  };

  return (
    <>
      <ModalForm
        title={data._id ? "Cập nhật blog - bài viết" : "Thêm Blog -  bài viết"}
        width={1500}
        open={modalOpen}
        initialValues={updateData}
        modalProps={{
          destroyOnClose: true,
        }}
        onOpenChange={(open) => {
          if (!open) {
            hiddenModal();
          }
        }}
        onFinish={async (values) => {
          if (data._id) {
            handleUpdate(values);
          } else {
            handleCreate(values);
          }
        }}
        formRef={formRef}
      >
        <ButtonUpload
          title="image"
          initialValue=""
          label="Ảnh"
          listType="picture"
        />
        <ProFormText
          width="lg"
          name="title"
          label="Lĩnh vực "
          placeholder="Nhập lĩnh vực "
        />
        <ProFormText
          name="name"
          label="Tên blog "
          placeholder="Nhập tên blog "
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên của blog",
            },
          ]}
        />
        <ProForm.Group>
          <ButtonUpload
            title="avatar"
            initialValue=""
            label="Avatar"
            listType="picture"
          />

          <ProFormText
            width="lg"
            initialValue={data._id ? data?.author?.nameAuthor : ""}
            name="nameAuthor"
            label="Tên tác giả "
            placeholder="Nhập tên tác giả "
          />
        </ProForm.Group>
        <ProForm.Item
          name="content"
          label="Nội dung của Blog"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nội dung của blog",
            },
          ]}
        >
          <CKeditor
            onChange={(event: any, editor: any) => {
              formRef?.current?.setFieldsValue({
                content: editor.getData(),
              });
            }}
            initialValues={data?.content}
          />
        </ProForm.Item>
      </ModalForm>
    </>
  );
}

export default AddEditBlog;

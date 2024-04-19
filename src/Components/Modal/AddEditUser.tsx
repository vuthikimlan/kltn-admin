import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import React, { useRef } from "react";
import { message } from "antd";
import { createUser, updateUser } from "../../Services/api/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { modalAddEditClose } from "../../store/modalSlice";
import "../style.css";
import { useLocation, useNavigate } from "react-router-dom";

interface DataType {
  getUser: () => void;
}

const AddEditUser = ({ getUser }: DataType) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const modalOpen = useSelector(
    (state: RootState) => state?.modal.modalOpen.modalUser
  );

  const updateData = useSelector((state: RootState) => state?.modal?.modalData);
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state?.modal?.role);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];

  const data = updateData as any;

  const hiddenModal = () => {
    dispatch(modalAddEditClose({ modalKey: "modalUser" }));
    if (role === "ADMIN") {
      navigate(`/admin/${lastPathSegment}`);
    }
  };

  const handleCreateUser = (values: any) => {
    createUser(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo người dùng thành công");
        // Hàm gọi lại danh sách người dùng
        getUser();

        // Sau khi tạo thành công cần tắt modal
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
  const handleUpdateUser = (values: any) => {
    updateUser(data._id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật người dùng thành công");
        getUser();
        hiddenModal();
      }
    });
  };

  return (
    <>
      <ModalForm
        title={
          data._id
            ? "Chỉnh sửa thông tin người dùng"
            : "Thêm thông tin người dùng"
        }
        modalProps={{
          destroyOnClose: true,
        }}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) {
            hiddenModal();
          }
        }}
        initialValues={updateData}
        formRef={formRef}
        onFinish={async (values) => {
          if (data._id) {
            handleUpdateUser(values);
          } else {
            handleCreateUser(values);
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Họ và tên"
            placeholder="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vul lòng nhập họ và tên",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="username"
            label="Username"
            placeholder="Username"
            rules={[
              {
                required: true,
                message: "Vul lòng nhập Username",
              },
            ]}
          />
          {!data._id && (
            <ProFormText
              width="md"
              name="password"
              label="Password"
              placeholder="Password"
              rules={[
                {
                  required: true,
                  message: "Vul lòng nhập password",
                },
              ]}
            />
          )}

          <ProFormText
            width="md"
            name="email"
            label="Email"
            placeholder="Email"
            rules={[
              {
                required: true,
                message: "Vul lòng nhập Email",
              },
              {
                type: "email",
                message: "E-mail không hợp lệ",
              },
            ]}
          />

          <ProFormText
            width="md"
            name="phone"
            label="Số điện thoại"
            placeholder="Số điện thoại"
          />

          {data.role === "TEACHER" && (
            <>
              <ProFormText
                width="md"
                name="specialization"
                initialValue={data._id ? data?.teacher?.experience : ""}
                label="Chuyên môn"
                placeholder="Chuyên môn"
              />
              <ProFormText
                width="md"
                name="experience"
                initialValue={data._id ? data?.teacher?.specialization : ""}
                label="Kinh nghiệm"
                placeholder="Kinh nghiệm"
              />
              <ProFormText
                width="md"
                name="facebook"
                initialValue={data._id ? data?.teacher?.facebook : ""}
                label="Facebook"
                placeholder="Facebook"
              />
              <ProFormText
                width="md"
                name="accountName"
                initialValue={data._id ? data?.teacher?.accountName : ""}
                label="Tên tài khoản ngân hàng"
                placeholder="Tên tài khoản ngân hàng"
              />
              <ProFormDigit
                width="md"
                name="accountNumber"
                initialValue={data._id ? data?.teacher?.accountNumber : ""}
                label="Số tài khoản ngân hàng"
                placeholder="Số tài khoản ngân hàng"
              />
              <ProFormText
                width="md"
                name="bankCode"
                initialValue={data._id ? data?.teacher?.bankCode : ""}
                label="Mã ngân hàng"
                placeholder="Mã ngân hàng"
              />
            </>
          )}

          <ProFormSelect
            name="role"
            label="Vai trò"
            placeholder=" Vai trò"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vai trò",
              },
            ]}
            options={[
              { label: "Học viên", value: "STUDENT" },
              { label: "Giảng viên", value: "TEACHER" },
            ]}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default AddEditUser;

import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { modalAddEditClose } from "../../store/modalSlice";
import { useRef } from "react";
import { editProfile } from "../../Services/api/user";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function EditProfile({ getProfile }: any) {
  const modalOpen = useSelector(
    (state: RootState) => state?.modal.modalOpen.modalProfile
  );
  const updateData = useSelector((state: RootState) => state?.modal.modalData);
  const role = useSelector((state: RootState) => state?.modal?.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();

  const data = updateData as any;

  const handleEditProfile = (values: any) => {
    editProfile(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Chỉnh sửa thông tin cá nhân thành công");
        getProfile();
        if (role === "ADMIN") {
          navigate("/admin/profile");
        } else if (role === "TEACHER") {
          navigate("/instructor/profile");
        }
        dispatch(modalAddEditClose("modalProfile"));
      }
    });
  };

  return (
    <>
      <ModalForm
        title="Chỉnh sửa thông tin cá nhân"
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={updateData}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) {
            dispatch(modalAddEditClose({ modalKey: "modalProfile" }));

            navigate("/instructor/courses");
          }
        }}
        onFinish={async (values) => {
          handleEditProfile(values);
        }}
        formRef={formRef}
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
          <ProFormText
            width="md"
            name="specialization"
            initialValue={data?.teacher?.experience}
            label="Chuyên môn"
            placeholder="Chuyên môn"
          />
          <ProFormText
            width="md"
            name="experience"
            initialValue={data?.teacher?.specialization}
            label="Kinh nghiệm"
            placeholder="Kinh nghiệm"
          />
          <ProFormText
            width="md"
            name="facebook"
            initialValue={data?.teacher?.specialization}
            label="Facebook"
            placeholder="Facebook"
          />
          <ProFormText
            width="md"
            name="accountName"
            initialValue={data?.paymentMethod?.accountName}
            label="Tên tài khoản ngân hàng"
            placeholder="Tên tài khoản ngân hàng"
          />
          <ProFormText
            width="md"
            name="accountNumber"
            initialValue={data?.paymentMethod?.accountNumber}
            label="Số tài khoản ngân hàng"
            placeholder="Số tài khoản ngân hàng"
          />
          <ProFormText
            width="md"
            name="bankCode"
            initialValue={data?.paymentMethod?.bankCode}
            label="Mã ngân hàng"
            placeholder="Mã ngân hàng"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default EditProfile;

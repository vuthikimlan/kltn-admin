import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-components";
import { FormInstance } from "antd/lib";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { modalAddEditClose } from "../../store/modalSlice";
import { createDiscount, updateDiscount } from "../../Services/api/discount";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

function AddEditDiscount({ getDiscount }: any) {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const modalOpen = useSelector(
    (state: RootState) => state?.modal?.modalOpen.modalDiscount
  );
  const updateData = useSelector((state: RootState) => state?.modal?.modalData);
  const data = updateData as any;

  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state?.modal?.role);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];

  const hiddenModal = () => {
    dispatch(modalAddEditClose({ modalKey: "modalDiscount" }));
    if (role === "ADMIN") {
      navigate(`/admin/${lastPathSegment}`);
    }
  };

  const handleCreate = (values: any) => {
    createDiscount(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo Mã giảm giá thành công");
        getDiscount();
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
    updateDiscount(data._id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật mã giảm giá thành công");
        getDiscount();
        hiddenModal();
      }
    });
  };

  return (
    <>
      <ModalForm
        title={data._id ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá"}
        open={modalOpen}
        formRef={formRef}
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
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="discountCode"
            label="Mã giảm giá "
            placeholder="Nhập mã giảm giá "
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã giảm giá",
              },
            ]}
          />
          <ProFormDigit
            width="md"
            name="discountRate"
            label="Giá trị giảm giá "
            placeholder="Nhập giá trị giảm giá "
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá trị giảm giá",
              },
            ]}
          />
          <ProFormDigit
            width="md"
            name="expiryDate"
            label="Số ngày hết hạn "
            placeholder="Nhập ngày hết hạn "
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày hết hạn",
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default AddEditDiscount;

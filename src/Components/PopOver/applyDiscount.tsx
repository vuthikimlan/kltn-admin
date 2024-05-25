import { ModalForm, ProForm, ProFormSelect } from "@ant-design/pro-components";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalAddEditClose } from "../../store/modalSlice";
import { getListDiscount } from "../../Services/api/discount";
import { useEffect, useRef, useState } from "react";
import { applyDiscount } from "../../Services/api/course";
import { FormInstance } from "antd";
import { useNavigate } from "react-router-dom";

function ApplyDiscount({ onSuccess }: any) {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState();
  const modalOpen = useSelector(
    (state: any) => state?.modal.modalOpen.modalDiscount
  );
  const navigate = useNavigate();
  const role = useSelector((state: any) => state?.modal?.role);
  const dataDiscounts = useSelector((state: any) => state?.modal?.dataDiscount);

  const hiddenModal = () => {
    dispatch(modalAddEditClose({ modalKey: "modalDiscount" }));
    if (role === "ADMIN") {
      navigate("/admin/course");
    }
  };
  const handleGetDiscount = () => {
    getListDiscount().then((res) => {
      const items = res?.data?.data?.items;
      const now = new Date();

      // Check mã giảm giá nào còn hiệu lực sẽ hiển thị ra
      const validCodes = items.filter(
        (item: { expiryDate: string | number | Date }) => {
          const expiry = new Date(item.expiryDate);
          return now < expiry;
        }
      );
      const options = validCodes.map((e: any) => {
        return {
          label: e.discountRate,
          value: e.discountCode,
        };
      });
      setDiscount(options);
    });
  };

  const handleApplyDiscount = (values: any) => {
    applyDiscount(dataDiscounts?.data, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Áp mã giảm giá cho khóa học thành công");
        onSuccess();
        hiddenModal();
      }
      if (res?.data?.success === false) {
        message.error("Mã giảm giá đã hết hạn");
      }
    });
  };

  useEffect(() => {
    handleGetDiscount();
  }, []);

  return (
    <>
      <ModalForm
        title="Thêm mã giảm giá cho khóa học "
        open={modalOpen}
        modalProps={{
          destroyOnClose: true,
        }}
        onOpenChange={(open) => {
          if (!open) {
            hiddenModal();
          }
        }}
        onFinish={async (values) => {
          handleApplyDiscount(values);
        }}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="discountCode"
            label="Mã giảm giá (%) "
            placeholder="Mã giảm giá (%) "
            options={discount}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default ApplyDiscount;

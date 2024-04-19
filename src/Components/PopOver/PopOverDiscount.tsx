import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { hiddenPopOver } from "../../store/modalSlice";
import { Button, Form } from "antd";

function PopOverDiscount({ onSearch }: any) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const hide = () => {
    dispatch(hiddenPopOver());
  };
  const handleFilterData = (values: any): any => {
    onSearch(values);
    hide();
    form.resetFields();
  };
  return (
    <>
      <ProForm
        submitter={false}
        form={form}
        onFinish={handleFilterData}
        onReset={() => {
          console.log("e");
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="discountCode"
            label="Mã giảm giá "
            placeholder="Nhập mã giảm giá "
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="active"
            label="Hạn mã giảm giá"
            placeholder="Chọn hạn của mã giảm giá "
            options={[
              { label: "Còn hạn", value: true },
              { label: "Hết hạn", value: false },
            ]}
          />
        </ProForm.Group>
        <Form.Item>
          <Button
            style={{ border: "1px solid #d9d9d9", marginRight: 10 }}
            type="primary"
            htmlType="submit"
          >
            Lọc
          </Button>
          <Button
            style={{
              border: "1px solid #d9d9d9",
              backgroundColor: "#fff",
              color: "black",
            }}
            type="primary"
            onClick={hide}
          >
            Hủy
          </Button>
        </Form.Item>
      </ProForm>
    </>
  );
}

export default PopOverDiscount;

import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { hiddenPopOver } from "../../store/modalSlice";
import { Button, Form } from "antd";
import { getListField } from "../../Services/api/category";
import { useEffect, useState } from "react";

const PopOverCourse = ({ onSearch }: any) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [field, setField] = useState<any>([]);
  const [topic, setTopic] = useState<any>([]);

  const hide = () => {
    dispatch(hiddenPopOver());
  };

  const handleFilterData = (values: any): any => {
    onSearch(values);
    hide();
    form.resetFields();
  };

  const handleGetAll = async () => {
    await getListField().then((res) => {
      const items = res?.data?.data?.items;
      const optionsField = items.map((e: any) => {
        return {
          label: e.title,
          value: e._id,
        };
      });
      const itemsTopic = res?.data?.data?.items.flatMap(
        (item: { topics: any }) => item.topics
      );
      const topics = itemsTopic.map((el: any) => {
        return {
          label: el.nameTopic,
          value: el._id,
        };
      });
      setTopic(topics);
      setField(optionsField);
    });
  };

  useEffect(() => {
    handleGetAll();
  }, []);

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
            name="name"
            label="Tên khóa học"
            placeholder="Nhập tên khóa học"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="field"
            label="Lĩnh vực"
            placeholder="Chọn lĩnh vực"
            options={field}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="topic"
            label="Thể loại"
            placeholder="Chọn thể loại"
            options={topic}
          />
        </ProForm.Group>
        <p className=" mb-[10px] ">Lọc theo khoảng giá: </p>
        <ProForm.Group>
          <ProFormDigit width="sm" name="minPrice" placeholder="MinPrice" />
          {"->"}
          <ProFormDigit width="sm" name="maxPrice" placeholder="MaxPrice" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            name="level"
            label="Trình độ"
            placeholder=" Trình độ"
            options={[
              { label: "Sơ cấp", value: "PRIMARY" },
              { label: "Trung cấp", value: "INTERMEDIATE " },
              { label: "Tất cả trình độ", value: "ALL LEVELS" },
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
};

export default PopOverCourse;

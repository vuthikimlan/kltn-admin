import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { modalAddEditClose } from "../../../store/modalSlice";
import { useEffect, useRef, useState } from "react";
import { createCourse, updateCourse } from "../../../Services/api/course";
import { message } from "antd";
import { getListField } from "../../../Services/api/category";
import ButtonUpload from "../../Button/ButtonUpload";

interface DataType {
  getCourse: () => void;
}

const AddEditCourse = ({ getCourse }: DataType) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const modalOpen = useSelector(
    (state: RootState) => state?.modal?.modalOpen.modalCourse
  );

  const updateData = useSelector((state: RootState) => state?.modal?.modalData);
  const [field, setField] = useState();
  const [topic, setTopic] = useState();
  const data = updateData as any;

  const getField = () => {
    getListField().then((res) => {
      const fields = res?.data?.data?.items;
      const options = fields.map((e: any) => {
        return {
          label: e.title,
          value: e._id,
        };
      });
      const topic = res?.data?.data?.items.flatMap(
        (item: { topics: any }) => item.topics
      );
      const topics = topic.map((el: any) => {
        return {
          label: el.nameTopic,
          value: el._id,
        };
      });
      setField(options);
      setTopic(topics);
    });
  };

  useEffect(() => {
    getField();
  }, []);

  const hiddenModal = () => {
    dispatch(modalAddEditClose({ modalKey: "modalCourse" }));
  };

  const handleCreateCourse = (values: any) => {
    createCourse(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo khóa học thành công");
        getCourse();
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

  const handleUpdateCourse = (values: any) => {
    updateCourse(data._id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật khóa học thành công");
        getCourse();
        hiddenModal();
      }
    });
  };

  return (
    <div>
      <ModalForm
        title={data._id ? "Chỉnh sửa khóa học" : "Thêm khóa học"}
        formRef={formRef}
        open={modalOpen}
        initialValues={updateData}
        modalProps={{
          destroyOnClose: true,
        }}
        onOpenChange={(open) => {
          if (!open) {
            dispatch(modalAddEditClose({ modalKey: "modalCourse" }));
          }
        }}
        onFinish={async (values) => {
          if (data._id) {
            handleUpdateCourse(values);
          } else {
            handleCreateCourse(values);
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Tên khóa học"
            placeholder="Tên khóa học"
            rules={[
              {
                required: true,
                message: "Vul lòng nhập tên khóa học",
              },
            ]}
          />
          <ButtonUpload title="image" initialValue="" label="Ảnh" />

          <ProFormTextArea
            width="md"
            name="description"
            label="Mô tả"
            placeholder="Mô tả"
          />

          <ProFormSelect
            width="md"
            name="field"
            // initialValue={data._id ? data?.}
            options={field}
            label="Lĩnh vực"
            placeholder="Lĩnh vực"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn lĩnh vực",
              },
            ]}
          />
          <ProFormSelect
            width="md"
            name="topic"
            options={topic}
            label="Chủ đề"
            placeholder="Chủ đề"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn chủ đề",
              },
            ]}
          />
          <ProFormDigit width="md" name="price" label="Giá" placeholder="Giá" />

          <ProFormSelect
            width="md"
            name="conditionParticipate"
            label="Điều kiện tham gia"
            placeholder="Điều kiện tham gia"
            mode="tags"
          />
          <ProFormSelect
            width="md"
            name="object"
            label="Đối tượng tham gia"
            placeholder="Đối tượng tham gia"
            mode="tags"
          />
          <ProFormSelect
            name="level"
            label="Trình độ"
            placeholder=" Trình độ"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trình độ",
              },
            ]}
            options={[
              { label: "Sơ cấp", value: "PRIMARY" },
              { label: "Trung cấp", value: "INTERMEDIATE " },
              { label: "Tất cả trình độ", value: "ALL LEVELS" },
            ]}
          />
          <ProFormSelect
            width="md"
            name="lessonContent"
            label="Tổng quan nội dung khóa học"
            placeholder="Nội dung khóa học"
            mode="tags"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
};

export default AddEditCourse;

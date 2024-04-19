import { Space, Table, TableProps } from "antd";
import ButtonEdit from "../../Button/ButtonEdit";
import ButtonDetail from "../../Button/Detail/DetailCourse";
import ButtonAdd from "../../Button/Add/ButtonAdd";
import DeleteCourse from "../../Button/Delete/Course";
import { PageContainer } from "@ant-design/pro-components";
import AddEditCourse from "../../Modal/Course/AddEditCourse";
import DetailCourse from "../../Drawer/detailCourse";
import DropdownInstructor from "../../Dropdown/DropdownInstructor";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface DataType {
  key: string;
  name: string;
}
interface PropType {
  data: any;
  loading: boolean;
  handleGetCourse: () => void;
}

function CourseInstructor({ data, loading, handleGetCourse }: PropType) {
  const role = useSelector((state: RootState) => state.modal.role);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Lĩnh vực",
      dataIndex: "field",
      key: "field",
      render: (_, { field }: any, record: any) => <>{<p>{field?.title} </p>}</>,
    },
    {
      title: "Chi phí",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Trình độ",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Action",
      hidden: role === "TEACHER" ? false : true,
      key: "action",
      render: (record) => (
        <Space>
          <ButtonEdit record={record} modalKey="modalCourse" />
          <DeleteCourse
            onSuccess={() => {
              handleGetCourse();
            }}
            record={record}
          />
          <ButtonDetail record={record} />
          <DropdownInstructor record={record} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageContainer
        extra={
          role === "TEACHER"
            ? [
                <Space>
                  <ButtonAdd modalKey="modalCourse" text="Thêm khóa học" />
                </Space>,
              ]
            : []
        }
      >
        <AddEditCourse
          getCourse={() => {
            handleGetCourse();
          }}
        />
        <Table
          size="middle"
          columns={columns}
          dataSource={data}
          loading={loading}
          scroll={{
            y: 413,
          }}
          pagination={{
            pageSize: 7,
          }}
        />

        <DetailCourse />
      </PageContainer>
    </>
  );
}

export default CourseInstructor;

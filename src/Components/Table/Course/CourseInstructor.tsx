import { Button, Space, Table, TableProps } from "antd";
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
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  price: number;
  isApprove: boolean;
}

function CourseInstructor({
  data,
  loading,
  handleGetCourse,
  nameInstructor,
}: any) {
  const role = useSelector((state: RootState) => state.modal.role);
  const navigate = useNavigate();

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
      render: (_, { price }) => <>{price.toLocaleString("en")} VND </>,
    },
    {
      title: "Trình độ",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Phê duyệt",
      dataIndex: "isApprove",
      key: "isApprove",
      render: (_, { isApprove }) => (
        <>{isApprove ? <p>Đã duyệt</p> : <p>Chờ duyệt</p>}</>
      ),
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
        title={`Các khóa học của giảng viên   `}
        extra={
          role === "TEACHER"
            ? [
                <Space>
                  <ButtonAdd modalKey="modalCourse" text="Thêm khóa học" />
                </Space>,
              ]
            : [
                <Space>
                  <Button
                    onClick={() => {
                      navigate("/admin/teacher");
                    }}
                  >
                    Quay lại
                  </Button>
                </Space>,
              ]
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

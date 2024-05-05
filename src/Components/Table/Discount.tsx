import { Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { filterDiscount, getListDiscount } from "../../Services/api/discount";
import { PageContainer } from "@ant-design/pro-components";
import ButtonEdit from "../Button/ButtonEdit";
import ButtonAdd from "../Button/Add/ButtonAdd";
import AddEditDiscount from "../Modal/AddEditDiscount";
import DeleteDiscount from "../Button/Delete/Discount";
import ButtonFilter from "../Button/ButtonFilter";
import PopOverDiscount from "../PopOver/PopOverDiscount";
import formatDate from "../../Services/helper";

interface DataType {
  key: string;
  name: string;
}

function TableDiscount() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const handleGetAll = () => {
    setLoading(true);
    getListDiscount()
      .then((res) => {
        const items = res?.data?.data?.items;
        setData(items);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilterData = (values: string) => {
    filterDiscount(values).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    handleGetAll();
    setLoading(false);
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Mã giảm giá",
      dataIndex: "discountCode",
      key: "discountCode",
    },
    {
      title: "Giá trị giảm giá (%)",
      dataIndex: "discountRate",
      key: "discountRate",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (_, { expiryDate }: any, record: any) => (
        <>{<p>{formatDate(`${expiryDate}`)}</p>}</>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <ButtonEdit modalKey="modalDiscount" record={record} />
          <DeleteDiscount
            onSuccess={() => {
              handleGetAll();
            }}
            record={record}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      <PageContainer
        extra={[
          <Space>
            <ButtonAdd modalKey="modalDiscount" text="Thêm mã giảm giá" />
            <ButtonFilter
              content={
                <PopOverDiscount
                  onSearch={(values: any) => {
                    handleFilterData(values);
                  }}
                />
              }
            />
          </Space>,
        ]}
      >
        <Table
          size="middle"
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            pageSize: 7,
          }}
        />
        <AddEditDiscount
          getDiscount={() => {
            handleGetAll();
          }}
        />
      </PageContainer>
    </>
  );
}

export default TableDiscount;

import { PageContainer } from "@ant-design/pro-components";
import { Space, Tabs } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getListField } from "../../../Services/api/category";
import ButtonAdd from "../../Button/Add/ButtonAdd";
import AddField from "../../Modal/AddField";
import Topic from "./Topic";
import DeleteField from "../../Button/Delete/Field";
import ButtonEdit from "../../Button/ButtonEdit";

type ItemType = any;

function TableCategory() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [fieldId, setFieldId] = useState();

  const handleGetAll = async () => {
    setLoading(true);
    await getListField()
      .then((res) => {
        setData(res?.data?.data?.items);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getFieldCallBack = useCallback(() => {
    handleGetAll();
  }, []);
  useEffect(() => {
    handleGetAll();
    setLoading(false);
  }, []);

  const onChange = (e: any) => {
    setFieldId(e);
  };

  const itemsLecture = (items: any): ItemType[] | undefined => {
    const result = items?.map((item: any, ids: any) => {
      return {
        key: item?._id,
        label: `${item.title}`,
        children: (
          <div key={ids}>
            <Topic
              data={item?.topics}
              fieldId={fieldId}
              getField={getFieldCallBack}
            />
          </div>
        ),
      };
    });

    return result;
  };

  return (
    <>
      <PageContainer
        extra={[
          <Space>
            <ButtonAdd modalKey="modalField" text="Thêm thể loại" />
            <ButtonEdit modalKey="modalField" record={data} />
            <DeleteField fieldId={fieldId} getField={getFieldCallBack} />
          </Space>,
        ]}
      >
        <Tabs
          defaultActiveKey="1"
          items={itemsLecture(data)}
          centered
          onChange={onChange}
        />
        <AddField
          fieldId={fieldId}
          getField={() => {
            handleGetAll();
          }}
        />
      </PageContainer>
    </>
  );
}

export default TableCategory;

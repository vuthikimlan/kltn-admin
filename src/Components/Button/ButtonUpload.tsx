import { ProFormUploadButton } from "@ant-design/pro-components";
import { useState } from "react";
import { uploadFile } from "../../Services/api/course";
import { notification } from "antd";

interface Datatype {
  title: string;
  initialValue: string | "";
  label: string;
}

function ButtonUpload({ title, initialValue, label }: Datatype) {
  const [listFile, setListFile] = useState<any[]>([]);
  const [fieldFile, setFieldFile] = useState("");

  const handleUpload = async (file: any) => {
    const res = await uploadFile(file.file);

    if (res?.data?.success) {
      setListFile([{ url: res?.data?.data }]);
      setFieldFile(res?.data?.data);
      notification.success({
        message: "Tải file lên thành công",
      });
    } else {
      notification.error({
        message: "Tải file lên không thành công",
      });
    }
  };

  return (
    <>
      <ProFormUploadButton
        name={title}
        initialValue={initialValue}
        label={label}
        title="Click to upload"
        fileList={listFile}
        transform={(value) => {
          return {
            [title]: fieldFile || "",
          };
        }}
        fieldProps={{
          listType: "picture-card",
          method: "POST",
          name: "file",
          customRequest: handleUpload,
          multiple: true,
          onRemove: () => setListFile([]),
          openFileDialogOnClick: true,
          onChange: (file) => {},
        }}
        action="http://localhost:8000/file/upload"
      />
    </>
  );
}

export default ButtonUpload;

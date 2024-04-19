import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { notification } from "antd";
import Cookies from "js-cookie";

function CKeditor({ onChange, initialValues }: any) {
  const UPLOAD_SERVICE = "http://localhost:8000/file/upload";

  const token = Cookies.get("token");
  const headers = new Headers();
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then(async (file: string | Blob) => {
            body.append("file", file);
            try {
              const response = await fetch(UPLOAD_SERVICE, {
                method: "post",
                body: body,
                headers: headers,
              });
              console.log("response", response);
              if (!response.ok) {
                throw new Error("Lỗi khi tải ảnh lên.");
              }

              const data = await response.json();
              if (data.success) {
                resolve({ default: data?.data?.data });
              } else {
                notification.error({
                  message:
                    data?.error?.message || "Tải ảnh lên không thành công",
                });
                reject();
              }
            } catch (error) {
              reject(error);
            }
          });
        });
      },
    };
  }
  function uploadPlugin(editor: {
    plugins: {
      get: (arg0: string) => {
        (): any;
        new (): any;
        createUploadAdapter: (loader: any) => {
          upload: () => Promise<unknown>;
        };
      };
    };
  }) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        onChange={onChange}
        data={initialValues || ""}
        config={{
          extraPlugins: [uploadPlugin],
        }}
      />
    </>
  );
}

export default CKeditor;

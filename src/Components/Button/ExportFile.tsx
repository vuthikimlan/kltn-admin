import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { utils, writeFileXLSX } from "xlsx";

function ExportFile(dataInstructor: any) {
  const data = dataInstructor.dataInstructor;

  const renameColumn = data.map((item: any) => ({
    "Tên giảng viên": item.teacher.name,
    Email: item.teacher.email,
    "Tên ngân hàng": item.teacher.paymentMethod.accountName,
    "Số tài khoản": item.teacher.paymentMethod.accountNumber,
    "Mã ngân hàng": item.teacher.paymentMethod.bankCode,
    "Số tiền tạm tính": item.revenueByMonth.pendingEarning,
    "Số tiền thực nhận": item.revenueByMonth.paidEarning,
  }));
  const hanldeExportFile = () => {
    const ws = utils.json_to_sheet(renameColumn);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Giảng viên");
    writeFileXLSX(wb, "Danh sách giảng viên.xlsx");
  };
  return (
    <>
      <Button icon={<DownloadOutlined />} onClick={hanldeExportFile}>
        Xuất file
      </Button>
    </>
  );
}

export default ExportFile;

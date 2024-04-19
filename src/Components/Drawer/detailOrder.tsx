import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../../Services/api/order";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { drawerclose } from "../../store/modalSlice";
import formatDate from "../../Services/helper";

function DetailOrder() {
  const [data, setData] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const drawerOpen = useSelector(
    (state: RootState) => state?.modal.drawerOpen.drawerOrder
  );

  const hiddenDrawer = () => {
    dispatch(drawerclose({ drawerKey: "drawerOrder" }));
  };

  const getById = async () => {
    getOrderById(id).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data);
      }
    });
  };

  const order = data as any;

  useEffect(() => {
    getById();
  }, [id]);

  return (
    <div className="text-base">
      <Drawer
        title="Chi tiết đơn hàng"
        width={500}
        open={drawerOpen}
        onClose={() => {
          hiddenDrawer();
          navigate("/admin/order");
        }}
      >
        <div className="flex">
          <p className="font-semibold mr-[15px] ">Mã đơn hàng: </p>
          <p>{order?.orderId} </p>
        </div>
        <p className="font-semibold text-lg mt-[10px] ">
          Thông tin người đặt hàng:
        </p>
        <div>
          <div className="flex mt-[15px] ">
            <p className="font-semibold mr-[41px] ">Họ và tên: </p>
            <p>{order?.user?.name}</p>
          </div>
          <div className="flex mt-[5px] ">
            <p className="font-semibold mr-[38px]">Số điện thoại: </p>
            <p>{order?.user?.phone}</p>
          </div>
          <div className="flex mt-[5px] ">
            <p className="font-semibold mr-[68px]">Email: </p>
            <p>{order?.user?.email}</p>
          </div>
        </div>

        <p className="font-semibold text-lg mt-[20px] ">
          Danh sách cách khóa học:
        </p>
        <div className="mt-[5px]">
          {order?.courses?.map((courses: any) => {
            return (
              <li>
                {courses?.name} - {courses?.price.toLocaleString("en")} VND
              </li>
            );
          })}
        </div>
        <div className="flex mt-[30px]">
          <p className="font-semibold mr-[42px] ">Tổng tiền: </p>
          <p>{order?.totalPrice.toLocaleString("en")} VND </p>
        </div>
        <div className="flex mt-[10px]">
          <p className="font-semibold mr-[9px] ">Ngày đặt hàng: </p>
          <p>{formatDate(`${order?.orderDate}`)}</p>
        </div>
        <div className="flex mt-[10px]">
          <p className="font-semibold mr-[40px] ">Trạng thái: </p>
          <p>{order?.status} </p>
        </div>
      </Drawer>
    </div>
  );
}

export default DetailOrder;

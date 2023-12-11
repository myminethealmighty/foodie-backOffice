import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { refreshOrder } from "@/store/slices/orderSlice";
import { formatOrders } from "@/utils/generals";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const orderSeq = router.query.id;
  const addons = useAppSelector((state) => state.addon.items);
  const menus = useAppSelector((state) => state.menu.items);
  const tables = useAppSelector((state) => state.table.items);
  const orders = useAppSelector((state) => state.order.items);
  const orderItems = formatOrders(orders, addons, menus, tables);
  const tableId = Number(router.query.tableId);
  const table = tables.find((table) => table.id === tableId);
  const dispatch = useAppDispatch();
  let intervalId: number;

  useEffect(() => {
    if (orderSeq) {
      intervalId = window.setInterval(handleRefreshOrder, 10000);
    }
    return () => {
      window.clearInterval(intervalId);
    };
  }, [orderSeq]);

  const handleRefreshOrder = () => {
    dispatch(refreshOrder({ orderSeq: String(orderSeq) }));
  };

  if (!orders.length) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 3,
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          top: { xs: 0, md: -180, lg: -220 },
          padding: 0,
        }}
      >
        <Typography
          sx={{
            color: { xs: "success.main", md: "info.main" },
            fontSize: { xs: 20, md: 25 },
          }}
        >
          Table: {table?.name}
        </Typography>
        <Typography
          sx={{
            color: { xs: "success.main", md: "info.main" },
            fontSize: { xs: 20, md: 25 },
          }}
        >
          Total Price: {orders[0].totalPrice}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          top: { md: -140 },
        }}
      >
        {orderItems.map((orderItem) => {
          return (
            <OrderCard
              key={orderItem.itemId}
              orderItem={orderItem}
              isAdmin={false}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ActiveOrder;

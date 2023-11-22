import OrderCard from "@/components/OrderCard";
import { useAppSelector } from "@/store/hooks";
import { formatOrders } from "@/utils/generals";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const ActiveOrder = () => {
  const router = useRouter();
  const orderSeq = router.query.id;
  const addons = useAppSelector((state) => state.addon.items);
  const orders = useAppSelector((state) => state.order.items);
  const orderItems = formatOrders(orders, addons);

  return (
    <Box sx={{ zIndex: 5, position: "relative", top: 150 }}>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          p: 3,
          bgcolor: "#e8f6ef",
          borderRadius: 15,
          mx: 3,
        }}
      >
        OrderSeq: {orderSeq}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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

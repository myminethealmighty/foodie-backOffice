import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = ({ children }: Props) => {
  const router = useRouter();
  const { tableId } = router.query;

  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.items);
  const cartItems = useAppSelector((state) => state.cart.items);
  const isHome = router.pathname === "/order";
  const isActiveOrderPage = router.pathname.includes("active-order");

  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
    }
  }, [tableId]);

  return (
    <Box>
      {/* cartItems is array, cartItems.length */}
      <OrderAppHeader cartItemCount={cartItems.length} />
      <Box sx={{ position: "relative", top: isHome ? 240 : 0 }}>
        <Box sx={{ width: { xs: "100%", md: "80%", lg: "55%" }, m: "0 auto" }}>
          {children}
        </Box>
      </Box>
      {orders.length && !isActiveOrderPage && (
        <Box
          sx={{
            height: 50,
            width: "100vw",
            bgcolor: "primary.main",
            position: "fixed",
            bottom: 0,
            display: "flex",
            zIndex: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "secondary.main", userselect: "none" }}
          >
            You have active order. Click here to{" "}
            <span
              onClick={() =>
                router.push({
                  pathname: `/order/active-order/${orders[0].orderSeq}`,
                  query: router.query,
                })
              }
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              view
            </span>{" "}
            .
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrderLayout;

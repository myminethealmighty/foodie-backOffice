import { useAppSelector } from "@/store/hooks";
import { Alert, Box, Stack } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useRouter } from "next/router";

const OrderAppFooter = () => {
  const router = useRouter();
  const isActiveOrderPage = router.pathname.includes("active-order");
  const orders = useAppSelector((state) => state.order.items);
  const showActiveOrderFooterBar =
    !isActiveOrderPage &&
    orders.length > 0 &&
    orders.some(
      (item) =>
        item.status === ORDERSTATUS.COOKING ||
        item.status === ORDERSTATUS.PENDING
    );
  if (!showActiveOrderFooterBar) return null;
  return (
    <Box
      sx={{
        height: 50,
        width: "100vw",
        position: "fixed",
        bottom: 2,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        zIndex: 5,
      }}
    >
      <Stack spacing={2} sx={{ width: { xs: '"90%"', sm: '"50%"' } }}>
        <Alert
          severity="info"
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: 16,
            bgcolor: "primary.main",
            color: "white",
          }}
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
          </span>
          .
        </Alert>
      </Stack>
    </Box>
  );
};

export default OrderAppFooter;

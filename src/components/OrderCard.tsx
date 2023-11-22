import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrder } from "@/store/slices/orderSlice";
import { OrderItem } from "@/types/order";
import { Box, Card, MenuItem, Select, Typography } from "@mui/material";
import { AddonCategory, ORDERSTATUS } from "@prisma/client";

interface Props {
  orderItem: OrderItem;
  isAdmin: boolean;
}

const OrderCard = ({ orderItem, isAdmin }: Props) => {
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  const dispatch = useAppDispatch();

  const handleOrderStatusUpdate = (status: ORDERSTATUS) => {
    dispatch(updateOrder({ itemId: orderItem.itemId, status }));
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 250,
        height: 250,
        py: 1,
        px: 2,
        mt: 2,
        mr: 2,
      }}
    >
      <Box
        sx={{
          height: 250 * 0.15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid lightgray",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Item ID : </Typography>
        <Typography>{orderItem.itemId}</Typography>
      </Box>
      <Box
        sx={{
          height: 250 * 0.6,
          overflow: "scroll",
        }}
      >
        {orderItem.orderAddons.map((orderAddon) => {
          const addonCategory = addonCategories.find(
            (item) => item.id === orderAddon.addonCategoryId
          ) as AddonCategory;
          return (
            <Box key={orderAddon.addonCategoryId} sx={{ mb: 2 }}>
              <Typography>{addonCategory.name}</Typography>
              {orderAddon.addons.map((addon) => {
                return (
                  <Typography
                    key={addon.id}
                    sx={{
                      fontSize: 14,
                      ml: 2,
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    {addon.name}
                  </Typography>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          height: 250 * 0.15,
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid lightgray",
          pt: 1,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Status : </Typography>
        {isAdmin ? (
          <>
            <Select
              value={orderItem.status}
              onChange={(evt) =>
                handleOrderStatusUpdate(evt.target.value as ORDERSTATUS)
              }
              sx={{ height: 30 }}
            >
              <MenuItem value={ORDERSTATUS.PENDING}>
                {ORDERSTATUS.PENDING}
              </MenuItem>
              <MenuItem value={ORDERSTATUS.COOKING}>
                {ORDERSTATUS.COOKING}
              </MenuItem>
              <MenuItem value={ORDERSTATUS.COMPLETE}>
                {ORDERSTATUS.COMPLETE}
              </MenuItem>
            </Select>
          </>
        ) : (
          <Typography>{orderItem.status}</Typography>
        )}
      </Box>
    </Card>
  );
};

export default OrderCard;

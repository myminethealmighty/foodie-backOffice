import { useAppSelector } from "@/store/hooks";
import { OrderItem } from "@/types/order";
import { Box, Card, MenuItem, Select, Typography } from "@mui/material";
import { AddonCategory, ORDERSTATUS } from "@prisma/client";

interface Props {
  orderItem: OrderItem;
  isAdmin: boolean;
  handleOrderStatusUpdate?: (itemId: string, status: ORDERSTATUS) => void;
}

const OrderCard = ({ orderItem, isAdmin, handleOrderStatusUpdate }: Props) => {
  const addonCategories = useAppSelector((state) => state.addonCategory.items);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 250,
        height: 280,
        mt: 2,
        mr: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
          height: 40,
          px: 2,
        }}
      >
        <Typography>{orderItem.menu.name}</Typography>
        <Typography>{orderItem.table.name}</Typography>
      </Box>
      <Box sx={{ px: 2 }}>
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
                  handleOrderStatusUpdate &&
                  handleOrderStatusUpdate(
                    orderItem.itemId,
                    evt.target.value as ORDERSTATUS
                  )
                }
                sx={{ height: 30 }}
              >
                cl
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
      </Box>
    </Card>
  );
};

export default OrderCard;

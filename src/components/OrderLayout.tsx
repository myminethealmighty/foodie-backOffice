import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GridLoader } from "react-spinners";
import OrderAppFooter from "./OrderAppFooter";
import OrderAppHeader from "./OrderAppHeader";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = ({ children }: Props) => {
  const router = useRouter();
  const { tableId } = router.query;
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
    }
  }, [tableId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "auto",
        bgcolor: "info.main",
        pb: { xs: 10, md: 0 },
      }}
    >
      <OrderAppHeader />
      <Box>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: 300,
            }}
          >
            {/* <RingLoader color={"primary.main"} size={100} /> */}
            <GridLoader color="#1B9C85" size={10} />
          </Box>
        ) : (
          children
        )}
      </Box>
      <OrderAppFooter />
    </Box>
  );
};

export default OrderLayout;

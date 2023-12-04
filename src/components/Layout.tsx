import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import BackofficeLayout from "./BackofficeLayout";
import OrderLayout from "./OrderLayout";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { tableId } = router.query;
  const isOrderApp = tableId;
  const theme = useTheme();
  const isBackofficeApp = router.pathname.includes("/backoffice");

  if (isOrderApp) {
    return (
      <Box sx={{ height: "100%" }}>
        <OrderLayout>{children}</OrderLayout>
      </Box>
    );
  }
  if (isBackofficeApp) {
    return (
      <Box
        sx={{
          height: "100%",
          bgcolor:
            theme.palette.mode === "light" ? "info.main" : "success.dark",
        }}
      >
        <BackofficeLayout>{children}</BackofficeLayout>
      </Box>
    );
  }
  return <Box>{children}</Box>;
};
export default Layout;

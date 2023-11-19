import { Box } from "@mui/material";
import { useRouter } from "next/router";

const ActiveOrder = () => {
  const router = useRouter();
  const orderSeq = router.query.id;
  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        p: 3,
        bgcolor: "#e8f6ef",
        borderRadius: 15,
        zIndex: 5,
        mx: 3,
        position: "relative",
        top: 150,
      }}
    >
      OrderSeq: {orderSeq}
    </Box>
  );
};

export default ActiveOrder;

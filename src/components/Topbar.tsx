import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Topbar = () => {
  const { data } = useSession();
  const { selectedLocation } = useAppSelector((state) => state.location);
  return (
    <Box
      sx={{
        height: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "success.main",
        px: 2,
      }}
    >
      <Box sx={{ height: 60 }}>
        <Image src={"/logo.png"} width={100} height={60} alt="logo" />
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography variant="h5" color={"secondary"}>
          Awa Sarr
        </Typography>
        <Typography sx={{ fontSize: 12 }} color={"secondary"}>
          ({selectedLocation?.name})
        </Typography>
      </Box>
      {data ? (
        <Box>
          <Button
            variant="contained"
            onClick={() => signOut({ callbackUrl: "/backoffice" })}
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <span />
      )}
    </Box>
  );
};

export default Topbar;

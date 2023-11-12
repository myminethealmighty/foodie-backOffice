import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Topbar = () => {
  const { data } = useSession();
  return (
    <Box
      sx={{
        height: 40,
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

      <Typography variant="h5" color={"secondary"}>
        Awa Sarr
      </Typography>

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

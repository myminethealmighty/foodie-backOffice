import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../assets/logo.png";

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
        <Image
          src={logo}
          alt="logo"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

      <Typography variant="h5" color={"secondary"}>
        Awa Sarr
      </Typography>

      {data ? (
        <Box>
          <Button
            variant="contained"
            onClick={() => signOut({ callbackUrl: "/" })}
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

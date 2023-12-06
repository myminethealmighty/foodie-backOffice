import { useAppSelector } from "@/store/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import SideBar from "./Sidebar";

const Topbar = () => {
  const { theme } = useAppSelector((state) => state.app);
  const { data } = useSession();
  const { selectedLocation } = useAppSelector((state) => state.location);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: theme === "light" ? "success.dark" : "primary.dark",
        px: 2,
        flexGrow: 1,
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
          {selectedLocation?.name}
        </Typography>
      </Box>

      {data ? (
        <Box>
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: "30px", color: "info.main" }} />
          </IconButton>
          <Button
            sx={{ display: { xs: "none", sm: "block" } }}
            variant="contained"
            onClick={() => signOut({ callbackUrl: "/backoffice" })}
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <span />
      )}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            bgcolor: "info.main",
            py: 1,
            pl: 1,
            borderBottomRightRadius: "20px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Avatar alt="Cindy Baker" src="/user-profile.jpg" />
            <Typography
              sx={{ color: "primary.main", fontSize: 16, fontWeight: "bold" }}
            >
              Susan
            </Typography>
          </Stack>
        </Box>
        <SideBar />
      </Drawer>
    </Box>
  );
};

export default Topbar;

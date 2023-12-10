import { Box, Slide, Typography } from "@mui/material";
import Image from "next/image";

const Header = () => {
  return (
    <Box>
      {/* Responsive Mobile */}
      <Box
        sx={{
          width: "100vw",
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          alignItems: "center",
          position: "fixed",
          top: 0,
        }}
      >
        <Slide
          direction="left"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Box
            sx={{
              position: "absolute",
              right: 0,
              display: { xs: "block", md: "none" },
            }}
          >
            <Image
              src={"/piggy-cooking.png"}
              alt="header-image"
              width={160}
              height={160}
            />
          </Box>
        </Slide>
        <Box
          sx={{
            bgcolor: "success.main",
            height: 60,
            width: "100vw",
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "info.main", ml: 6 }}
          >
            Awa Sarr
          </Typography>
        </Box>
      </Box>

      {/* Responsive Web */}

      <Box
        sx={{
          width: "100vw",
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "center",
          minHeight: 300,
          position: "fixed",
          top: 0,
        }}
      >
        <Image
          src="/header.svg"
          alt="header-image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", display: "" }}
        />

        <Slide
          direction="left"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Box
            sx={{
              position: "absolute",
              right: 0,
              display: { xs: "none", md: "block" },
            }}
          >
            <Image
              src={"/piggy-cooking.png"}
              alt="header-image"
              width={350}
              height={350}
            />
          </Box>
        </Slide>

        <Typography
          variant="h2"
          sx={{
            display: { xs: "none", sm: "block" },
            position: "absolute",
            fontWeight: "bold",
            color: "info.main",
            mt: 4,
          }}
        >
          Awa Sarr
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;

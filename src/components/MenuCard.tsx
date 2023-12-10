import PaidIcon from "@mui/icons-material/Paid";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { Menu } from "@prisma/client";
import Link from "next/link";

interface Props {
  menu: Menu;
  href: string | object;
  isAvailable?: boolean;
}

const MenuCard = ({ menu, href, isAvailable }: Props) => {
  return (
    <Link
      key={menu.id}
      href={href}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "20px",
      }}
    >
      <Tooltip arrow title={isAvailable === false ? "Unavailable" : ""}>
        <Card
          sx={{
            width: { xs: 150, sm: 200 },
            height: { xs: 150, sm: 200 },
            pb: { xs: 2, sm: 2 },
            opacity: isAvailable === false ? 0.4 : 1,
          }}
        >
          <CardMedia
            sx={{ height: { xs: 100, sm: 140 }, objectFit: "contain" }}
            image={menu.assetUrl || "/default-menu.png"}
            component={"div"}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 1, sm: 2 },
            }}
          >
            <Typography noWrap sx={{ fontSize: { xs: 16, sm: 18 } }}>
              {menu.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <PaidIcon color="success" />
              <Typography
                sx={{ m: 0, fontWeight: "bold", fontStyle: "italic" }}
              >
                {menu.price}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Tooltip>
    </Link>
  );
};

export default MenuCard;

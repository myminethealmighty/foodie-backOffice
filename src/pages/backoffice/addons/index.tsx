import ItemCard from "@/components/ItemCard";
import NewAddon from "@/components/NewAddon";
import { useAppSelector } from "@/store/hooks";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AddonPage = () => {
  const [open, setOpen] = useState(false);
  const addons = useAppSelector((state) => state.addon.items);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          + New
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {addons.map((item) => (
          <ItemCard
            href={`/backoffice/addons/${item.id}`}
            key={item.id}
            title={item.name}
            icon={<EggIcon />}
          />
        ))}
      </Box>
      <NewAddon open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonPage;

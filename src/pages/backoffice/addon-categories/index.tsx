import ItemCard from "@/components/ItemCard";
import NewAddonCategory from "@/components/NewAddonCategory";
import { useAppSelector } from "@/store/hooks";
import ClassIcon from "@mui/icons-material/Class";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AddonCategoryPage = () => {
  const [open, setOpen] = useState(false);
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
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
        {addonCategories.map((item) => (
          <ItemCard
            href={`/backoffice/addon-categories/${item.id}`}
            key={item.id}
            title={item.name}
            icon={<ClassIcon />}
          />
        ))}
      </Box>
      <NewAddonCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonCategoryPage;

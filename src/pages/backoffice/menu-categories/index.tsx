import ItemCard from "@/components/ItemCard";
import NewMenuCategory from "@/components/NewMenuCategory";
import { useAppSelector } from "@/store/hook";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const disabledLocationMenuCategories = useAppSelector(
    (state) => state.disabledLocationMenuCategory.items
  );
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
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menuCategories.map((item) => {
          const exit = disabledLocationMenuCategories.find(
            (disabledLocationMenuCategory) =>
              disabledLocationMenuCategory.locationId ===
                Number(localStorage.getItem("selectedLocationId")) &&
              disabledLocationMenuCategory.menuCategoryId === item.id
          );
          const isAvailable = exit ? false : true;
          return (
            <ItemCard
              href={`/backoffice/menu-categories/${item.id}`}
              key={item.id}
              title={item.name}
              icon={<CategoryIcon />}
              isAvailable={isAvailable}
            />
          );
        })}
      </Box>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default MenuCategoriesPage;

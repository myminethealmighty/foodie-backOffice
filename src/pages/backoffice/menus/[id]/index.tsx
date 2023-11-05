import { useAppDispatch, useAppSelector } from "@/store/hook";
import { removeAddonCategory } from "@/store/slices/addonCategorySlice";
import { removeMenuAddonCategoryById } from "@/store/slices/menuAddonCategorySlice";
import { deleteMenus, updateMenus } from "@/store/slices/menuSlice";
import { UpdateMenusOptions } from "@/types/menu";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetail = () => {
  const router = useRouter();
  const menuId = Number(router.query.id);
  const menus = useAppSelector((state) => state.menu.items);
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const menuAddonCategories = useAppSelector((state) => state.menuAddonCategory.items);
  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );
  const menu = menus.find((item) => item.id === menuId);
  const currentMenuCategoryMenu = menuCategoryMenus.filter(
    (item) => item.menuId === menuId
  );
  const menuCategoryIds = currentMenuCategoryMenu.map(
    (item) => item.menuCategoryId
  );
  const [data, setData] = useState<UpdateMenusOptions>();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (menu) {
      setData({ ...menu, menuCategoryIds });
    }
  }, [menu]);

  if (!menu || !data) return null;

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setData({ ...data, id: menuId, menuCategoryIds: selectedIds });
  };

  // const handleRemoveCategory = (id: number) => {
  //   const updatedIds = data.menuCategoryIds.filter((item) => item !== id);
  //   setData({ ...data, menuCategoryIds: updatedIds });
  // };

  const handleDeleteMenu = () => {
    dispatch(
      deleteMenus({
        id: menuId,
        onSuccess: () => {
          const addonCategoryIds = menuAddonCategories.filter(item => item.menuId === menuId).map(item => item.addonCategoryId);
          addonCategoryIds.forEach((addonCategoryId) => {
            const entries = menuAddonCategories.filter(item => item.addonCategoryId === addonCategoryId);
            if (entries.length === 1) {
              const menuAddonCategoryId = entries[0].id;
              dispatch(removeAddonCategory({ id: addonCategoryId }));
              dispatch(removeMenuAddonCategoryById({ id: menuAddonCategoryId }));
            }
          });


          router.push("/backoffice/menus");
        },
      })
    );
  };

  const handleUpdateMenu = () => {
    dispatch(updateMenus(data));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <TextField
        defaultValue={menu.name}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: menuId, name: evt.target.value })
        }
      />
      <TextField
        defaultValue={menu.price}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: menuId, price: Number(evt.target.value) })
        }
      />
      <FormControl fullWidth>
        <InputLabel>Menu Category</InputLabel>
        <Select
          multiple
          value={data.menuCategoryIds}
          label="Menu Category"
          onChange={handleOnChange}
          renderValue={(selectedMenuCategoryIds) => {
            return selectedMenuCategoryIds
              .map((selectedMenuCategoryId) => {
                return menuCategories.find(
                  (item) => item.id === selectedMenuCategoryId
                ) as MenuCategory;
              })
              .map((item) => (
                <Chip
                  key={item && item.id}
                  label={item && item.name}
                  sx={{ mr: 1 }}
                />
              ));
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {menuCategories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={data.menuCategoryIds.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{ mt: 2, width: "fit-content" }}
        onClick={handleUpdateMenu}
      >
        Update
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm delete menu</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this menu?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteMenu}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuDetail;

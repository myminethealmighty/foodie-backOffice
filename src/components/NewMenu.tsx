// import { useAppSelector } from "@/store/hook";
// import {
//   Box,
//   Checkbox,
//   Chip,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   TextField,
// } from "@mui/material";
// import { MenuCategory } from "@prisma/client";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";

// interface Props {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }

// const NewMenu = ({ open, setOpen }: Props) => {
//   const menuCategories = useAppSelector((state) => state.menuCategory.items);
//   const [selectedMenuCategoryIds, setSelectedMenuCategoryIds] = useState<
//     number[]
//   >([]);

//   const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
//     const selectedIds = evt.target.value as number[];
//     setSelectedMenuCategoryIds(selectedIds);
//   };

//   const handleRemoveCategory = (id: number) => {
//     const updatedIds = selectedMenuCategoryIds.filter((item) => item !== id);
//     setSelectedMenuCategoryIds(updatedIds);
//   };

//   useEffect(() => {
//     console.log(selectedMenuCategoryIds);
//   }, [selectedMenuCategoryIds]);

//   return (
//     <Dialog open={open} onClose={() => setOpen(false)}>
//       <DialogTitle>Create Menu</DialogTitle>
//       <DialogContent>
//         <TextField placeholder="Name" sx={{ mr: 3 }} />
//         <TextField placeholder="Price" />
//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel>Menu Category</InputLabel>
//           <Select
//             multiple
//             value={selectedMenuCategoryIds}
//             onChange={handleOnChange}
//             label="Menu Category"
//             sx={{ width: 410 }}
//             MenuProps={{
//               PaperProps: {
//                 style: {
//                   maxHeight: 48 * 4.5 + 8,
//                   width: 250,
//                 },
//               },
//             }}
//             renderValue={(selected) => (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                 {selected.map((id) => {
//                   const menuCategory = menuCategories.find(
//                     (item) => item.id === id
//                   ) as MenuCategory;
//                   return (
//                     <Chip
//                       key={id}
//                       label={menuCategory.name}
//                       onMouseDown={(event) => {
//                         event.stopPropagation();
//                       }}
//                       onDelete={() => handleRemoveCategory(id)}
//                     />
//                   );
//                 })}
//               </Box>
//             )}
//           >
//             {menuCategories.map((item) => (
//               <MenuItem key={item.id} value={item.id}>
//                 <Checkbox checked={selectedMenuCategoryIds.includes(item.id)} />
//                 {item.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default NewMenu;

import { useAppSelector } from "@/store/hook";
import { CreateMenusOptions } from "@/types/menu";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
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
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultNewMenu = {
  name: "",
  price: 0,
  menuCategoryIds: [],
};

const NewMenu = ({ open, setOpen }: Props) => {
  const [newMenu, setNewMenu] = useState<CreateMenusOptions>(defaultNewMenu);
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  // const dispatch = useAppDispatch();

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setNewMenu({ ...newMenu, menuCategoryIds: selectedIds });
  };

  const handleCreateMenu = () => {
    console.log(newMenu);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setNewMenu(defaultNewMenu);
        setOpen(false);
      }}
    >
      <DialogTitle>Create new menu</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", width: 400 }}
      >
        <TextField
          placeholder="Name"
          sx={{ mb: 2 }}
          onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
        />
        <TextField
          placeholder="Price"
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewMenu({ ...newMenu, price: Number(evt.target.value) })
          }
        />
        <FormControl fullWidth>
          <InputLabel>Menu Category</InputLabel>
          <Select
            multiple
            value={newMenu.menuCategoryIds}
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
                  <Chip key={item.id} label={item.name} sx={{ mr: 1 }} />
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
                <Checkbox checked={newMenu.menuCategoryIds.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!newMenu.name || !newMenu.menuCategoryIds.length}
            onClick={handleCreateMenu}
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewMenu;

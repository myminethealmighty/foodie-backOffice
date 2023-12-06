import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menuSlice";
import { CreateMenusOptions } from "@/types/menu";
import { config } from "@/utils/config";
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
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import FileDropZone from "./FileDropZone";

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
  const [menuImage, setMenuImage] = useState<File>();
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const dispatch = useAppDispatch();

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedId = evt.target.value as number[];
    setNewMenu({ ...newMenu, menuCategoryIds: selectedId });
  };

  const handleCreateMenu = async () => {
    const newMenuPayload = { ...newMenu };
    if (menuImage) {
      const formData = new FormData();
      formData.append("files", menuImage);
      const response = await fetch(`${config.backofficeApiUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const { assetUrl } = await response.json();
      newMenuPayload.assetUrl = assetUrl;
    }
    dispatch(
      createMenu({ ...newMenuPayload, onSuccess: () => setOpen(false) })
    );
  };

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setNewMenu(defaultNewMenu);
      }}
    >
      <DialogTitle>Create Menu</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
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
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Menu Category</InputLabel>
          <Select
            multiple
            value={newMenu.menuCategoryIds}
            onChange={handleOnChange}
            label="Menu Category"
            sx={{ width: 400 }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
            // renderValue={(selected) => (
            //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            //     {selected.map((id) => {
            //       const menuCategory = menuCategories.find(
            //         (item) => item.id === id
            //       ) as MenuCategory;
            //       return (
            //         <Chip
            //           key={id}
            //           label={menuCategory.name}
            //           onMouseDown={(event) => {
            //             event.stopPropagation();
            //           }}
            //           onDelete={() => handleRemoveCategory(id)}
            //         />
            //       );
            //     })}
            //   </Box>
            // )}
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
          >
            {menuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={newMenu.menuCategoryIds.includes(item.id)} />
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2 }}>
          <FileDropZone onFileSelected={onFileSelected} />
          {menuImage && (
            <Chip
              sx={{ mt: 2 }}
              label={menuImage.name}
              onDelete={() => setMenuImage(undefined)}
            />
          )}
        </Box>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateMenu}
            variant="contained"
            disabled={!newMenu.name || !newMenu.menuCategoryIds.length}
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewMenu;

// import { useAppSelector } from "@/store/hook";
// import { CreateMenusOptions } from "@/types/menu";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Chip,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   ListItemText,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   TextField,
// } from "@mui/material";
// import { MenuCategory } from "@prisma/client";
// import { Dispatch, SetStateAction, useState } from "react";

// interface Props {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }

// const defaultNewMenu = {
//   name: "",
//   price: 0,
//   menuCategoryIds: [],
// };

// const NewMenu = ({ open, setOpen }: Props) => {
//   const [newMenu, setNewMenu] = useState<CreateMenusOptions>(defaultNewMenu);
//   const menuCategories = useAppSelector((state) => state.menuCategory.items);
//   // const dispatch = useAppDispatch();

//   const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
//     const selectedIds = evt.target.value as number[];
//     setNewMenu({ ...newMenu, menuCategoryIds: selectedIds });
//   };

//   const handleCreateMenu = () => {
//     console.log(newMenu);
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={() => {
//         setNewMenu(defaultNewMenu);
//         setOpen(false);
//       }}
//     >
//       <DialogTitle>Create new menu</DialogTitle>
//       <DialogContent
//         sx={{ display: "flex", flexDirection: "column", width: 400 }}
//       >
//         <TextField
//           placeholder="Name"
//           sx={{ mb: 2 }}
//           onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
//         />
//         <TextField
//           placeholder="Price"
//           sx={{ mb: 2 }}
//           onChange={(evt) =>
//             setNewMenu({ ...newMenu, price: Number(evt.target.value) })
//           }
//         />
//         <FormControl fullWidth>
//           <InputLabel>Menu Category</InputLabel>
//           <Select
//             multiple
//             value={newMenu.menuCategoryIds}
//             label="Menu Category"
//             onChange={handleOnChange}
//             renderValue={(selectedMenuCategoryIds) => {
//               return selectedMenuCategoryIds
//                 .map((selectedMenuCategoryId) => {
//                   return menuCategories.find(
//                     (item) => item.id === selectedMenuCategoryId
//                   ) as MenuCategory;
//                 })
//                 .map((item) => (
//                   <Chip key={item.id} label={item.name} sx={{ mr: 1 }} />
//                 ));
//             }}
//             MenuProps={{
//               PaperProps: {
//                 style: {
//                   maxHeight: 48 * 4.5 + 8,
//                   width: 250,
//                 },
//               },
//             }}
//           >
//             {menuCategories.map((item) => (
//               <MenuItem key={item.id} value={item.id}>
//                 <Checkbox checked={newMenu.menuCategoryIds.includes(item.id)} />
//                 <ListItemText primary={item.name} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             variant="contained"
//             sx={{ mr: 2 }}
//             onClick={() => setOpen(false)}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             disabled={!newMenu.name || !newMenu.menuCategoryIds.length}
//             onClick={handleCreateMenu}
//           >
//             Confirm
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default NewMenu;

// CHIP TEST

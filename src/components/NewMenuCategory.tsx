import { useAppDispatch } from "@/store/hook";
import { createMenuCategory } from "@/store/slices/menuCategorySlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMenuCategory = ({ open, setOpen }: Props) => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const onSuccess = () => {
    setOpen(false);
  };

  const handleCreateMenuCategory = () => {
    const selectedLocationId = localStorage.getItem("selectedLocationId");
    dispatch(
      createMenuCategory({
        name,
        locationId: Number(selectedLocationId),
        onSuccess,
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Menu Category</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="Name"
            variant="outlined"
            sx={{ width: "100%" }}
            autoFocus
            onChange={(evt) => setName(evt.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ mr: 1, mb: 1 }}>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreateMenuCategory}
          disabled={!name}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMenuCategory;

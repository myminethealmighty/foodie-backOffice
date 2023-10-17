import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMenuCategory = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Menu Category</DialogTitle>
      <DialogContent>
        <h1>Dialog New Menu</h1>
      </DialogContent>
    </Dialog>
  );
};

export default NewMenuCategory;

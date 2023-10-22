import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewAddonCategory = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Addon Category</DialogTitle>
      <DialogContent>
        <h1>Dialog New Addon Category</h1>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddonCategory;

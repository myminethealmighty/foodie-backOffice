import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewTable = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Table </DialogTitle>
      <DialogContent>
        <h1>Dialog New Table</h1>
      </DialogContent>
    </Dialog>
  );
};

export default NewTable;

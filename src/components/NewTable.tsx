import { useAppDispatch } from "@/store/hook";
import { createTable } from "@/store/slices/tableSlice";
import { CreateTableOptions } from "@/types/table";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultNewTable = {
  name: "",
  locationId: undefined,
};


const  NewTable = ({ open, setOpen }: Props) => {
  const [newTable, setNewTable] = useState<CreateTableOptions>(defaultNewTable);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    setNewTable({...newTable, locationId:Number(localStorage.getItem("selectedLocationId"))})
  },[])

const handleCreateTable = ()=>{
  dispatch(createTable({...newTable,onSuccess:()=> setOpen(false)}))
}
  return (
    <Dialog open={open} onClose={() => {setOpen(false)
    setNewTable(defaultNewTable )}}>
      <DialogTitle>Create Table </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" ,width: 400}}>
        <TextField
          placeholder="Name"
          sx={{ mb: 2 }}
          onChange={(evt) => setNewTable({ ...newTable, name: evt.target.value })}
        />
        
         
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTable}
            variant="contained"
            disabled={!newTable.name }
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewTable;

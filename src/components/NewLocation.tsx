import { useAppDispatch } from "@/store/hooks";
import { createLocation } from "@/store/slices/locationSlice";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewLocation = ({ open, setOpen }: Props) => {
  const [newLocation, setNewLocation] = useState({ name: "", address: "" });
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "400px",
          },
        },
      }}
    >
      <DialogTitle>Create Location </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            placeholder="Name"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
          />
          <TextField
            placeholder="Address"
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={newLocation.name && newLocation.address ? false : true}
              variant="contained"
              onClick={() =>
                dispatch(
                  createLocation({
                    ...newLocation,
                    onSuccess: () => setOpen(false),
                  })
                )
              }
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewLocation;

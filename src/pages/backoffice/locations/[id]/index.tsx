/* eslint-disable react-hooks/rules-of-hooks */
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { deleteLocation, updateLocation } from "@/store/slices/locationSlice";
import { UpdateLocationOptions } from "@/types/location";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocationDetail = () => {
  const router = useRouter();
  const locationId = Number(router.query.id);
  const locations = useAppSelector((state) => state.location.items);
  const location = locations.find((item) => item.id === locationId);
  const [data, setData] = useState<UpdateLocationOptions>();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location) {
      setData({
        id: location.id,
        name: location.name,
        companyId: location.companyId,
      });
    }
  }, [location]);

  if (!location || !data) return null;




  const handleDeleteLocation = () => {
    dispatch(
      deleteLocation({
        id: location.id,
        onSuccess: () => router.push("/backoffice/locations"),
      })
    );
  };

  const handleUpdateLocation = () => {
    dispatch(updateLocation(data));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <TextField
        defaultValue={data.name}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: location.id, name: evt.target.value })
        }
      />

      <Button
        variant="contained"
        sx={{ mt: 2, width: "fit-content" }}
        onClick={handleUpdateLocation}
      >
        Update
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm delete location</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this location?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteLocation}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LocationDetail;

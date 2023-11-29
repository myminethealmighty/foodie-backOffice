import ItemCard from "@/components/ItemCard";
import NewLocation from "@/components/NewLocation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedLocation } from "@/store/slices/locationSlice";
import PlaceIcon from "@mui/icons-material/Place";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const LocationPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { items: locations, selectedLocation } = useAppSelector(
    (state) => state.location
  );
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          + New
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {locations.map((item) => (
          <ItemCard
            key={item.id}
            title={item.name}
            icon={<PlaceIcon />}
            selected={item.id === selectedLocation?.id}
            onClick={() => {
              dispatch(setSelectedLocation(item));
              localStorage.setItem("selectedLocationId", String(item.id));
            }}
          />
        ))}
      </Box>
      <NewLocation open={open} setOpen={setOpen} />
    </Box>
  );
};

export default LocationPage;

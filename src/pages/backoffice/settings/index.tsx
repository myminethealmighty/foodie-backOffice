import { useAppSelector } from "@/store/hook";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Location } from "@prisma/client";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const locations = useAppSelector((state) => state.location.items);
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  useEffect(() => {
    const locationId = localStorage.getItem("selectedLocationId");
    if (locationId) {
      const selectedLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setSelectedLocation(selectedLocation);
    } else {
      const firstLocation = locations[0];
      setSelectedLocation(firstLocation);
    }
  }, []);

  const handleLocationChange = (evt: SelectChangeEvent<number>) => {
    const selectedLocation = locations.find(
      (item) => item.id === evt.target.value
    );

    if (selectedLocation) {
      setSelectedLocation(selectedLocation);
      localStorage.setItem("selectedLocationId", String(selectedLocation.id));
    }
  };

  if (!selectedLocation) return null;

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Location</InputLabel>
        <Select
          value={selectedLocation.id}
          label="Location"
          onChange={handleLocationChange}
        >
          {locations.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SettingsPage;

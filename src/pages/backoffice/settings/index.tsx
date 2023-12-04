/* eslint-disable react-hooks/rules-of-hooks */
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/slices/appSlice";
import { updateCompany } from "@/store/slices/companySlice";
import { UpdateCompanyOptions } from "@/types/company";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const TableDetail = () => {
  const { theme } = useAppSelector((state) => state.app);
  const company = useAppSelector((state) => state.company.item);
  const [data, setData] = useState<UpdateCompanyOptions>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (company) {
      setData({
        id: company.id,
        name: company.name,
        street: company.street,
        township: company.township,
        city: company.city,
      });
    }
  }, [company]);

  if (!company || !data) return null;

  const handleUpdateCompany = () => {
    dispatch(updateCompany(data));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        defaultValue={data.name}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: company.id, name: evt.target.value })
        }
      />
      <TextField
        defaultValue={data.street}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: company.id, street: evt.target.value })
        }
      />
      <TextField
        defaultValue={data.township}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: company.id, township: evt.target.value })
        }
      />
      <TextField
        defaultValue={data.city}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: company.id, city: evt.target.value })
        }
      />
      <FormControlLabel
        control={
          <Switch
            defaultChecked
            onChange={(evt, value) => {
              const newTheme = value ? "dark" : "light";
              dispatch(setTheme(newTheme));
            }}
          />
        }
        label={theme === "light" ? "Light" : "Dark"}
      />
      <Button
        variant="contained"
        sx={{ mt: 2, width: "fit-content" }}
        onClick={handleUpdateCompany}
      >
        Update
      </Button>
    </Box>
  );
};

export default TableDetail;

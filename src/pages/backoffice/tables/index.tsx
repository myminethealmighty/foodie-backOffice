import ItemCard from "@/components/ItemCard";
import NewTable from "@/components/NewTable";
import { useAppSelector } from "@/store/hooks";
import TableBarIcon from "@mui/icons-material/TableBar";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const TablePage = () => {
  const [open, setOpen] = useState(false);
  const tables = useAppSelector((state) => state.table.items);

  const handleQRImagePrint = (assetUrl: string) => {
    const imageWindow = window.open("");
    imageWindow?.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print();window.close()" /></body></html>`
    );
    imageWindow?.document.close();
  };

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
        {tables.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ItemCard
              href={`/backoffice/tables/${item.id}`}
              key={item.id}
              title={item.name}
              icon={<TableBarIcon fontSize="large" />}
            />
            <Button
              variant="contained"
              onClick={() => handleQRImagePrint(item.assetUrl)}
            >
              Print QR
            </Button>
          </Box>
        ))}
      </Box>
      <NewTable open={open} setOpen={setOpen} />
    </Box>
  );
};

export default TablePage;

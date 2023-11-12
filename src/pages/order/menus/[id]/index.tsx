import AddonCategories from "@/components/AddonCategories";
import QuantitySelector from "@/components/QuantitySelector";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const MenuDetail = () => {
  const { query, isReady } = useRouter();
  const menuId = Number(query.id);
  const menus = useAppSelector((state) => state.menu.items);
  const menu = menus.find((item) => item.id === menuId);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddonIds, setSelectedAddonIds] = useState<number[]>([]);

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  if (!isReady || !menu) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            margin: "auto",
            border: 6,
            borderColor: "secondary.main",
          }}
        >
          <Image
            src={menu.assetUrl || "/default-menu.png"}
            alt="menu-image"
            width={140}
            height={140}
            style={{
              borderRadius: "50%",
              margin: "0 auto",
            }}
          />
        </Box>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AddonCategories
            menuId={menuId}
            selectedAddonIds={selectedAddonIds}
            setSelectedAddonIds={setSelectedAddonIds}
          />
          <QuantitySelector
            value={quantity}
            onDecrease={handleQuantityDecrease}
            onIncrease={handleQuantityIncrease}
          />
          {/* <Button
            variant="contained"
            disabled={isDisabled}
            onClick={handleAddToCart}
            sx={{
              width: "fit-content",
              mt: 3,
            }}
          >
            Add to cart
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default MenuDetail;

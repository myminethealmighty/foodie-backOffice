import AddonCategories from "@/components/AddonCategories";
import QuantitySelector from "@/components/QuantitySelector";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { Addon } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetail = () => {
  const { query, isReady } = useRouter();
  const menuId = Number(query.id);
  const menus = useAppSelector((state) => state.menu.items);
  const menu = menus.find((item) => item.id === menuId);
  const [quantity, setQuantity] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  const allMenuAddonCategories = useAppSelector(
    (state) => state.menuAddonCategory.items
  );
  const addonCategoryIds = allMenuAddonCategories
    .filter((item) => item.menuId === menuId)
    .map((item) => item.addonCategoryId);

  const addonCategories = useAppSelector(
    (state) => state.addonCategory.items
  ).filter((item) => addonCategoryIds.includes(item.id));

  useEffect(() => {
    /*
      1. menuId --> addonCategories?
      2. isRequired addonCategories how many?
      3. selectedAddons -> parent required --> []
    */
    const requiredAddonCategories = addonCategories.filter(
      (item) => item.isRequired
    );
    const selectedRequiredAddons = selectedAddons.filter((selectedAddon) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === selectedAddon.addonCategoryId
      );
      return addonCategory?.isRequired ? true : false;
    });

    const isDisabled =
      requiredAddonCategories.length !== selectedRequiredAddons.length;

    setIsDisabled(isDisabled);
    // Need to add addonCategories in dependencies array coz store is not ready in the first place
  }, [selectedAddons, addonCategories]);

  {
    /* not Selected (AddonIds) Because Selected (Addon) Object is needed in CartItem to include Name, Price, isRequired ... (EP-41)*/
  }

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleAddToCart = () => {};

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
          {/* not Selected (AddonIds) Because Selected (Addon) Object is needed to include Name, Price, isRequired ... */}
          <AddonCategories
            addonCategories={addonCategories}
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
          />
          <QuantitySelector
            value={quantity}
            onDecrease={handleQuantityDecrease}
            onIncrease={handleQuantityIncrease}
          />
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={handleAddToCart}
            sx={{
              width: "fit-content",
              mt: 3,
            }}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuDetail;

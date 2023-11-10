import { Box } from "@mui/material";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = ({ children }: Props) => {
  return <Box>{children}</Box>;
};

export default OrderLayout;

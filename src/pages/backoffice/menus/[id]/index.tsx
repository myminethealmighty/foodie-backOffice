import { useRouter } from "next/router";

const UpdateMenuPage = () => {
  const router = useRouter();
  const { menuId } = router.query;
  return <h1>Update Menu Page : {menuId}</h1>;
};

export default UpdateMenuPage;

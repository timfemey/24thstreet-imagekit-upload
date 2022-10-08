import { Container, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { Images } from "./pages/SeeImages";
import { Upload } from "./pages/Upload";
import { useBearStore } from "./store/store";

export function App() {
  const set = useBearStore((state) => state);
  const home = set.uploadPage;
  const handleClick = () => {
    home ? set.setPage() : set.removePage();
  };

  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="page" mb="0">
          {home ? "See Images" : "Go to Upload Page"}
        </FormLabel>
        <Switch onChange={handleClick} id="page" />
      </FormControl>

      {home ? <Upload /> : <Images />}
    </>
  );
}

import { ChakraProvider } from "@chakra-ui/react";
import { render } from "preact";
import { App } from "./app";
import "./index.css";

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("app") as HTMLElement
);

import {
  ComponentStyleConfig,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const Button: ComponentStyleConfig = {
  variants: {
    primary: {
      bg: "#fedf56",
      borderRadius: "8px",
      color: "#6a5809",
      fontWeight: "bold",
      padding: "25px 30px",
      border: "1px solid #fedf56",
      fontSize: "15",
    },
    outline: {
      borderRadius: "5px",
      color: "#fedf56",
      fontWeight: "bold",
      padding: "12px 36px",
      border: "1px solid rgba(254,223,86,6) !important",
    },
    outline_light: {
      borderRadius: "5px",
      color: "#0021c6",
      fontWeight: "bold",
      padding: "12px 36px",
      border: "1px solid #0021c6 !important",
    },
  },
};

const Toast: ComponentStyleConfig = {
  variants: {
   
  },
};

const components = {
  Button,
  Toast
}

const theme = extendTheme({
  config,
  components,
});

export default theme;

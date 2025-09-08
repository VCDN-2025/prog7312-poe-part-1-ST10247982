import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    tokens: {
      colors: {
        brand: {
          primary: { value: "#497921ff" },
          background: { value: "#171212ff" },
          onContainer: { value: "#90cbb1ff" },
          primaryText: { value: "#191717ff" },
          accents: { value: "#d7d768ff" },
          error: { value: "#ae2929ff" },
        },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
});
const system = createSystem(defaultConfig, config);
export default system;

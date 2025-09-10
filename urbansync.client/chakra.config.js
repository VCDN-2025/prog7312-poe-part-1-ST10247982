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
          background: { value: "#373f38ff" },
          onContainer: { value: "#e8f0fe" },
          input: { value: "#ddece6ff" },
          primaryText: { value: "#2a2727ff" },
          accents: { value: "#d7d768ff" },
          error: { value: "#ae2929ff" },
          placeholder: { value: "#ae2929ff" },
        },
      },
    },
    semanticTokens: {
      shadows: {
        custom: {
          value: {
            _light: "0 32px 56px 0 rgba(211, 195, 48, 0.25)",
            _dark: "0 32px 56px 0 rgba(163, 168, 70, 1)",
          },
        },
      },
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

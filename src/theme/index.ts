import { DefaultTheme } from "styled-components";

import { darkColors } from "./darkColors";
import { fonts } from "./fonts";
import { lightColors } from "./lightColors";
import { sizes } from "./sizes";
import { spaces } from "./spaces";

const lightTheme: DefaultTheme = {
  colors: lightColors,
  fonts,
  spaces,
  sizes,
};

const darkTheme: DefaultTheme = {
  colors: darkColors,
  fonts,
  spaces,
  sizes,
};

export { darkTheme, lightTheme };

import "styled-components";
import { darkColors } from "./darkColors";
import { fonts } from "./fonts";
import { lightColors } from "./lightColors";
import { sizes } from "./sizes";
import { spaces } from "./spaces";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof lightColors | typeof darkColors;
    fonts: typeof fonts;
    spaces: typeof spaces;
    sizes: typeof sizes;
  }
}

import { ImageProps } from 'react-native';
import iconMap from '@assets/icons/icon-map';

type IIconNames = keyof typeof iconMap;
export interface AppIconProps extends Omit<ImageProps, 'source'> {
  name?: IIconNames,
  height?: number,
  width?: number,
  color?: string,
}

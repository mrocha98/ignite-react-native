import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { WithChildren } from '../../types/props';
import S from './styles';

export type ButtonProps = WithChildren<
  TouchableOpacityProps & {
    flavor?: 'default' | 'success' | 'danger';
  }
>;

export function Button({
  children,
  style,
  flavor = 'default',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[S.button, S[`${flavor}Button`], style]}
    >
      {children}
    </TouchableOpacity>
  );
}

export type ButtonTextProps = WithChildren<TextProps>;

export function ButtonText({ children, style, ...props }: ButtonTextProps) {
  return (
    <Text {...props} style={[S.buttonText, style]}>
      {children}
    </Text>
  );
}

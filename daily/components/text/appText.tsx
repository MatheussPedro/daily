import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';

type FontWeight = 'regular' | 'semi' | 'bold';

interface AppTextProps extends TextProps {
  weight?: FontWeight;
  size?: number;
  color?: string;
}

export function AppText({
  children,
  weight = 'regular',
  size = 16,
  color = '#333',
  style,
  ...props
}: AppTextProps) {
  const fontMap: Record<FontWeight, string> = {
    regular: 'Montserrat_400Regular',
    semi: 'Montserrat_600SemiBold',
    bold: 'Montserrat_700Bold',
  };

  const textStyle: TextStyle = {
    fontFamily: fontMap[weight],
    fontSize: size,
    color,
  };

  return (
    <Text {...props} style={[textStyle, style]}>
      {children}
    </Text>
  );
}
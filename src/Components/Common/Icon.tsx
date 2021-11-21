import React, { FC, useMemo } from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';
import { DEFAULT_ICON_SIZE } from '../../Constants';
import { calcSize } from '../../Utils';

export interface IconProps extends ImageProps {
  size?: number;
}

const Icon: FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, style, ...props }) => {
  const calcStyle = useMemo(() => {
    if (size) {
      return StyleSheet.flatten([
        {
          width: calcSize(size),
          height: calcSize(size),
        },
        style,
      ]);
    }

    return style;
  }, [size, style]);

  return <Image style={calcStyle} {...props} />;
};

export default Icon;

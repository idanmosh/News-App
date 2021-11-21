import Icon from './Icon';
import React, {FC, useMemo} from 'react';
import {Pressable, PressableProps} from 'react-native';
import {DEFAULT_ICON_SIZE, HIT_SLOP_10} from '../../Constants';
interface Props {
  type?: 'close' | 'back';
}

const CloseButton: FC<Props & PressableProps> = ({
  type = 'close',
  style,
  ...props
}) => {
  const source = useMemo(() => {
    if (type === 'back') {
      return require('../../Assets/back.png');
    }
    return require('../../Assets/close.png');
  }, [type]);
  return (
    <Pressable
      hitSlop={HIT_SLOP_10}
      style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, style]}
      {...props}>
      <Icon size={DEFAULT_ICON_SIZE} source={source} />
    </Pressable>
  );
};

export default CloseButton;

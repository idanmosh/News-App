import { WHITE } from '../../Constants';
import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { calcSize } from '../../Utils';

interface ModalContentProps {
  message?: Array<string> | string;
  title?: string;
  confirmText: string;
  onConfirm?: () => void;
  onClose: () => void;
}
const ModalContent: FC<ModalContentProps> = ({
  confirmText,
  onConfirm,
  onClose,
  title,
  message,
  children,
}) => {
  //   const dispatch = useDispatch();
  const [textLines, setTextLines] = useState(0);

  return (
    <View style={[styles.container]}>
      {title ? (
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Rubik-Medium',
            fontSize: calcSize(18),
          }}>
          {title}
        </Text>
      ) : null}
      <View
        style={{
          marginTop: calcSize(12),
          paddingHorizontal: calcSize(5),
          flexDirection: 'row-reverse',
        }}>
        {message && (
          <Text
            onTextLayout={(e) => {
              setTextLines(e.nativeEvent.lines.length);
            }}
            style={
              textLines >= 3 ? { textAlign: 'right' } : { textAlign: 'center' }
            }>
            {message}
          </Text>
        )}
        {children}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            onClose();
            onConfirm?.();
          }}>
          <Text>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: WHITE,
    width: calcSize(320),
    borderRadius: calcSize(7),
    paddingTop: calcSize(40),
    paddingBottom: calcSize(28),
    paddingHorizontal: calcSize(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    marginTop: calcSize(20),
    justifyContent: 'space-evenly',
  },
  button: {
    marginStart: calcSize(40),
    height: calcSize(38),
  },
});

export default ModalContent;

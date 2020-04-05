import React, { ReactNode, useState } from 'react';
import ReactNative, { TouchableOpacity } from 'react-native';

const MultiTapOverlay = ({
  onLongPress,
  onSingleTap,
  onMultiTaps,
  multiTapCount = 2,
  multiTapDelay = 300,
  children,
  style
}) => {
  const [lastPress, setLastPress] = useState(null);
  const [tapCount, setTapCount] = useState(0);

  const handlePress = () => {
    const now = Date.now();

    setLastPress(now);
    if (now - lastPress <= multiTapDelay) {
      if (tapCount < multiTapCount - 1) {
        setTapCount(tapCount + 1);
      } else {
        setTapCount(0);
        onMultiTaps && onMultiTaps();
      }
    } else {
      setTapCount(1);
      onSingleTap && onSingleTap();
    }
  };
  const handleLongPress = () => onLongPress && onLongPress();

  return (
    <TouchableOpacity
      delayLongPress={1000}
      activeOpacity={0.8}
      onLongPress={handleLongPress}
      onPress={handlePress}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};

export default MultiTapOverlay;

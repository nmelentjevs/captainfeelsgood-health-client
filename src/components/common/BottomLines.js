import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../theme';

const BottomLines = ({
  status: { isPendingOrder, isConfirmedOrder, isFinishedOrder }
}) => {
  return (
    <View style={styles.bottomLinesContainer}>
      <View style={styles.bottomLines}>
        {!isFinishedOrder ? (
          !isPendingOrder ? (
            !isConfirmedOrder ? (
              <>
                <View style={[styles.line, styles.active]} />
                <View style={[styles.line, styles.innactive]} />
                <View style={[styles.line, styles.innactive]} />
                <View style={[styles.line, styles.innactive]} />
              </>
            ) : (
              <>
                <View style={[styles.line, styles.innactive]} />
                <View style={[styles.line, styles.active]} />
                <View style={[styles.line, styles.innactive]} />
                <View style={[styles.line, styles.innactive]} />
              </>
            )
          ) : (
            <>
              <View style={[styles.line, styles.innactive]} />
              <View style={[styles.line, styles.innactive]} />
              <View style={[styles.line, styles.active]} />
              <View style={[styles.line, styles.innactive]} />
            </>
          )
        ) : (
          <>
            <View style={[styles.line, styles.innactive]} />
            <View style={[styles.line, styles.innactive]} />
            <View style={[styles.line, styles.innactive]} />
            <View style={[styles.line, styles.active]} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomLinesContainer: {
    position: 'absolute',
    bottom: 75
  },
  bottomLines: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  line: {
    height: 5,
    width: 20,
    marginHorizontal: 5
  },
  active: {
    backgroundColor: COLORS.pink
  },
  innactive: {
    backgroundColor: COLORS.gray
  }
});

export default BottomLines;

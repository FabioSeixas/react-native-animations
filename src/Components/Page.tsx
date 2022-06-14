import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>
}

const { width, height } = Dimensions.get('window')

const SIZE = width * 0.7

const Page = ({ title, index, translateX }: PageProps) => {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP
    )
    return {
      borderRadius: scale * (SIZE / 2),
      transform: [
        { scale }
      ]
    }
  }, [translateX])

  const textStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [height, 0, -height],
      Extrapolate.CLAMP
    )
    const opacity = interpolate(translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-3, 1, -3],
      Extrapolate.CLAMP
    )
    return {
      opacity,
      transform: [
        { translateY },
      ]
    }
  }, [translateX])

  return (
    <View style={[styles.pageContainer, {
      backgroundColor: `rgba(0, 0, 256, 0.${index + 2})`
    }]} >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{ position: 'absolute' }, textStyle]}>
        <Text style={styles.titleText}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  titleText: {
    fontSize: 70,
    color: 'white',
  },
});

export default Page;

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Page from '../Components/Page'

const WORDS = [
  "What's",
  "up",
  "Mobile",
  "Devs"
]

const FirstExample = ({ navigation }) => {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log('event: ', event)
    translateX.value = event.contentOffset.x
  })


  return (
    <>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        horizontal
        style={[styles.container]}
        pagingEnabled
      >
        {WORDS.map((word, index) => <Page
          title={word} key={index} index={index} translateX={translateX} />)}
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default FirstExample

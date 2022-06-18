import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated";
import Section from '../Components/Section';

type SectionProps = {
  id: number
  name: string
}

const sections: SectionProps[] = [
  {
    id: 1,
    name: 'cards'
  },
  {
    id: 2,
    name: 'magazines'
  },
  {
    id: 3,
    name: 'books'
  },
]

const SCREEN_WIDTH = Dimensions.get('window').width
const SECTION_WIDTH = SCREEN_WIDTH * 0.7

const SecondExample = () => {
  const scroll = useSharedValue(0)
  const scrollRef = useAnimatedRef<Animated.ScrollView>()

  const fluctuatingLineStyle = useAnimatedStyle(() => {
    const translateX = interpolate(scroll.value,
      [0, SECTION_WIDTH * 1, SECTION_WIDTH * 2],
      [0, 70, 190]
    )

    const width = interpolate(scroll.value,
      [0, SECTION_WIDTH * 1, SECTION_WIDTH * 2],
      [54, 106, 60]
    )
    return {
      width,
      transform: [
        { translateX },
      ]
    }
  })

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scroll.value = event.contentOffset.x
  })

  const onClickTitle = (index: number) => {
    scrollRef.current?.scrollTo({ y: 0, x: SECTION_WIDTH * (index) })
  }

  return (
    <View style={styles.container}>
      <View style={styles.titlesContainer}>
        {sections.map((item, index) => <Section index={index} key={item.id} title={item.name} onClick={onClickTitle} />)}
        <Animated.View style={[styles.fluctuatingLine, fluctuatingLineStyle]} />
      </View>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        style={styles.childrenContainer}
        horizontal
        pagingEnabled
      >
        {sections.map(section => (
          <View style={styles.section} key={section.id}>
            <Text>{section.name}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
  childrenContainer: {
    backgroundColor: 'red',
    height: Dimensions.get('window').height * 0.1,
    width: SECTION_WIDTH
  },
  section: {
    width: SECTION_WIDTH
  },
  titlesContainer: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    height: Dimensions.get('window').height * 0.1,
    width: SECTION_WIDTH,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  fluctuatingLine: {
    position: 'absolute',
    bottom: 12,
    backgroundColor: 'black',
    height: Dimensions.get('window').height * 0.006,
    borderRadius: 20,
    opacity: 0.4
  }
});

export default SecondExample

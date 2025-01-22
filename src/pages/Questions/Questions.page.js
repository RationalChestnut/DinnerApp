import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 120; // How far user must drag card before it flies off
// You can obviously replace this with any data you prefer
const QUESTIONS = [
  {
    id: "1",
    label: "Surface Level",
    text: "What was your dream job as a child, and what is it now?",
    color: "#eb4034",
  },
  {
    id: "2",
    label: "Deep End",
    text: "What is the most important thing you learned from your parents?",
    color: "#fc9d03",
  },
  {
    id: "3",
    label: "Philosophical",
    text: "What does happiness mean to you?",
    color: "#2b86c5",
  },
];

export const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // This is the main Animated Value controlling the card’s X/Y position
  const position = useRef(new Animated.ValueXY()).current;

  // Interpolated rotation (for tilt while dragging left/right)
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  // Compose our transforms (rotation + translation)
  const rotateAndTranslate = {
    transform: [{ rotate }, ...position.getTranslateTransform()],
  };

  // Opacity & scale for the *next* card behind the top card (nice effect)
  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.9, 1],
    extrapolate: "clamp",
  });

  // PanResponder for handling gestures
  const panResponder = useRef(
    PanResponder.create({
      // We want to handle any touch on the top card
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // If user swipes far to the right
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            // Move on to the next card
            setCurrentIndex((prevIndex) => prevIndex + 1);
            // Reset the position for the next card
            position.setValue({ x: 0, y: 0 });
          });
        }
        // If user swipes far to the left
        else if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            position.setValue({ x: 0, y: 0 });
          });
        }
        // Otherwise, the card snaps back to the center
        else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const renderCards = () => {
    return QUESTIONS.map((item, i) => {
      // If we've swiped past this card, don't render it
      if (i < currentIndex) {
        return null;
      }

      // If it's the top card (the one currently swiping)
      if (i === currentIndex) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={item.id}
            style={[styles.cardContainer, rotateAndTranslate]}
          >
            <View style={[styles.innerCard, { backgroundColor: item.color }]}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.question}>{item.text}</Text>
              <Text style={styles.counter}>
                {i + 1}/{QUESTIONS.length}
              </Text>
            </View>
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item.id}
          style={[
            styles.cardContainer,
            {
              opacity: nextCardOpacity,
              transform: [{ scale: nextCardScale }],
            },
          ]}
        >
          <View style={[styles.innerCard, { backgroundColor: item.color }]}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.question}>{item.text}</Text>
            <Text style={styles.counter}>
              {i + 1}/{QUESTIONS.length}
            </Text>
          </View>
        </Animated.View>
      );
    }).reverse();
  };

  return <View style={{ flex: 1 }}>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    width: "100%",
    height: "75%",
    top: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCard: {
    width: "85%",
    height: "100%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  question: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 35,
    textAlign: "center",
    marginVertical: "auto",
  },
  counter: {
    color: "#fff",
    position: "absolute",
    bottom: 20,
    fontSize: 16,
  },
});

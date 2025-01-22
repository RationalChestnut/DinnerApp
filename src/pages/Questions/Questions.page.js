import React, { useState, useRef } from "react";
import { View, Text, Animated, PanResponder, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 120;

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
  const position = useRef(new Animated.ValueXY()).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const rotateAndTranslate = {
    transform: [{ rotate }, ...position.getTranslateTransform()],
  };

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            position.setValue({ x: 0, y: 0 });
          });
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            position.setValue({ x: 0, y: 0 });
          });
        } else {
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
      if (i < currentIndex) {
        return null;
      }

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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {currentIndex >= QUESTIONS.length ? (
        <View style={styles.endContainer}>
          <Text style={styles.endTitle}>All Done! 🎉</Text>
          <Text style={styles.endText}>
            You've completed all the questions. Thanks for participating!
          </Text>
        </View>
      ) : (
        renderCards()
      )}
    </View>
  );
};

const styles = {
  cardContainer: {
    position: "absolute",
    width: "100%",
    height: "75%",
    top: "12%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  innerCard: {
    width: "85%",
    height: "100%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
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
  endContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  endTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2b86c5",
  },
  endText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
  },
};

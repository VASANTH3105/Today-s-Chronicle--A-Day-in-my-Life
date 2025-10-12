import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from "iconsax-react-native";
import { RootState, AppDispatch } from "../redux/store";
import { completeOnboarding } from "../redux/appSlice";
import ThemedText from "../components/themed/ThemedText";
import ThemedView from "../components/themed/ThemedView";
import { useTheme } from "../context/ThemeContext";

const slides = [
  {
    id: "1",
    image: require("../assets/images/treegroup.png"),
    title: "Welcome to Chronicle",
    description:
      "Track your daily tasks and schedule with ease, all in one place.",
  },
  {
    id: "2",
    image: require("../assets/images/towardssuccess.png"),
    title: "Stay Organized",
    description:
      "Group your tasks by category and priority to stay on top of your day.",
  },
  {
    id: "3",
    image: require("../assets/images/plan.png"),
    title: "Achieve Your Goals",
    description: "Let's get started on building a more productive you.",
  },
];

const OnboardingItem = ({ item }: { item: (typeof slides)[0] }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.itemContainer, { width }]}>
      <Image source={item.image} style={styles.image} />
      <ThemedText style={styles.title}>{item.title}</ThemedText>
      <ThemedText style={styles.description}>{item.description}</ThemedText>
    </View>
  );
};

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) setCurrentIndex(viewableItems[0].index ?? 0);
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      dispatch(completeOnboarding());
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemedView style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </ThemedView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => dispatch(completeOnboarding())}>
          <ThemedText style={styles.footerText}>SKIP</ThemedText>
        </TouchableOpacity>

        <View style={styles.paginator}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === currentIndex ? colors.primary : colors.border,
                  width: i === currentIndex ? 20 : 8,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={scrollToNext}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <ArrowRight size="24" color={colors.background} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: { alignItems: "center", justifyContent: "center", padding: 20 },
  image: { width: 300, height: 300, resizeMode: "contain" },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center", marginBottom: 10 },
  description: { fontSize: 16, textAlign: "center", color: "#666" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  footerText: { fontWeight: "600", fontSize: 14 },
  paginator: { flexDirection: "row", alignItems: "center" },
  dot: { height: 8, borderRadius: 4, marginHorizontal: 4 },
  button: { padding: 16, borderRadius: 100, alignItems: "center" },
});

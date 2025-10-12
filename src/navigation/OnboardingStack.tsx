import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  ViewToken,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowRight } from 'iconsax-react-native';


import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from '../components/themed/ThemedText';
import ThemedView from '../components/themed/ThemedView';
import { useTheme } from '../context/ThemeContext';

const slides = [
  {
    id: '1',
    image: require('../assets/images/treegroup.png'), 
    title: 'Welcome to Chronicle',
    description: 'Track your daily tasks and schedule with ease, all in one place.',
  },
  {
    id: '2',
    image: require('../assets/images/towardssuccess.png'), 
    title: 'Stay Organized',
    description: 'Group your tasks by category and priority to stay on top of your day.',
  },
  {
    id: '3',
    image: require('../assets/images/plan.png'),
    title: 'Achieve Your Goals',
    description: "Let's get started on building a more productive you.",
  },
];

const OnboardingItem = ({ item }: { item: typeof slides[0] }) => {
  const { width } = useWindowDimensions();
  const itemStyles = StyleSheet.create({
    container: {
      width,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    image: {
      width: width * 0.8,
      height: width * 0.8,
      resizeMode: 'contain',
      flex: 0.7,
    },
    title: {
      fontWeight: '800',
      fontSize: 28,
      marginBottom: 10,
      textAlign: 'center',
    },
    description: {
      fontWeight: '300',
      textAlign: 'center',
      paddingHorizontal: 64,
      fontSize: 16,
    },
  });

  return (
    <View style={itemStyles.container}>
      <Image source={item.image} style={itemStyles.image} />
      <View style={{ flex: 0.3 }}>
        <ThemedText style={itemStyles.title}>{item.title}</ThemedText>
        <ThemedText style={itemStyles.description}>{item.description}</ThemedText>
      </View>
    </View>
  );
};

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleDone();
    }
  };
  
  const handleDone = () => {
    // Here you would typically set a flag in AsyncStorage so the user
    // doesn't see onboarding again. Then navigate.
    navigation.navigate('Auth');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemedView style={{ flex: 3, borderWidth: 0, borderColor: '#FFFFFF' }}>
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
        <TouchableOpacity onPress={handleDone}>
          <ThemedText style={styles.footerText}>SKIP</ThemedText>
        </TouchableOpacity>

        <View style={styles.paginator}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === currentIndex ? colors.primary : colors.border,
                  width: i === currentIndex ? 20 : 8,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={scrollToNext} style={[styles.button, { backgroundColor: colors.primary }]}>
          <ArrowRight size="24" color={colors.background} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    borderWidth: 0,
    borderColor: 'white'
  },
  footerText: {
    fontWeight: '600',
    fontSize: 14,
  },
  paginator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    padding: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
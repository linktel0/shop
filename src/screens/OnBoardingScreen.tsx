import React from "react";
import {View,Text,Dimensions, TouchableOpacity} from "react-native";
import {Avatar} from 'react-native-paper'
import {advertise} from '../redux/data'
import Animated, {
    Extrapolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    useDerivedValue,
    interpolate,
    interpolateColor,
} from "react-native-reanimated";
import {OnBoardingScreenProps} from "../navigation/ScreensNavigationRouteProps";

const { width} = Dimensions.get("screen");
export const OnBoardingScreen = ({
    navigation,
    route,
}:OnBoardingScreenProps) => {

    const translationX = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            translationX.value = event.contentOffset.x;
        },
        onBeginDrag: (e) => {},
        onEndDrag: (e) => {},
    });

    return (
        <View className="h-full w-full center-y">
            <TouchableOpacity className="absolute bottom-5 right-5 z-10"
                onPress={() =>
                    //navigation.navigate("Auth", { screen: "Login" })
                    navigation.navigate("Main", { screen: "Home" })
                }
            >
                <Avatar.Icon size={48} icon="check" className="bg-primary"/>
            </TouchableOpacity>
       
            <Animated.ScrollView 
                style={[{ flex: 1, backgroundColor: 'white' }]}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                horizontal
                decelerationRate="fast"
                snapToInterval={width}
                showsHorizontalScrollIndicator={false}
            >
                {advertise.map((page, index) => {
                    const scale = useDerivedValue(() => {
                        return interpolate(
                            translationX.value,
                            [
                                width * (index - 1),
                                width * index,
                                width * (index + 1),
                            ],
                            [0.3, 1, 0.3],
                            Extrapolate.CLAMP
                        );
                    });

                    const imageTranslateX = useDerivedValue(() => {
                        return interpolate(
                            translationX.value,
                            [
                                width * (index - 1),
                                width * index,
                                width * (index + 1),
                            ],
                            [-width, 0, width],
                            Extrapolate.CLAMP
                        );
                    });
                    const imageTranslateY = useDerivedValue(() => {
                        return interpolate(
                            translationX.value,
                            [
                                width * (index - 1),
                                width * index,
                                width * (index + 1),
                            ],
                            [10, 0, 10],
                            Extrapolate.CLAMP
                        );
                    });

                    const styles = useAnimatedStyle(() => {
                        return {
                            transform: [
                                {
                                    scale: scale.value,
                                },
                                {
                                    translateX: imageTranslateX.value,
                                },
                                {
                                    translateY: imageTranslateY.value,
                                },
                            ],
                        };
                    });

                    return (
                        <Animated.View key={page.id}
                            className="center-y h-full"
                            style={{width:width}}
                        >
                            <Animated.Image
                                style={[
                                    { width: width * 0.6, height: width * 0.6 },
                                    styles,
                                ]}
                                source={{uri: page.image}}        
                            />

                            <Text className="text-primary text-3xl my-6">
                                {page.title}
                            </Text>
                            <Text className="text-base px-12" >                              
                                {page.subtitle}
                            </Text>
                        </Animated.View>
                    );
                })}

            </Animated.ScrollView>
            <View className="absolute p-1 mb-5 center-x bottom-0 w-full">
                {advertise.map((page, i) => {
                    const widthstyle = useDerivedValue(() => {
                        return interpolate(
                            translationX.value,
                            [width * (i - 1), width * i, width * (i + 1)],
                            [10, 30, 10],
                            Extrapolate.CLAMP
                        );
                    });

                    const colorStyle = useDerivedValue(() => {
                        return interpolateColor(
                            translationX.value,
                            [width * (i - 1), width * i, width * (i + 1)],
                            [
                                "#DB3022",
                                '#bf1c0a',
                                '#f75546',
                            ]
                        );
                    });

                    const dotStyles = useAnimatedStyle(() => ({
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: withSpring(colorStyle.value),
                        marginHorizontal: 5,
                        width: withSpring(widthstyle.value),
                    }));

                    return (
                        <View key={page.id}>
                            <Animated.View style={dotStyles} />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};


import React from "react";
import { Product } from "../redux/data_types";
import {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { Card ,Avatar} from "react-native-paper";
import { View,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface AnimatedScrollViewProps {
    data: Product[];
    itemWidth: number;
    itemHeight?: number;
    products_in_bag: number[]
    products_in_favourite: number[]
}

const AnimatedScrollView = ({
    data,
    itemHeight,
    itemWidth,
    products_in_bag,
    products_in_favourite,   
}:AnimatedScrollViewProps) => {
    const navigation = useNavigation<any>();
    const translationX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationX.value = event.contentOffset.x;
    });

    return (
        <View>
            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                snapToInterval={itemWidth + 16 * 2}
                decelerationRate="fast"
            >
                {data.map((item, index) => {
                    const inputRange = [
                        (itemWidth + 16 * 2) * (index - 2),
                        (itemWidth + 16 * 2) * index,
                        (itemWidth + 16 * 2 ) * (index + 2),
                    ];

                    const rotateZ = useDerivedValue(() => {
                        return withSpring(
                            interpolate(
                                translationX.value,
                                inputRange,
                                [-45, 0, 45],
                                Extrapolate.CLAMP
                            )
                        );
                    });

                    const animatedStyles = useAnimatedStyle(() => ({
                        zIndex: -index,
                        transform: [
                            {
                                scale: withSpring(
                                    interpolate(
                                        translationX.value,
                                        inputRange,
                                        [0.5, 1, 0.5],
                                        Extrapolate.CLAMP
                                    )
                                ),
                            },
                            {
                                rotate: rotateZ.value + "deg",
                            },
                            {
                                translateX: interpolate(
                                    translationX.value,
                                    inputRange,
                                    [0, 0, -100],
                                    Extrapolate.CLAMP
                                ),
                            },
                        ],
                    }));
                    return (
                        <Animated.View 
                            key={item.id}
                            style={animatedStyles}
                        >
                           <View className="bg-primary rounded-2xl mr-8"
                                style={{width:itemWidth}}
                            >
                                <View className="ml-2">
                                    <Card
                                        onPress={() =>
                                        navigation.navigate("Shop_Product_Detail", {item: item,})}
                                    >        
                                        <Card.Cover source={{ uri: item.thumbnail! }} />
                                        <Text className="p-2 text-xs font-bold h-20">
                                            {item.name}
                                        </Text>
                                    </Card>
                                    <View className="between-x m-1">
                                        <Text className="text-primary-light">
                                            ￥{`${item.price}`}
                                        </Text>
                                        <View className="flex-row">
                                            {products_in_favourite.includes(item.id) &&<Avatar.Icon className="bg-primary"
                                                size={32} icon="heart" color="white"/> } 
                                            {products_in_bag.includes(item.id) && <Avatar.Icon className="bg-primary"
                                                size={32} icon="shopping-outline" color="white"/> }       
                                        </View>
                                    </View>
                            </View>
                            </View>
                        </Animated.View>
                    );
                })}
                <View style={{width:itemWidth*0.68}}/>
            </Animated.ScrollView>
        </View>
    );
};

export default AnimatedScrollView;

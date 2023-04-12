import React from "react";

import { BoxProps, useTheme } from "@shopify/restyle";
import { Box, Text } from "../utils/restyle";
import { Theme } from "../utils/theme";
import { Product } from "../redux/data_types";
import {
    PanGestureHandlerGestureEvent,
    TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { SharedElement } from "react-navigation-shared-element";
import { Image,View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Animated, {
    useAnimatedGestureHandler,
    withSpring,
} from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useAnimatedStyle } from "react-native-reanimated";
import { Card ,Avatar} from "react-native-paper";

interface TowColumnScrollViewProps {
    width: number;
    products: Product[];
    products_in_bag: number[];
    products_in_favourite: number[];
}

const AnimatedBox = Animated.createAnimatedComponent(Box);

const TowColumnScrollView = ({
    width,
    products,
    products_in_bag,
    products_in_favourite,
}:TowColumnScrollViewProps) => {
    const navigation = useNavigation<any>();
    const PRODUCT_WIDTH = width / 2 - 16 * 2;
    const right_products = products.filter((p) => p.id % 2 !== 0);
    const left_products = products.filter((p) => p.id % 2 === 0);

    return (
        <View className="center-x w-full">
            <View>
                {left_products.map((p) => (
                    <View className="bg-primary rounded-2xl mb-4"
                        key={p.id} style={{width:PRODUCT_WIDTH}}
                    >
                        <View className="ml-2">
                            <Card
                                onPress={() =>
                                    navigation.navigate("Shop_Product_Detail", {item: p,})}
                            >        
                                <Card.Cover style = {{height:100}}
                                    source={{ uri: p.thumbnail! }} />
                                <Text className="p-2 text-xs font-bold h-14">
                                    {p.name}
                                </Text>
                            </Card>
                            <View className="between-x m-1">
                                <Text className="text-primary-light">
                                    ￥{`${p.price}`}
                                </Text>
                                <View className="flex-row">
                                    {products_in_favourite.includes(p.id) &&<Avatar.Icon className="bg-primary"
                                        size={32} icon="heart" color="white"/> } 
                                    {products_in_favourite.includes(p.id) && <Avatar.Icon className="bg-primary"
                                        size={32} icon="shopping-outline" color="white"/> }       
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
            <View
                style={{
                    transform: [{ translateY: 20 }],
                    marginHorizontal: 16,
                }}
            >
                {right_products.map((p) => (
                    <View className="bg-primary rounded-2xl mb-4"
                        key={p.id} style={{width:PRODUCT_WIDTH}}
                    >
                        <View className="ml-2">
                            <Card
                                onPress={() =>
                                    navigation.navigate("Shop_Product_Detail", {item: p,})}
                            >        
                                <Card.Cover style = {{height:100}}
                                    source={{ uri: p.thumbnail! }} />
                                <Text className="p-2 text-xs font-bold h-14">
                                    {p.name}
                                </Text>
                            </Card>
                            <View className="between-x m-1">
                                <Text className="text-primary-light">
                                    ￥{`${p.price}`}
                                </Text>
                                <View className="flex-row">
                                    {products_in_favourite.includes(p.id) &&<Avatar.Icon className="bg-primary"
                                        size={32} icon="heart" color="white"/> } 
                                    {products_in_favourite.includes(p.id) && <Avatar.Icon className="bg-primary"
                                        size={32} icon="shopping-outline" color="white"/> }       
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default React.memo(TowColumnScrollView);

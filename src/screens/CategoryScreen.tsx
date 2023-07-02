import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import {CategoryScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { Box } from "../utils/restyle";
import {View,Text} from 'react-native'
import { useTheme } from "@shopify/restyle";
import { Theme } from "../utils/theme";

import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ProductCard from "../components/cards/ProductCard";

import { Product } from "../redux/data_types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FilterView from "../components/FilterView";
import SortView from "../components/SortView";
import ProductListing from "../components/ProductListing";
import {IconButton} from 'react-native-paper'
import {Header} from "../components/navigation/Header";

const { width, height } = Dimensions.get("screen");

const IMAGE_HEIGHT = height * 0.6;
const PRODUCT_WIDTH = width / 2;
const HIDDEN_VIEW_HEIGHT = height * 0.4;
const FILTER_VIEW_HEIGHT = height * 0.5;

const CategoryScreen = ({
    route,
    navigation,
}:CategoryScreenProps) => {
    const dispatch = useAppDispatch();
    const theme = useTheme<Theme>();

    const filterTranslateY = useSharedValue(FILTER_VIEW_HEIGHT + 15);
    const sortTranslateY = useSharedValue(FILTER_VIEW_HEIGHT + 15);

    const products_in_bag = useAppSelector(
        (state) => state.bag.products_in_bag
    );
    const products = useAppSelector((state) => state.products.products).filter(
        (p) => p.category.name === route.params.category.name
    );
    // const [display, setDisplay] = useState(false);

    // selection state
    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState(
        selectedProduct && selectedProduct.has_size
            ? selectedProduct.sizes[0]
            : ""
    );
    const [selectedColor, setSelectedColor] = useState(
        selectedProduct && selectedProduct.has_color
            ? selectedProduct.color[0]
            : ""
    );
    //selection state

    const translationY = useSharedValue(0);
    const hiddenViewTranslateY = useSharedValue(HIDDEN_VIEW_HEIGHT + 15);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y;
    });

    const hiddenViewStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withTiming(hiddenViewTranslateY.value),
            },
        ],
    }));

    // useEffect(() => {
    //     setDisplay(true);
    // }, []);

    return (
        <View className="h-full">
            <Header title='商 品' goBack={()=>navigation.goBack()}/>
            <FilterView
                height={FILTER_VIEW_HEIGHT}
                width={width}
                translateY={filterTranslateY}
                onApply={() =>
                    (filterTranslateY.value = FILTER_VIEW_HEIGHT + 15)
                }
                onClose={() =>
                    (filterTranslateY.value = FILTER_VIEW_HEIGHT + 15)
                }
            />
            <SortView
                height={FILTER_VIEW_HEIGHT}
                width={width}
                translateY={sortTranslateY}
                onApply={() => (sortTranslateY.value = FILTER_VIEW_HEIGHT + 15)}
                onClose={() => (sortTranslateY.value = FILTER_VIEW_HEIGHT + 15)}
            />

            <Animated.View className="w-[width] rounded-b-2xl overflow-hidden pt-2">
                {/*</View>sharedTransitionTag={`container-${product.id}`}*/}
                {/* sharedTransitionTag={`category-${route.params.category.display_name}`} */}
                <Animated.Image 
                    resizeMode="cover"
                    source={{uri: route.params.category.image}}
                    style={{ width:width, height: IMAGE_HEIGHT / 3}}
                />
                <View className="absolute left-4 bottom-3 text-primary-light text-3xl font-bold">
                    <Text className="text-2xl text-primary-light">
                        {route.params.category.display_name}
                    </Text>
                </View>
                <IconButton className="absolute right-4 top-20 w-8 h-8 bg-secondary-light rounded-full items-center -mt-4"
                    icon="close"
                    size={24}
                    onPress={() => navigation.navigate("Shop_Main")}
                />                    
            </Animated.View>   
            <View className="flex-1">
                <View className="between-x bg-primary-light h-[48] p-3 mt-1rounded-xl">
                    <TouchableOpacity className="flex-row items-center"
                        onPress={() => (filterTranslateY.value = 0)}
                    >
                        <MaterialCommunityIcons
                            name="filter-variant"
                            size={24}
                            color={'black'}
                        />
                        <Text className="ml-2 opacity-70">
                            类别
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center"
                        onPress={() => (sortTranslateY.value = 0)}
                    >
                        <MaterialCommunityIcons
                            name="sort"
                            size={24}
                            color={'black'}
                        />
                        <Text className="ml-2 opacity-70">
                            价格
                        </Text>
                    </TouchableOpacity>
                </View>
                <ProductListing
                    product_width={width / 2 - 8 * 2}
                    products={products}
                    products_in_bag={products_in_bag}
                />
            </View>
        </View>
    );
};

export default CategoryScreen;

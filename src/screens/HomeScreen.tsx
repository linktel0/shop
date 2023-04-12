import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions,View,Text, Image, ScrollView, TouchableOpacity } from "react-native";

//import { SharedElement } from "react-navigation-shared-element";
import AnimatedScrollView from "../components/AnimatedScrollView";
import HomeProductCard from "../components/cards/HomeProductCard";
import BottomTab from "../components/navigation/BottomTab";
import TowColumnScrollView from "../components/TowColumnScrollView";
import {IconButton,Button} from 'react-native-paper'

import {HomeScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { EXPORLE_SETION, PRODUCTS } from "../redux/data";
import { Product } from "../redux/data_types";
import { useAppSelector } from "../redux/hooks";

const { width} = Dimensions.get("screen");
const PRODUCT_WIDTH = width * 0.5;

const HomeScreen = ({ navigation, route }:HomeScreenProps) => {
    const [display, setDisplay] = useState(false);
    const products = useAppSelector((state) => state.products.products);
    const product_in_favourite = useAppSelector(state => state.favourite.products_in_favourite)
    const products_in_bag = useAppSelector(state => state.bag.products_in_bag)

    useEffect(() => {
        setDisplay(true);
    }, []);

    return (
        <View className="h-full w-full">
            <BottomTab route_name={route.name} />
            {/*<ScrollView showsVerticalScrollIndicator ={false}
                className="m-4 mb-16">
                <View className="bg-primary rounded-2xl my-1 p-6">
                    <View className="between-x mb-5">
                        <Text className="text-3xl text-primary-light">
                            欢迎挑选 !
                        </Text>
                        <IconButton size={24} icon="shopping-outline" 
                            onPress={() => navigation.navigate('Bag_Main')}
                            iconColor={ 'white'} 
                            className="bg-red-lighter"           
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Shop_Search", {
                                search_term: null,
                            })
                        }
                    >
                            <View className="bg-primary-light between-x p-3 rounded-xl">
                                <Text>
                                    查 找
                                </Text>
                                <Ionicons 
                                    name="search"
                                    size={25}
                                    color={'red'}
                                />
                            </View>

                    </TouchableOpacity>
                </View>
                
                <View>
                    <Text className="text-base opacity=90">
                        挑 选
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={"fast"}
                        snapToInterval={width * 0.6 + 16 * 2}
                    >
                        {EXPORLE_SETION.map((s) => (
                            <View key={s.id}>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() =>
                                        navigation.navigate("Shop_Search", {
                                            search_term: s.title,
                                        })
                                    }
                                >
                                    <Image
                                        style={{
                                            width: width * 0.6,
                                            height: 100,
                                            borderRadius: 20,
                                            overflow: "hidden",
                                            marginRight:32
                                        }}
                                        resizeMode="cover"
                                        source={{
                                            uri: s.image_uri,
                                        }}
                                    />
                     
                                    <Text className="absolute  bottom-4 left-6 text-primary-light text-xl">
                                        {s.title}
                                    </Text>
                              
                                </TouchableOpacity>
                            </View>
                        ))}
                    <View style={{width:width*0.24}}/>
                    </ScrollView>
                </View>
                 <View>
                    <Text className="text-base opacity=90">
                        大众款
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={"fast"}
                        snapToInterval={PRODUCT_WIDTH + 16 * 2}
                    >
                        {products.slice(0, 3).map((p) => (
                            <HomeProductCard
                                key={p.id}
                                product={p}
                                product_width={PRODUCT_WIDTH}
                                in_favourite={product_in_favourite.includes(p.id)}
                                in_bag={products_in_bag.includes(p.id)}
                                onImagePress={() =>
                                    navigation.navigate("Shop_Product_Detail", {
                                        item: p,
                                    })
                                }
                                onAddToFavouritePress={() => {}}
                            />
                        ))}
                        <View style={{width:width*0.34}}/>
                    </ScrollView>
                </View>
                <View>
                    <Text className="text-base opacity=90">
                        新款
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={"fast"}
                        snapToInterval={PRODUCT_WIDTH + 16 * 2}
                    >
                        {products.slice(3, 7).map((p) => (
                            <HomeProductCard
                                key={p.id}
                                product={p}
                                product_width={PRODUCT_WIDTH}
                                in_favourite={product_in_favourite.includes(p.id)}
                                in_bag={products_in_bag.includes(p.id)}
                                onImagePress={() => {}}
                                onAddToFavouritePress={() => {}}
                            />
                        ))}
                        <View style={{width:width*0.34}}/>
                    </ScrollView>
                </View>
                <View>
                    <Text className="text-base opacity=90">
                        隆重推荐
                    </Text>
                    <TowColumnScrollView
                        width={width}
                        products={products.slice(12, 16)}
                        products_in_bag={products_in_bag}
                        products_in_favourite={product_in_favourite}
                    />
                </View>
               <View>
                    <Text className="text-base opacity=90">
                        隆重推荐
                    </Text>
                    <AnimatedScrollView
                        data={products.slice(8, 12)}
                        itemWidth={width / 2}
                        products_in_bag={products_in_bag}
                        products_in_favourite={product_in_favourite}
                    />
                </View>
                        </ScrollView>*/}
        </View>
    );
};

export default HomeScreen;

import React from "react";
import {View,Text} from "react-native";
import { Product } from "../../redux/data_types";
import { SharedElement } from "react-navigation-shared-element";
import { Card ,Avatar} from "react-native-paper";


interface HomeProductCardProps {
    product: Product;
    product_width: number;
    in_favourite?: boolean;
    in_bag?: boolean
    onImagePress(): void;
    onAddToFavouritePress(): void
}

const HomeProductCard = ({
    product,
    product_width,
    in_bag,
    in_favourite,
    onImagePress,
    onAddToFavouritePress,
}:HomeProductCardProps) => {
    return (
        <View className="bg-primary rounded-2xl mr-8"
            style={{width:product_width}}
        >
            <View className="ml-2">
                <Card
                    onPress={onImagePress}
                >        
                    <Card.Cover source={{ uri: product.thumbnail! }} />
                    <Text className="p-2 text-xs font-bold h-20">
                        {product.name}
                    </Text>
                </Card>
                <View className="between-x m-1">
                    <Text className="text-primary-light">
                        ￥{`${product.price}`}
                    </Text>
                    <View className="flex-row">
                        {in_favourite &&<Avatar.Icon className="bg-primary"
                            size={32} icon="heart" color="white"/> } 
                        {in_bag && <Avatar.Icon className="bg-primary"
                            size={32} icon="shopping-outline" color="white"/> }       
                    </View>
                </View>
           </View>
        </View>
    );
};

export default React.memo(HomeProductCard);

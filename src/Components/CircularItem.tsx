import React,{FC} from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { ImageProps } from "expo-image";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

type CircularItemProps = {
    imageSrc: ImageProps['source'];
    index: number;
    contentOffsetValue: Animated.SharedValue<number>;
}

const { width: windowWidth} = Dimensions.get('window');
export const ListSizeItem = windowWidth / 4;

const CircularListItem: FC<CircularItemProps> = ({imageSrc,index,contentOffsetValue}) => {
    const rStyle = useAnimatedStyle(() => {

        const inputRange =[
            (index-2) * ListSizeItem,
            (index-1) * ListSizeItem,
            index * ListSizeItem,
            (index+1) * ListSizeItem,
            (index+2) * ListSizeItem
        ];

        const translateOutputRange = [0,-ListSizeItem /3,-ListSizeItem/2,-ListSizeItem/3,0];
        const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7]
        const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7]

        const translateY = interpolate(
            contentOffsetValue.value, // ->0
            inputRange, // ->[-listSiseItem, 0 , listSizeItem]
            translateOutputRange, // -> [0,-ListSizeItem/2,0]
            Extrapolate.CLAMP
        );
        
        const opacity = interpolate(
            contentOffsetValue.value,
            inputRange,
            opacityOutputRange,
            Extrapolate.CLAMP
        );

        const scale = interpolate(
            contentOffsetValue.value,
            inputRange,
            scaleOutputRange,
            Extrapolate.CLAMP
        )
        return {
            opacity,
            transform:[
                {translateY: translateY},
                //{translateX: ListSizeItem / 2 + ListSizeItem},
                {scale}
            ]
        };
    })
    return(
        <Animated.View 
            style={[{
                width: ListSizeItem, 
                aspectRatio:1, 
                elevation:5,
                borderRadius:100,
                shadowOpacity: 0.2,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 20,
            },rStyle]}>
            <Image source={imageSrc} 
                style={{
                    width: ListSizeItem,
                    height: ListSizeItem,
                    margin:3, 
                    borderRadius:200,
                    shadowOpacity: 0.2,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowRadius: 20,}}/>
        </Animated.View>
    )
}

export default CircularListItem;
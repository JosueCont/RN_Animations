import React,{FC} from "react";
import {  FlatList, View } from "react-native";
import {ImageProps} from 'expo-image';
import CircularListItem, { ListSizeItem } from "../Components/CircularItem";
import { useSharedValue } from "react-native-reanimated";

type CircularProps = {
    data:ImageProps['source'][]
}

const CircularCarousel:FC<CircularProps> = ({data}) => {
    const contentOffset = useSharedValue(0)
    return(
        <FlatList 
            data={data}
            keyExtractor={(_,index) => index.toString()}
            horizontal 
            pagingEnabled
            snapToInterval={ListSizeItem}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(event) => {
                contentOffset.value = event.nativeEvent.contentOffset.x
            }}
            style={{
                position:'absolute', 
                bottom:0, 
                height:300
            }}
            contentContainerStyle={{
                justifyContent:'center',
                alignItems:'center',
                paddingHorizontal: 1.5 * ListSizeItem 
            }}
            renderItem={({item,index}) => (
                <CircularListItem imageSrc={item} index={index} contentOffsetValue={contentOffset}/>
            )}
        />

    )
    
}

export default CircularCarousel;
import React,{FC} from "react";
import { View, Text, Dimensions, useWindowDimensions, } from "react-native";
import Animated,{ useAnimatedStyle,withSpring, withTiming } from "react-native-reanimated";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

type DropdownItemType ={
    label:string;
    iconName:string;
}
type DropdownListItemProps = DropdownItemType & {
    index:number;
    dropdownItemCount:number;
    isExpanded: Animated.SharedValue<boolean>;
};

const DropdownItem: FC<DropdownListItemProps> = ({label,iconName, index,dropdownItemCount,isExpanded}) => {
    const {width: windowWidth} = useWindowDimensions();
    const dropDownItemHeight = 80
    const marginStyled = 10
    const fullDropdownHeaight = dropdownItemCount * (dropDownItemHeight + marginStyled)

    const collapsedTop = fullDropdownHeaight / 2 - dropDownItemHeight;
    const expandedTop = (dropDownItemHeight + marginStyled) * index;

    const isHeader = index === 0;

    const collapsedScale = 1 - index * 0.08;
    const expandedScale = 1

    
    const lightenColor = (color:string, factor:number, index:number) => {
         // Asegúrate de que el factor esté entre 0 y 1 para evitar resultados no deseados.
        factor = Math.min(1, Math.max(0, factor * index));

        // Analiza el color en sus componentes RGB.
        const red = parseInt(color.slice(1, 3), 16);
        const green = parseInt(color.slice(3, 5), 16);
        const blue = parseInt(color.slice(5, 7), 16);

        // Calcula nuevos valores RGB más claros.
        const newRed = Math.min(255, red + (255 - red) * factor);
        const newGreen = Math.min(255, green + (255 - green) * factor);
        const newBlue = Math.min(255, blue + (255 - blue) * factor);

        // Convierte los nuevos valores RGB a una cadena hexadecimal.
        const newColor = `#${Math.round(newRed).toString(16)}${Math.round(newGreen).toString(16)}${Math.round(newBlue).toString(16)}`;

        console.log('newColor',newColor)
        return newColor;
    }
    const expandedBackgroundColor = '#1B1B1B';
    const collapseBackgroundColor = lightenColor(expandedBackgroundColor, 0.015,index);

    const rStyle = useAnimatedStyle(() => {
        return{
            backgroundColor: withTiming(isExpanded.value ? expandedBackgroundColor : collapseBackgroundColor),
            top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
            transform:[
                {scale: withSpring(isExpanded.value ? expandedScale : collapsedScale)},
                {translateY: fullDropdownHeaight/2},
            ],
        }
    },[] )
   
    const styleTransformArrow = useAnimatedStyle(() => {
        return{
            transform:[
                {
                    rotate: withTiming(isHeader && isExpanded.value ? '90deg' : '0deg')
                }
            ]
        }
    },[])

    const styleIconItem = useAnimatedStyle(() => {
        return{
            opacity: withTiming(isHeader ? 1 : isExpanded.value ? 1 :0)
        }
    },[isHeader])

    return(
        <Animated.View 
            onTouchEnd={() => {
                if(isHeader) isExpanded.value = !isExpanded.value  
            }} 
            style={[{
                position:'absolute',
                zIndex: dropdownItemCount - index,
                width: windowWidth * .95,
                height:dropDownItemHeight, 
                backgroundColor:'#1B1B1B',
                //marginBottom:10,
                borderRadius:10,
            },rStyle]}>
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <View style={[
                        {position:'absolute',aspectRatio:1, width:45, backgroundColor:'#111', left:15, borderRadius:10, justifyContent:'center', alignItems:'center'}
                        ,styleIconItem]}>
                        <AntDesign name={iconName as any} size={25} color={'white'}/>
                    </View>
                    <Text style={{color:'#D4D4D4', fontSize:20,letterSpacing:1.2, textTransform:'uppercase'}}>{label}</Text>
                    <Animated.View 
                        style={[{position:'absolute',aspectRatio:1, width:45, backgroundColor:'transparent', right:15, borderRadius:10, justifyContent:'center', alignItems:'center'},styleTransformArrow]}>
                        <MaterialIcons name={isHeader ? 'arrow-forward-ios' : 'arrow-forward'} size={25} color={'#D4D4D4'}/>
                    </Animated.View>
                </View>
        </Animated.View>
    )
}

export default DropdownItem;
export type { DropdownItemType };
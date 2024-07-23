import React,{FC} from "react";
import { View } from "react-native";
import DropdownItem from "../Components/DropdownItem";
import { DropdownItemType } from "../Components/DropdownItem";
import { useSharedValue } from "react-native-reanimated";


type DropdownProps = {
    header: DropdownItemType;
    options: DropdownItemType[];
}
const Dropdown: FC<DropdownProps> = ({header,options}) => {
    const dropdownItems = [header,...options];
    const isExpanded = useSharedValue(false)
    return(
        <>
            {dropdownItems.map((item,index) => (
                <DropdownItem  
                    key={index} 
                    index={index} 
                    dropdownItemCount={dropdownItems.length}
                    isExpanded={isExpanded}
                    {...item}
                />
            ))}
        </>
    )
}

export default Dropdown;
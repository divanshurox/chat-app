import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { FontAwesome } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      iconSize={23}
      color="white"
      iconName={FontAwesome}
    />
  );
};

export default CustomHeaderButton;

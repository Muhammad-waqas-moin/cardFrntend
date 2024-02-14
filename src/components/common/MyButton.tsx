import { Button } from "@chakra-ui/react";
import React from "react";

const MyButton = (prop: Object) => {
  const { icon, iconColor, iconFamily, iconW }: any = prop;
  return (
    <Button bgGradient="linear(to-r, #67C3F3,#5A98F2)">
      <i
        className={`fa-solid ${icon}`}
        style={{
          color: `${iconColor}`,
          fontFamily: `${iconFamily}`,
          fontSize: `${iconW}`,
        }}
      ></i>
    </Button>
  );
};

export default MyButton;

import React from "react";

const AppButton = ({
  text,
  textColor,
  bgColor,
  border,
  useBorder,
  handleClick,
  type,
  disabled,
}) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={handleClick}
      style={{
        color: textColor ? textColor : "black",
        backgroundColor: bgColor ? bgColor : "white",
        border: border ? border : "none",
        borderRadius: useBorder ? useBorder : "10px",
        ...style.button,
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

const style = {
  button: {
    padding: "14px 20px",
    // borderRadius: "5px",
    fontSize: "14px",
    fontWeight: 500,
    border: "none",
  },
};

export default AppButton;

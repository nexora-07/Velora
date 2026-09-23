import React from "react";
import { useState } from "react";
import { Moon } from "lucide-react";

const Toggle = () => {
  const [toggle, setToggle] = useState(false);
  console.log(toggle);

  return (
    <>
      <Moon
        aria-label="Toggle dark mode"
        role="button"
        tabIndex={0}
        onClick={() =>
          setToggle(
            ((document.body.style.backgroundColor = toggle ? "white" : "black"),
            (document.body.style.color = toggle ? "black" : "white"),
            document.body.classList.toggle("dark-mode", !toggle),
            !toggle),
          )
        }
      />
    </>
  );
};

export default Toggle;

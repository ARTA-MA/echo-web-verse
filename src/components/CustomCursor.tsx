
import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOverClickable, setIsOverClickable] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button");
      
      setIsOverClickable(!!isLink);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleElementHover);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleElementHover);
    };
  }, []);

  if (typeof window === "undefined" || !isVisible) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${isClicking ? "scale-75" : ""} ${
        isOverClickable ? "bg-purple-500/40 scale-150" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
};

export default CustomCursor;

import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const requestRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const ringPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      if (cursorRef.current && ringRef.current) {
        // Update cursor dot position (immediate)
        cursorRef.current.style.left = `${mousePosition.current.x - 6}px`;
        cursorRef.current.style.top = `${mousePosition.current.y - 6}px`;

        // Update ring position with smooth following (easing)
        ringPosition.current.x +=
          (mousePosition.current.x - ringPosition.current.x) * 0.12;
        ringPosition.current.y +=
          (mousePosition.current.y - ringPosition.current.y) * 0.12;

        ringRef.current.style.left = `${ringPosition.current.x - 18}px`;
        ringRef.current.style.top = `${ringPosition.current.y - 18}px`;
      }
      requestRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", updateMousePosition);
    requestRef.current = requestAnimationFrame(animateCursor);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, .cursor-pointer, [role="button"], input, textarea',
    );

    const handleMouseEnter = () => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = "scale(2.5)";
        ringRef.current.style.transform = "scale(1.5)";
        ringRef.current.style.borderColor = "rgba(198, 241, 53, 0.8)";
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = "scale(1)";
        ringRef.current.style.transform = "scale(1)";
        ringRef.current.style.borderColor = "rgba(22, 163, 74, 0.5)";
      }
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <style>
        {`
          /* Hide default cursor */
          * {
            cursor: none !important;
          }
          
          /* Ensure interactive elements still show they're clickable */
          button, a, [role="button"], input, textarea, select {
            cursor: none !important;
          }
          
          /* For touch devices, show default cursor */
          @media (hover: none) and (pointer: coarse) {
            * {
              cursor: auto !important;
            }
            .custom-cursor, .custom-cursor-ring {
              display: none !important;
            }
          }
        `}
      </style>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: "#16a34a",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform 0.15s ease",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          width: "36px",
          height: "36px",
          border: "1.5px solid #16a34a",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
          transition: "all 0.1s ease",
          opacity: 0.6,
        }}
      />
    </>
  );
};

export default CustomCursor;

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LogoAnimation = () => {
  const [letters, setLetters] = useState([]);

  // This will generate the letters dynamically when the component mounts
  useEffect(() => {
    const word = "SCRAP CYCLE";
    const lettersArray = word.split("");
    setLetters(lettersArray);
  }, []);

  return (
    <motion.div
      className="logo-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="logo-text">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="letter"
            initial={{ opacity: 0, y: 10, color: "#66bb6a" }} // Initial color
            animate={{
              opacity: 1,
              y: 0,
              color: ["#66bb6a", "#43a047", "#2e7d32"], // Gradual color change
              transition: {
                delay: index * 0.4, // Delay to stagger each letter
                duration: 1.5, // Slower transition
                ease: "easeInOut",
                repeat: Infinity, // Makes the color change cycle continuously
                repeatType: "loop", // Infinite loop for color fade
              },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LogoAnimation;
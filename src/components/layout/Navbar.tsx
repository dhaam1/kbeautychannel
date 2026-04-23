'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Header from './Header';

interface NavbarProps {
  isDarkBackground?: boolean;
}

export default function Navbar({ isDarkBackground = false }: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // 아래로 스크롤하면 숨기고, 위로 스크롤하면 보여줌
    // 최상단(150px 미만)에서는 항상 보여줌
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const containerBg = isDarkBackground 
    ? "bg-black/10 border-white/10 shadow-lg" 
    : "bg-white/70 backdrop-blur-md border border-white/20 shadow-sm";

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-[5%] py-4 md:py-5 pointer-events-none"
    >
      <div className={`max-w-7xl mx-auto w-full border rounded-full px-8 py-3 pointer-events-auto transition-all duration-500 ${containerBg}`}>
        <Header isDarkBackground={isDarkBackground} />
      </div>
    </motion.div>
  );
}

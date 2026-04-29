import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
}

export default function TypewriterText({ text, delay = 0, speed = 80 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [status, setStatus] = useState<'waiting' | 'typing' | 'done'>('waiting');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    timeoutId = setTimeout(() => {
      setStatus('typing');
      let currentIndex = 0;
      
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        
        if (currentIndex === text.length) {
          clearInterval(intervalId);
          setStatus('done');
        }
      }, speed);
      
      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, delay, speed]);

  const lines = displayedText.split('\n');

  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
      {status !== 'done' && (
        <span 
          className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle animate-pulse" 
        />
      )}
    </>
  );
}

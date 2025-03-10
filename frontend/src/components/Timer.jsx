import { useEffect, useState } from 'react';

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-2xl font-bold text-white bg-blue-600 px-4 py-2 rounded-full shadow-lg">
      Tick-Tock: {timeLeft}s
    </div>
  );
};

export default Timer;
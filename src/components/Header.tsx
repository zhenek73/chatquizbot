import { motion } from 'framer-motion';
import paycashLogo from '../notext.png';
import malinkaLogo from '../malinka-ball.svg';

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex items-center justify-center gap-4 p-4 mb-6 relative z-10"
    >
      <img
        src={paycashLogo}
        alt="PayCash Logo"
        className="w-20 h-20 md:w-24 md:h-24 object-contain flex-shrink-0"
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-glow text-center">
          Новогодний квиз для чата PayCash
        </h1>
        <motion.img
          src={malinkaLogo}
          alt="Malinka"
          className="w-8 h-8 md:w-10 md:h-10"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </motion.div>
  );
};


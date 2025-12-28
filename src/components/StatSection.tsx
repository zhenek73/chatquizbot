import { motion } from 'framer-motion';
import { StatSection as StatSectionType } from '../types';

interface StatSectionProps {
  section: StatSectionType;
  index: number;
  isLocked: boolean;
  requiredScore: number;
}

export const StatSection = ({ section, index, isLocked, requiredScore }: StatSectionProps) => {
  if (isLocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="frosted-glass-dark rounded-3xl p-6 border border-white/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
          <div className="text-center">
            <div className="text-5xl mb-3">🔒</div>
            <p className="text-gray-300 font-semibold text-lg">
              Ответь правильно на {requiredScore} вопросов, чтобы открыть
            </p>
          </div>
        </div>
        <div className="opacity-30">
          <h3 className="text-xl font-bold mb-4 text-pink-primary">{section.title}</h3>
          <div className="text-gray-400 whitespace-pre-line">{section.content}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="frosted-glass rounded-3xl p-6 border border-white/10 hover:border-pink-500/30 transition-all duration-300"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-pink-primary">
        {section.title}
      </h3>
      <div className="text-gray-200 whitespace-pre-line leading-relaxed">
        {section.content}
      </div>
    </motion.div>
  );
};

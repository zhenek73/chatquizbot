import { motion } from 'framer-motion';
import { Header } from './Header';

interface QuizStartProps {
  onStart: () => void;
}

export const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10"
    >
      <Header />
      
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="frosted-glass rounded-3xl p-8 space-y-6"
        >
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <span className="text-pink-primary text-2xl">📝</span>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-white">Как играть</h3>
                <p className="text-gray-300">
                  Читай описание персонажа и выбирай правильный ответ из 4 вариантов
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-pink-primary text-2xl">⭐</span>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-white">Награды</h3>
                <p className="text-gray-300">
                  За правильные ответы открывай разделы статистики чата
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-pink-primary text-2xl">🏆</span>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-white">Статистика</h3>
                <p className="text-gray-300">
                  Чем больше правильных ответов, тем больше разделов откроется
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="frosted-glass rounded-3xl px-6 py-6 max-w-2xl mx-auto"
        >
          <div className="flex items-start space-x-4">
            <span className="text-yellow-400 text-2xl flex-shrink-0">⚠️</span>
            <p className="text-gray-300 text-sm leading-relaxed text-left">
              Дисклеймер: Все описания персонажей, характеристики (возраст, знак зодиака, рост и т.д.), а также подсказки носят исключительно юмористический и развлекательный характер. Они сгенерированы нейросетью на основе экспортированного лога чата PayCash за 2025 год и не претендуют на 100% точность. Никаких личных данных реальных людей не раскрывается — это просто новогодний фан и мемасик от сообщества! 🎄
            </p>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-gradient-to-r from-pink-600 to-purple-600 
                     text-white font-bold py-4 px-8 md:px-12 rounded-2xl 
                     shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/70
                     transition-all duration-300
                     text-lg md:text-xl"
        >
          Начать викторину 🚀
        </motion.button>
      </div>
    </motion.div>
  );
};

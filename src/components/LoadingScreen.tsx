import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center gradient-romance overflow-hidden px-8">
      {/* Twinkles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gold-soft animate-twinkle"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 29) % 100}%`,
            animationDelay: `${(i * 0.3) % 3}s`,
          }}
        />
      ))}

      <div className="relative flex flex-col items-center gap-8">
        {/* Pulsing heart with rings */}
        <div className="relative grid h-28 w-28 place-items-center">
          {[0, 0.5, 1].map((delay, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0.6, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-rose-deep/40"
            />
          ))}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-rose-deep via-rose to-gold shadow-soft"
          >
            <Heart size={36} className="text-white" fill="currentColor" strokeWidth={0} />
          </motion.div>
        </div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center font-script text-3xl text-rose-deep"
        >
          preparando sua surpresa…
        </motion.p>

        {/* Animated dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              className="h-2 w-2 rounded-full bg-rose-deep/70"
            />
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 text-center text-xs uppercase tracking-[0.3em] text-ink/40"
      >
        com amor • feito para você
      </motion.p>
    </div>
  );
};

export default LoadingScreen;

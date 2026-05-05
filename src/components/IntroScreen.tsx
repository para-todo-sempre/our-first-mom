import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { AmbientHearts } from "./MobileFrame";

type Props = {
  onStart: () => void;
};

const IntroScreen = ({ onStart }: Props) => {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden gradient-romance flex flex-col items-center justify-between safe-top safe-bottom px-6 py-10">
      <AmbientHearts />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex items-center gap-2 text-rose-deep/80"
      >
        <Sparkles size={16} />
        <span className="font-script text-lg">para você, com amor</span>
        <Sparkles size={16} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-2">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
          className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-white/40 backdrop-blur-md shadow-card"
        >
          <Heart className="text-rose-deep" size={36} fill="currentColor" strokeWidth={0} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl"
        >
          Nosso Primeiro
          <br />
          <span className="font-script text-5xl text-rose-deep sm:text-6xl">Dia das Mães</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-5 max-w-[320px] text-balance text-[15px] leading-relaxed text-ink/70"
        >
          Uma pequena surpresa para lembrar que você já é mãe antes mesmo do primeiro choro.
        </motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="no-tap-highlight relative z-10 w-full max-w-[340px] animate-pulse-soft rounded-full bg-gradient-to-r from-rose-deep via-rose to-gold px-8 py-5 text-base font-medium text-white shadow-soft"
      >
        <span className="flex items-center justify-center gap-2">
          <Heart size={18} fill="currentColor" strokeWidth={0} />
          Abrir minha surpresa
        </span>
      </motion.button>
    </div>
  );
};

export default IntroScreen;

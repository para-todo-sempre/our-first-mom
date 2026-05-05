import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { memories } from "@/data/memories";
import ProgressIndicator from "./ProgressIndicator";
import FloatingHearts from "./FloatingHearts";

type Props = {
  onFinish: () => void;
  onExit: () => void;
};

const STORY_DURATION = 7000;

const StoryScreen = ({ onFinish, onExit }: Props) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const heartId = useRef(0);

  const current = memories[index];

  const next = () => {
    if (index >= memories.length - 1) {
      onFinish();
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
  };

  const prev = () => {
    if (index === 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };

  const handleSwipe = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  const popHeart = () => {
    const id = heartId.current++;
    const x = 35 + Math.random() * 30;
    setHearts((h) => [...h, { id, x }]);
    setTimeout(() => setHearts((h) => h.filter((it) => it.id !== id)), 1700);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40, scale: 1.02 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -direction * 40, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleSwipe}
          className="absolute inset-0"
        >
          <img
            src={current.image}
            alt={current.alt}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 gradient-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-20 safe-top px-4 pt-3">
        <ProgressIndicator total={memories.length} current={index} />
        <div className="mt-3 flex items-center justify-between text-white/90">
          <span className="font-script text-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            Memória {index + 1} de {memories.length}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onExit}
            aria-label="Fechar"
            className="no-tap-highlight grid h-9 w-9 place-items-center rounded-full bg-black/30 backdrop-blur-md"
          >
            <X size={18} />
          </motion.button>
        </div>
      </div>

      {/* Tap zones */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-0 top-20 bottom-40 z-10 w-1/3 no-tap-highlight"
      />
      <button
        aria-label="Próximo"
        onClick={next}
        className="absolute right-0 top-20 bottom-40 z-10 w-1/3 no-tap-highlight"
      />

      <FloatingHearts hearts={hearts} />

      {/* Bottom card */}
      <div className="absolute inset-x-0 bottom-0 z-20 safe-bottom px-4 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${current.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl glass p-5 shadow-soft"
          >
            <h2 className="font-display text-3xl leading-tight text-white text-shadow-soft">
              {current.title}
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white/95 text-shadow-soft">
              {current.text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={prev}
            disabled={index === 0}
            className="no-tap-highlight flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white disabled:opacity-30"
            aria-label="Voltar"
          >
            <ChevronLeft size={22} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={popHeart}
            aria-label="Curtir"
            className="no-tap-highlight flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-deep to-red-soft text-white shadow-soft"
          >
            <Heart size={26} fill="currentColor" strokeWidth={0} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={next}
            className="no-tap-highlight flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-card"
            aria-label="Próximo"
          >
            <ChevronRight size={22} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default StoryScreen;

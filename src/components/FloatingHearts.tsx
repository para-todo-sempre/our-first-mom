import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";

type FloatingHeart = { id: number; x: number };

type Props = {
  hearts: FloatingHeart[];
};

const FloatingHearts = ({ hearts }: Props) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            initial={{ y: 0, opacity: 1, scale: 0.6 }}
            animate={{ y: -260, opacity: 0, scale: 1.4, rotate: (h.id % 2 ? 1 : -1) * 25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute bottom-28 text-rose-deep drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
            style={{ left: `${h.x}%` }}
          >
            <Heart size={26} fill="currentColor" strokeWidth={0} />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Floating hearts background, decorative, used on intro and final.
 */
export const AmbientHearts = () => {
  const hearts = Array.from({ length: 12 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i * 0.7) % 6;
        const duration = 7 + ((i * 1.3) % 5);
        const size = 12 + ((i * 5) % 18);
        const opacity = 0.25 + ((i * 0.07) % 0.5);
        return (
          <span
            key={i}
            className="absolute bottom-0 animate-float text-rose-deep"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity,
            }}
          >
            <Heart size={size} fill="currentColor" strokeWidth={0} />
          </span>
        );
      })}
      {/* twinkles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={`t${i}`}
          className="absolute h-1 w-1 rounded-full bg-gold-soft animate-twinkle"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 29) % 100}%`,
            animationDelay: `${(i * 0.4) % 3}s`,
          }}
        />
      ))}
    </div>
  );
};

const MobileFrame = ({ children }: Props) => {
  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-beige via-cream to-rose/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-[430px] min-h-[100dvh] overflow-hidden bg-background shadow-soft md:my-4 md:min-h-[calc(100dvh-2rem)] md:rounded-[2.5rem] md:border md:border-border/40"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MobileFrame;

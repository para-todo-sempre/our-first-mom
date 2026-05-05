import { motion } from "framer-motion";

type Props = {
  total: number;
  current: number;
};

const ProgressIndicator = ({ total, current }: Props) => {
  return (
    <div className="flex w-full gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        const isPast = i < current;
        return (
          <div
            key={i}
            className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30"
          >
            {isPast && <div className="absolute inset-0 bg-white" />}
            {isActive && (
              <motion.div
                key={`active-${current}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-white"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;

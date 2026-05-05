import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SecretLetter = ({ open, onClose }: Props) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setOpened(true), 600);
      return () => clearTimeout(t);
    } else {
      setOpened(false);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-5"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 z-[60] grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md safe-top"
          >
            <X size={18} />
          </motion.button>

          <div className="relative w-full max-w-[360px]" style={{ perspective: 1200 }}>
            {/* Envelope back */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[260px] w-full rounded-2xl bg-gradient-to-br from-rose to-rose-deep shadow-soft"
            >
              {/* Letter */}
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={opened ? { y: -180, opacity: 1 } : { y: 0, opacity: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute inset-x-3 top-3 z-10 rounded-xl bg-cream p-6 shadow-card"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, hsl(30 50% 98%) 0%, hsl(35 50% 94%) 100%)",
                }}
              >
                <div className="flex justify-center">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-rose-deep/10 text-rose-deep">
                    <Heart size={18} fill="currentColor" strokeWidth={0} />
                  </div>
                </div>
                <h3 className="mt-3 text-center font-script text-3xl text-rose-deep">
                  Carta secreta
                </h3>
                <p className="mt-3 text-center font-display text-[17px] leading-relaxed text-ink">
                  “Quando eu olho pra você, eu não vejo só a mulher que eu amo. Eu vejo a mãe da
                  nossa filha, o começo da nossa casa e o motivo de eu querer ser melhor todos os
                  dias. Obrigado por carregar nosso maior presente. Eu amo vocês duas.”
                </p>
                <div className="mt-4 text-center font-script text-xl text-gold">
                  para sempre seu
                </div>
              </motion.div>

              {/* Envelope flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: opened ? -180 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{
                  transformOrigin: "top",
                  transformStyle: "preserve-3d",
                }}
                className="absolute left-0 right-0 top-0 z-20 h-[130px]"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    background:
                      "linear-gradient(180deg, hsl(354 55% 82%) 0%, hsl(350 50% 70%) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                />
              </motion.div>

              {/* Envelope front pocket */}
              <div
                className="absolute inset-x-0 bottom-0 z-30 h-[160px]"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(354 55% 78%) 0%, hsl(350 50% 65%) 100%)",
                  clipPath: "polygon(0 38%, 100% 38%, 100% 100%, 0 100%)",
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              />

              {/* Wax seal */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: opened ? 0 : 1, opacity: opened ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-[105px] z-40 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-red-soft to-rose-deep text-white shadow-card"
              >
                <Heart size={20} fill="currentColor" strokeWidth={0} />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: opened ? 1 : 0 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center font-script text-xl text-white/90"
            >
              guarde isso no coração 🤍
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecretLetter;

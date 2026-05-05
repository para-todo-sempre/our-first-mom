import { motion } from "framer-motion";
import { Heart, Instagram, Loader2, Mail, RotateCcw } from "lucide-react";
import { useState } from "react";
import { AmbientHearts } from "./MobileFrame";
import memory5 from "@/assets/memory-5.png";
import { shareToInstagram } from "@/lib/share";
import { toast } from "sonner";

type Props = {
  onReplay: () => void;
  onOpenLetter: () => void;
};

const FinalScreen = ({ onReplay, onOpenLetter }: Props) => {
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    const result = await shareToInstagram();
    setSharing(false);
    if (result === "shared") toast.success("Pronto! Escolha o Instagram Stories ✨");
    else if (result === "downloaded")
      toast.success("Imagem salva! Abra o Instagram e poste nos Stories 💌");
    else if (result === "error") toast.error("Não foi possível gerar a imagem.");
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Blurred photo background */}
      <div
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url(${memory5})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(28px) saturate(1.1)",
        }}
      />
      <div className="absolute inset-0 gradient-final opacity-90" />

      <AmbientHearts />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-between safe-top safe-bottom px-6 py-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-script text-xl text-rose-deep/80"
        >
          ~ para sempre ~
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 110, delay: 0.3 }}
            className="relative mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-rose-deep via-rose to-gold shadow-soft"
            >
              <Heart size={54} className="text-white" fill="currentColor" strokeWidth={0} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="absolute inset-0 rounded-full bg-rose"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-display text-[34px] leading-[1.05] text-ink"
          >
            Feliz primeiro
            <br />
            <span className="font-script text-5xl text-rose-deep">Dia das Mães,</span>
            <br />
            meu amor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-5 max-w-[340px] text-[15px] leading-relaxed text-ink/80"
          >
            Você já é mãe no cuidado, na força, na espera, no amor e em cada detalhe. Nossa filha
            ainda nem chegou, mas já tem o melhor lar do mundo: você.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-4 font-script text-2xl text-rose-deep"
          >
            Com amor, da nossa família que está só começando.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex w-full max-w-[340px] flex-col gap-3"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenLetter}
            className="no-tap-highlight flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-deep via-rose to-gold px-6 py-4 font-medium text-white shadow-soft"
          >
            <Mail size={18} />
            Guardar esse momento
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            className="no-tap-highlight flex items-center justify-center gap-2 rounded-full bg-white/70 px-6 py-4 font-medium text-ink backdrop-blur-md"
          >
            <RotateCcw size={16} />
            Rever nossa história
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Instagram share button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, type: "spring" }}
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        disabled={sharing}
        aria-label="Compartilhar nos Stories"
        className="no-tap-highlight absolute right-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#962fbf] text-white shadow-soft safe-top disabled:opacity-70"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
      >
        {sharing ? <Loader2 size={20} className="animate-spin" /> : <Instagram size={20} />}
      </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            className="no-tap-highlight flex items-center justify-center gap-2 rounded-full bg-white/70 px-6 py-4 font-medium text-ink backdrop-blur-md"
          >
            <RotateCcw size={16} />
            Rever nossa história
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalScreen;

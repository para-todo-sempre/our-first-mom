import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MobileFrame from "@/components/MobileFrame";
import IntroScreen from "@/components/IntroScreen";
import StoryScreen from "@/components/StoryScreen";
import FinalScreen from "@/components/FinalScreen";
import SecretLetter from "@/components/SecretLetter";

type Screen = "intro" | "story" | "final";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <MobileFrame>
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <IntroScreen onStart={() => setScreen("story")} />
          </motion.div>
        )}

        {screen === "story" && (
          <motion.div
            key="story"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StoryScreen
              onFinish={() => setScreen("final")}
              onExit={() => setScreen("intro")}
            />
          </motion.div>
        )}

        {screen === "final" && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FinalScreen
              onReplay={() => setScreen("story")}
              onOpenLetter={() => setLetterOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SecretLetter open={letterOpen} onClose={() => setLetterOpen(false)} />
    </MobileFrame>
  );
};

export default Index;

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MobileFrame from "@/components/MobileFrame";
import IntroScreen from "@/components/IntroScreen";
import StoryScreen from "@/components/StoryScreen";
import FinalScreen from "@/components/FinalScreen";
import SecretLetter from "@/components/SecretLetter";
import LoadingScreen from "@/components/LoadingScreen";
import { memories } from "@/data/memories";

type Screen = "loading" | "intro" | "story" | "final";

const MIN_LOADING_MS = 1600;

const Index = () => {
  const [screen, setScreen] = useState<Screen>("loading");
  const [letterOpen, setLetterOpen] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const promises = memories.map(
      (m) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = m.image;
        })
    );

    Promise.all(promises).then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
      setTimeout(() => setScreen("intro"), remaining);
    });
  }, []);

  return (
    <MobileFrame>
      <AnimatePresence mode="wait">
        {screen === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen />
          </motion.div>
        )}

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

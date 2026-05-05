import { toPng } from "html-to-image";
import memory5 from "@/assets/memory-5.png";

export type ShareResult = "shared" | "downloaded" | "cancelled" | "error";

const buildShareCardHtml = () => {
  const div = document.createElement("div");
  div.style.cssText = `
    position: fixed; left: -9999px; top: 0;
    width: 1080px; height: 1920px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 120px 90px;
    background: linear-gradient(160deg, #fbeae6 0%, #f5d0cb 50%, #e6c79c 100%);
    color: #2b1a1f;
    font-family: 'Cormorant Garamond', Georgia, serif;
    text-align: center;
    overflow: hidden;
  `;

  div.innerHTML = `
    <div style="position:absolute;inset:0;background-image:url(${memory5});background-size:cover;background-position:center;opacity:0.18;filter:blur(12px) saturate(1.1);"></div>
    <div style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:40px;">
      <div style="font-family:'Dancing Script',cursive;font-size:64px;color:#b65b6a;">para você, com amor</div>
      <div style="width:160px;height:160px;border-radius:9999px;background:linear-gradient(135deg,#d68a92,#e6c79c);display:flex;align-items:center;justify-content:center;box-shadow:0 30px 80px -20px rgba(120,40,60,0.4);">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="white"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
      </div>
      <h1 style="font-size:140px;line-height:1;margin:0;font-weight:500;">Feliz primeiro</h1>
      <h1 style="font-family:'Dancing Script',cursive;font-size:180px;line-height:1;margin:0;color:#b65b6a;">Dia das Mães</h1>
      <h1 style="font-size:140px;line-height:1;margin:0;font-weight:500;">meu amor</h1>
      <p style="font-family:'Inter',sans-serif;font-size:46px;line-height:1.5;max-width:820px;margin-top:30px;color:#3a2128;">
        Você já é mãe no cuidado, na força, na espera, no amor e em cada detalhe.
      </p>
      <div style="font-family:'Dancing Script',cursive;font-size:70px;color:#b65b6a;margin-top:20px;">
        nossa família começa em você 🤍
      </div>
    </div>
  `;

  return div;
};

export const generateShareImage = async (): Promise<Blob> => {
  const node = buildShareCardHtml();
  document.body.appendChild(node);
  try {
    // Wait one frame so fonts/images settle
    await new Promise((r) => setTimeout(r, 100));
    const dataUrl = await toPng(node, {
      pixelRatio: 1,
      cacheBust: true,
      width: 1080,
      height: 1920,
    });
    const res = await fetch(dataUrl);
    return await res.blob();
  } finally {
    document.body.removeChild(node);
  }
};

const SHARE_TEXT =
  "Nosso Primeiro Dia das Mães 🤍 — uma surpresa pra você, meu amor. Nossa família começa em você.";

export const shareToInstagram = async (): Promise<ShareResult> => {
  try {
    const blob = await generateShareImage();
    const file = new File([blob], "dia-das-maes.png", { type: "image/png" });

    // Try native share with file (mobile only)
    const navAny = navigator as Navigator & {
      canShare?: (data: { files?: File[] }) => boolean;
      share?: (data: { files?: File[]; text?: string; title?: string }) => Promise<void>;
    };

    if (navAny.canShare && navAny.canShare({ files: [file] }) && navAny.share) {
      try {
        await navAny.share({
          files: [file],
          title: "Nosso Primeiro Dia das Mães",
          text: SHARE_TEXT,
        });
        return "shared";
      } catch (err) {
        const e = err as DOMException;
        if (e?.name === "AbortError") return "cancelled";
      }
    }

    // Fallback: download the image
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nosso-primeiro-dia-das-maes.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return "downloaded";
  } catch (err) {
    console.error(err);
    return "error";
  }
};

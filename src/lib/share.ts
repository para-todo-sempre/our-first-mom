import memory5 from "@/assets/memory-5.png";

export type ShareResult = "shared" | "downloaded" | "cancelled" | "error";

const W = 1080;
const H = 1920;

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const drawHeart = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) => {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(size / 30, size / 30);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.bezierCurveTo(-16, -8, -16, -22, -8, -22);
  ctx.bezierCurveTo(-3, -22, 0, -18, 0, -14);
  ctx.bezierCurveTo(0, -18, 3, -22, 8, -22);
  ctx.bezierCurveTo(16, -22, 16, -8, 0, 8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

export const generateShareImage = async (): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#fbeae6");
  grad.addColorStop(0.5, "#f5d0cb");
  grad.addColorStop(1, "#e6c79c");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Background photo (blurred-style, low opacity)
  try {
    const img = await loadImage(memory5);
    const ratio = Math.max(W / img.width, H / img.height);
    const dw = img.width * ratio;
    const dh = img.height * ratio;
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.filter = "blur(20px) saturate(1.1)";
    ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    ctx.restore();
  } catch {
    // ignore image errors, keep gradient
  }

  // Soft top-bottom vignette overlay
  const vg = ctx.createLinearGradient(0, 0, 0, H);
  vg.addColorStop(0, "rgba(255,255,255,0.25)");
  vg.addColorStop(0.5, "rgba(255,255,255,0)");
  vg.addColorStop(1, "rgba(230,199,156,0.35)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // Decorative small hearts
  const positions = [
    [120, 280, 28, "rgba(182,91,106,0.5)"],
    [960, 320, 22, "rgba(214,138,146,0.55)"],
    [180, 1640, 32, "rgba(214,138,146,0.45)"],
    [920, 1700, 26, "rgba(182,91,106,0.4)"],
    [80, 960, 18, "rgba(230,199,156,0.6)"],
    [1010, 1100, 20, "rgba(214,138,146,0.45)"],
  ];
  positions.forEach(([x, y, s, c]) => drawHeart(ctx, x as number, y as number, s as number, c as string));

  // Top label
  ctx.fillStyle = "#b65b6a";
  ctx.textAlign = "center";
  ctx.font = "italic 64px 'Dancing Script', 'Georgia', cursive";
  ctx.fillText("para você, com amor", W / 2, 380);

  // Big heart medallion
  ctx.save();
  ctx.shadowColor = "rgba(120,40,60,0.35)";
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 20;
  const medGrad = ctx.createLinearGradient(W / 2 - 80, 480, W / 2 + 80, 640);
  medGrad.addColorStop(0, "#d68a92");
  medGrad.addColorStop(1, "#e6c79c");
  ctx.fillStyle = medGrad;
  ctx.beginPath();
  ctx.arc(W / 2, 560, 90, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  drawHeart(ctx, W / 2, 565, 80, "#ffffff");

  // Title block
  ctx.fillStyle = "#2b1a1f";
  ctx.font = "500 110px 'Cormorant Garamond', 'Georgia', serif";
  ctx.fillText("Feliz primeiro", W / 2, 800);

  ctx.fillStyle = "#b65b6a";
  ctx.font = "italic 160px 'Dancing Script', 'Georgia', cursive";
  ctx.fillText("Dia das Mães", W / 2, 970);

  ctx.fillStyle = "#2b1a1f";
  ctx.font = "500 110px 'Cormorant Garamond', 'Georgia', serif";
  ctx.fillText("meu amor", W / 2, 1110);

  // Decorative divider
  ctx.fillStyle = "#b65b6a";
  ctx.beginPath();
  ctx.arc(W / 2 - 60, 1200, 5, 0, Math.PI * 2);
  ctx.arc(W / 2, 1200, 5, 0, Math.PI * 2);
  ctx.arc(W / 2 + 60, 1200, 5, 0, Math.PI * 2);
  ctx.fill();

  // Body text
  ctx.fillStyle = "#3a2128";
  ctx.font = "400 44px 'Inter', system-ui, sans-serif";
  const body =
    "Você já é mãe no cuidado, na força, na espera, no amor e em cada detalhe.";
  const lines = wrapText(ctx, body, 800);
  let y = 1310;
  lines.forEach((ln) => {
    ctx.fillText(ln, W / 2, y);
    y += 64;
  });

  // Signature
  ctx.fillStyle = "#b65b6a";
  ctx.font = "italic 70px 'Dancing Script', 'Georgia', cursive";
  ctx.fillText("nossa família começa em você", W / 2, y + 90);

  drawHeart(ctx, W / 2, y + 180, 40, "#b65b6a");

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("blob failed"))), "image/png", 0.95);
  });
};

const SHARE_TEXT =
  "Nosso Primeiro Dia das Mães 🤍 — uma surpresa pra você, meu amor.";

export const shareToInstagram = async (): Promise<ShareResult> => {
  try {
    const blob = await generateShareImage();
    const file = new File([blob], "dia-das-maes.png", { type: "image/png" });

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

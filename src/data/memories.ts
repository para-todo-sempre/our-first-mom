import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";

export type Memory = {
  id: number;
  image: string;
  title: string;
  text: string;
  alt: string;
};

export const memories: Memory[] = [
  {
    id: 1,
    image: memory1,
    title: "Antes de te ver",
    alt: "Ultrassom da nossa filha",
    text: "Antes mesmo de te ver, nós já te amávamos… e hoje, no primeiro Dia das Mães dela, eu vejo um milagre sendo gerado junto com um amor que não cabe no peito. Você já é a melhor mãe do mundo antes mesmo de te chamar assim. 🤍",
  },
  {
    id: 2,
    image: memory2,
    title: "Nossa promessa",
    alt: "Casal se beijando com camisa Papai",
    text: "Esse beijo carrega uma promessa… de amor, de cuidado e de uma família que Deus começou a escrever. No seu primeiro Dia das Mães, eu celebro a mulher que você já se tornou: forte, linda e cheia de amor pra dar. Nossa filha tem sorte de te ter. ❤️",
  },
  {
    id: 3,
    image: memory3,
    title: "O começo",
    alt: "Roupinha, sapatinhos, teste e ultrassom na grama",
    text: "Tudo começou com um 'positivo'… e junto com ele, nasceu uma mãe incrível. No seu primeiro Dia das Mães, ainda com tudo tão pequeno nas mãos, já é gigante dentro do coração. Você é o começo do nosso maior milagre. 🍼✨",
  },
  {
    id: 4,
    image: memory4,
    title: "Você é abrigo",
    alt: "Casal com vestido azul segurando ultrassom",
    text: "Eu te vejo… e vejo uma mãe sendo formada em cada detalhe, em cada cuidado, em cada oração. Nesse primeiro Dia das Mães, eu agradeço a Deus por te escolher pra carregar o maior presente da nossa vida. Você é abrigo, é amor, é tudo. 🤍",
  },
  {
    id: 5,
    image: memory5,
    title: "Nossa família",
    alt: "Casal com blocos BABY",
    text: "Hoje é o seu primeiro Dia das Mães… e mesmo antes do primeiro choro, você já mudou tudo em nós. Seu amor já construiu um lar inteiro dentro do seu ventre. Obrigado por ser essa mulher incrível… nossa família começa em você. 🥹❤️",
  },
];

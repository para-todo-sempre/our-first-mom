## Nosso Primeiro Dia das Mães — App-presente romântico

Web app mobile-first em formato de história interativa (estilo stories), com 5 memórias reais do casal, tela final emocional e carta secreta animada.

### Estrutura de telas

1. **IntroScreen** — abertura com degradê rosê/dourado, corações flutuando, título "Nosso Primeiro Dia das Mães", subtítulo e botão pulsante "Abrir minha surpresa".
2. **StoryScreen** — carrossel de 5 memórias estilo Instagram Stories:
   - Imagem em tela cheia (object-cover), degradê escuro inferior
   - Card translúcido (backdrop-blur) com título curto + texto da mensagem
   - Barra de progresso segmentada no topo (5 barras)
   - Legenda "Memória X de 5"
   - Botões: voltar, próximo, coração (com efeito de corações subindo)
   - Suporte a swipe (esquerda/direita) e tap nas laterais
   - Transição fade + slide entre memórias
3. **FinalScreen** — fundo rosê/dourado com foto desfocada, coração grande pulsando, confetes/corações leves, título "Feliz primeiro Dia das Mães, meu amor", mensagem, assinatura, botões "Rever nossa história" e "Guardar esse momento".
4. **SecretLetter** — modal com envelope animado abrindo (flap dobrando), carta deslizando para fora com a mensagem final secreta, em papel texturizado com tipografia elegante.

### Memórias (já mapeadas para as imagens enviadas)

| # | Imagem | Título | Mensagem |
|---|--------|--------|----------|
| 1 | Ultrassom (osso nasal) | Antes de te ver | "Antes mesmo de te ver, nós já te amávamos…" |
| 2 | Beijo com camisa "Papai" | Nossa promessa | "Esse beijo carrega uma promessa…" |
| 3 | Roupinha + sapatinhos + teste + ultrassom na grama | O começo | "Tudo começou com um 'positivo'…" |
| 4 | Casal vestido azul com tirinha de ultrassom | Você é abrigo | "Eu te vejo… e vejo uma mãe sendo formada…" |
| 5 | Casal com blocos BABY | Nossa família | "Hoje é o seu primeiro Dia das Mães…" |

Textos serão usados exatamente como enviados, sem alteração.

### Design system

- Paleta: branco, rosê (#F5D0CB / #E8B4B8), dourado suave (#D4AF7A), bege (#F5EDE0), vermelho claro, preto transparente para overlays
- Fontes: **Playfair Display** (títulos, serifada elegante) + **Inter** (texto)
- Cantos arredondados grandes (rounded-3xl), sombras suaves, backdrop-blur nos cards
- Container central com max-width 430px, altura 100dvh, safe-area-inset
- Sem layout desktop — fundo lateral neutro quando viewport > 430px

### Microinterações (Framer Motion)

- Botão de abrir com pulse infinito
- Fade + slide entre memórias
- Corações subindo ao tocar no botão de coração (partículas aleatórias)
- Brilho/shimmer suave nas telas
- Confetes/corações leves na tela final
- Escala 0.95 ao tocar (haptic visual) em todos os botões
- Envelope abrindo com rotação 3D do flap + carta deslizando

### Componentes

`App`, `IntroScreen`, `StoryScreen`, `StoryCard`, `ProgressIndicator`, `FloatingHearts`, `FinalScreen`, `SecretLetter`, mais um `MobileFrame` wrapper.

> Música: deixarei o botão de volume removido por enquanto (você pediu sem música). Posso plugar depois se quiser.

### Detalhes técnicos

- Stack: React + Vite + Tailwind + Framer Motion + Lucide (já no projeto)
- Imagens copiadas para `src/assets/` e importadas como ES modules para otimização do Vite
- Array `memories` em `src/data/memories.ts`
- Estado de tela controlado em `Index.tsx` (intro → story → final → letter), sem rotas extras
- "Guardar esse momento": abre a SecretLetter (modal animado)
- Sem backend, sem banco, sem formulário
- Tailwind config: adicionar keyframes para float, shimmer, pulse-soft; fontes via Google Fonts no `index.html`

### Entrega

App pronto para abrir no celular como um presente — tela de abertura emocional, álbum interativo com as 5 fotos reais, tela final com confetes e a carta secreta surpresa ao final.
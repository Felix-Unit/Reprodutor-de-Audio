

```markdown
# Reprodutor de Áudio

Reprodutor de áudio web com visualizador dinâmico, lista de reprodução interativa e suporte a arquivos locais. Construído com HTML, CSS e JavaScript puro — sem dependências externas.

![Preview do Player](https://via.placeholder.com/400x400?text=Audio+Player+Preview)

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Usar](#como-usar)
- [Personalização](#personalização)
- [Detalhes Técnicos](#detalhes-técnicos)
- [Compatibilidade](#compatibilidade)
- [Licença](#licença)

---

## Visão Geral

O projeto oferece uma interface moderna e responsiva para reprodução de áudio, incluindo:

- **3 faixas de exemplo** carregadas de fontes externas (SoundHelix)
- **Visualizador animado** que reage ao estado de reprodução
- **Controles completos** (play/pause, anterior, próxima, repetir, volume)
- **Lista de reprodução** com remoção de itens
- **Importação de arquivos locais** (MP3, WAV, OGG, etc.)

A interface é otimizada para dispositivos móveis e desktops, com um tema escuro elegante.

---

## Funcionalidades

### 🎵 Reprodução de Áudio
- Play, pause, faixa anterior e próxima
- Barra de progresso clicável e arrastável
- Exibição de tempo atual e duração total
- Modo de repetição (loop da faixa atual)

### 🎨 Visualizador
- Efeito de picos coloridos animados que simulam um equalizador
- Animação sincronizada com o estado de reprodução (pausa/execução)
- 10 barras com cores e velocidades variadas

### 📋 Lista de Reprodução
- Exibição de título e artista
- Destaque visual para a faixa em execução
- Remoção individual de músicas
- Scroll suave com barra personalizada

### 📁 Arquivos Locais
- Botão "+ Adicionar" para importar múltiplos arquivos de áudio
- Nome do arquivo usado como título, "Arquivo Local" como artista
- URLs temporárias (Object URL) para reprodução imediata

### 🔊 Controle de Volume
- Slider de 0% a 100%
- Ícone de alto-falante integrado

---

## Estrutura do Projeto

```
.
├── index.html      # Estrutura HTML do player
├── main.js         # Lógica de reprodução e manipulação da interface
└── style.css       # Estilização completa (tema escuro)
```

### Descrição dos Arquivos

| Arquivo      | Responsabilidade                                                                 |
|--------------|----------------------------------------------------------------------------------|
| `index.html` | Contém a estrutura semântica do player, com `audio` element, botões SVG e containers. |
| `main.js`    | Gerencia o estado da aplicação, eventos de áudio, renderização dinâmica da playlist e importação de arquivos. |
| `style.css`  | Define o tema escuro, variáveis CSS, animações do visualizador e responsividade. |

---

## Como Usar

### 1. Execução Local
Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não requer servidor local.

### 2. Adicionar Músicas
- Clique em **"+ Adicionar"** na seção da playlist.
- Selecione um ou mais arquivos de áudio do seu dispositivo.
- As faixas aparecerão no final da lista.

### 3. Controles
| Ação                | Como fazer                                                      |
|---------------------|-----------------------------------------------------------------|
| Reproduzir / Pausar | Clique no botão central (▶ / ⏸)                                |
| Próxima faixa       | Clique em ⏭                                                    |
| Faixa anterior      | Clique em ⏮                                                    |
| Avançar/Retroceder  | Arraste a barra de progresso                                    |
| Ajustar volume      | Use o slider ao lado do ícone de alto-falante                   |
| Repetir faixa       | Clique em 🔁 (fica verde quando ativado)                        |
| Remover da lista    | Clique no ❌ ao lado de cada música                              |

### 4. Comportamento da Lista Vazia
Ao remover todas as músicas, o player exibirá a mensagem "Sem músicas" e desabilitará a reprodução.

---

## Personalização

### Cores
Edite as variáveis CSS no início do `style.css`:

```css
:root {
    --bg-color: #121212;          /* Fundo da página */
    --player-bg: #1e1e1e;         /* Fundo do player */
    --text-main: #ffffff;         /* Texto principal */
    --text-secondary: #b3b3b3;    /* Texto secundário */
    --accent-color: #1db954;      /* Cor de destaque (verde) */
    --hover-color: #1ed760;       /* Cor ao passar o mouse */
}
```

### Visualizador
As cores e velocidades das barras são definidas no array `colorList` (linha ~35 do `main.js`):

```javascript
const colorList = ['#7d30fa', 'darkblue', 'blue', '#00ccff', 'green', 
                   'lime', 'yellow', 'orange', 'red', 'darkred'];
```

### Fontes de Áudio Padrão
Modifique o array `songs` no início do `main.js` para usar suas próprias URLs:

```javascript
let songs = [
    {
        title: "Nome da Música",
        artist: "Nome do Artista",
        src: "https://exemplo.com/audio.mp3"
    }
];
```

---

## Detalhes Técnicos

### Estados Gerenciados
| Variável          | Tipo    | Descrição                                      |
|-------------------|---------|------------------------------------------------|
| `currentSongIndex`| Number  | Índice da música atual na lista                |
| `isPlaying`       | Boolean | Estado de reprodução                           |
| `isDraggingProgress` | Boolean | Impede atualização da barra durante arraste    |
| `isRepeating`     | Boolean | Modo de repetição ativado                      |

### Eventos do Áudio
- **`timeupdate`**: Atualiza barra de progresso e tempo atual
- **`loadedmetadata`**: Exibe duração total ao carregar metadados
- **`ended`**: Gerencia próxima faixa ou repetição

### Manipulação de Arquivos
A API `URL.createObjectURL()` gera URLs temporárias para os arquivos locais. Esses objetos devem ser revogados manualmente se o player for descartado (não implementado nesta versão).

### Visualizador Técnico
As barras do visualizador são geradas dinamicamente através da função `createPeak()`, que cria elementos `div` com classes `peak type-p` (superior) e `peak type-s` (reflexo inferior). A animação é controlada pela classe `.playing` no container.

---

## Compatibilidade

| Navegador          | Suporte |
|---------------------|---------|
| Chrome 90+          | ✓       |
| Firefox 88+         | ✓       |
| Safari 14+          | ✓       |
| Edge 90+            | ✓       |
| Opera 76+           | ✓       |

**Nota**: O elemento `input[type="range"]` é estilizado com prefixos `-webkit` e `-moz`. Para Firefox, pode haver pequenas diferenças visuais no slider.

---

## Possíveis Melhorias Futuras

- [ ] Suporte a arrastar músicas na playlist (reordenar)
- [ ] Persistência da playlist via `localStorage`
- [ ] Extração automática de metadados de arquivos (ID3 tags)
- [ ] Modos de repetição adicionais (repetir playlist, aleatório)
- [ ] Máscara de capa de álbum customizada
- [ ] Teclas de atalho (espaço para play/pause, setas para navegar)
- [ ] Renamento na UI

---

## Licença

Este projeto está disponível sob a licença MIT.

---

**Desenvolvido com ❤️, HTML, CSS e JavaScript puro.**
```

Essa documentação cobre desde a instalação até detalhes técnicos, permitindo que qualquer pessoa entenda e modifique o projeto facilmente.
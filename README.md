```markdown
# 🎵 Reprodutor de Áudio

Um reprodutor de música web moderno e responsivo, feito com HTML, CSS e JavaScript puro, sem dependências externas. Inclui visualizador animado, playlist dinâmica e suporte a arquivos locais.

![Preview do Player](https://via.placeholder.com/800x400/1e1e1e/1db954?text=Audio+Player+Preview)

---

## ✨ Funcionalidades

- **Reprodução completa** – play, pause, faixa anterior/próxima, barra de progresso e modo de repetição
- **Visualizador animado** – equalizador com 10 barras coloridas que reagem ao play
- **Playlist interativa** – exibição de títulos, destaque da faixa atual, remoção de músicas
- **Importação de arquivos** – adicione músicas do seu computador (MP3, WAV, OGG, etc.)
- **Controle de volume** independente
- **Interface escura e responsiva** – pronto para mobile e desktop

---

## 🚀 Começando em 2 passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repo.git
   ```

2. **Abra o arquivo `index.html`**  
   Basta usar qualquer navegador moderno. Nenhum servidor é necessário.

---

## 📖 Como usar

### ▶️ Controles básicos
| Botão          | Ação                              |
|----------------|-----------------------------------|
| ▶ / ⏸         | Reproduzir / Pausar               |
| ⏮ / ⏭         | Música anterior / próxima         |
| 🔁             | Ativar repetição da música atual  |
| Slider no alto-falante | Ajustar volume             |
| Barra de progresso | Arrastar para avançar/retroceder |

### ➕ Adicionar músicas
Clique no botão **`+ Adicionar`** e selecione um ou mais arquivos de áudio. As novas faixas aparecerão no final da lista.

### 🗑️ Remover músicas
Cada item da playlist possui um **❌** – clique para remover a faixa.

---

## 🎨 Personalização

### 🎚️ Cores
Edite as variáveis no início do arquivo `style.css`:

```css
:root {
    --bg-color: #121212;
    --player-bg: #1e1e1e;
    --accent-color: #1db954;   /* verde padrão */
    --hover-color: #1ed760;
    /* ... outras variáveis */
}
```

### 🎶 Músicas iniciais
No arquivo `main.js`, modifique o array `songs` para trocar as faixas padrão:

```javascript
let songs = [
    {
        title: "Sua música",
        artist: "Artista",
        src: "https://exemplo.com/musica.mp3"
    }
];
```

### 🌈 Visualizador
As cores das barras podem ser alteradas no array `colorList` dentro de `main.js`.

---

## 🛠️ Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

- HTML semântico com elementos nativos (`<audio>`)
- CSS moderno (variáveis, flexbox, animações keyframes)
- JavaScript vanilla (sem frameworks ou bibliotecas)

---

## 📂 Estrutura do projeto

```
.
├── index.html   # Estrutura e elementos do player
├── main.js      # Lógica, eventos e manipulação do DOM
└── style.css    # Estilização completa e variáveis de tema
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ **Dúvidas ou sugestões?** Sinta-se à vontade para abrir uma issue ou enviar um pull request!
```
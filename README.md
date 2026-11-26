# PetShop Amigo Fiel — Projeto Fundamentos de Sistemas Web (Fase 1 e Fase 2)

Este repositório contém o código-fonte completo do sistema web do **PetShop Amigo Fiel**, desenvolvido para a disciplina *Fundamentos de Sistemas Web* (PUCRS).

## Evolução e Ajustes Realizados (Fase 1 → Fase 2)

Na **Fase 1**, o sistema foi estruturado exclusivamente em HTML5 semântico. Na **Fase 2**, foram realizados os seguintes ajustes e evoluções:

1. **Diagramação e Estilização (CSS3 + Bootstrap 5):**
   - Inclusão do Bootstrap 5 (via CDN) e criação da folha de estilos externa [`css/style.css`](css/style.css).
   - Substituição de atributos de largura fixa em imagens (`width`) por cards responsivos, grid do Bootstrap e barra de navegação adaptável para dispositivos móveis.
   - Implementação de **carrossel de imagens** na página inicial (`index.html`).

2. **Dinamismo e Funções Temporais (JavaScript):**
   - Criação do arquivo externo [`js/script.js`](js/script.js) devidamente comentado.
   - Relógio em tempo real e indicador automático de status da loja (*Aberto agora* / *Fechado no momento*) usando `setInterval`.
   - Exibição de aviso promocional temporizado na página inicial usando `setTimeout`.
   - Máscaras de CPF e telefone, cálculo dinâmico de valor estimado e confirmação visual do agendamento.

3. **Formulário de Cadastro e Agendamento (`agendamento.html`):**
   - Cadastro completo do cliente (nome, CPF, telefone, e-mail, endereço e sexo) e do pet (nome, raça, idade e porte).
   - Escolha dos serviços (**Banho** e/ou **Tosa**), método (**Tele-busca** ou **Entrega do pet no local**) e **calendário** para seleção de dia e horário.

4. **Acessibilidade:**
   - Audiodescrição detalhada no atributo `alt` de todas as imagens.
   - Link *"Pular para o conteúdo principal"* para navegação via teclado, uso de `aria-label` e `aria-live`.
   - Barra de acessibilidade com botões de **Alto Contraste** e ajuste de fonte (**A- / A / A+**).

## Estrutura de Arquivos

```text
petshop-web/
├── index.html          # Página inicial com carrossel Bootstrap e categorias
├── produtos.html       # Catálogo das 3 categorias de produtos
├── servicos.html       # Detalhamento e tabela de serviços
├── agendamento.html    # Formulário de cadastro (cliente/pet) e agendamento
├── ajuda.html          # Página de ajuda e documentação do sistema
├── README.md           # Arquivo de ajuda do repositório
├── css/
│   └── style.css       # Estilos customizados e modo Alto Contraste
├── js/
│   └── script.js       # Funções temporais, acessibilidade e formulário
└── imagens/
    ├── banho_tosa.jpg
    ├── brinquedo_corda.jpg
    ├── cama_pet.jpg
    ├── fralda_pet.jpg
    ├── racao_caes.jpg
    ├── racao_gatos.jpg
    └── tapete_higienico.jpg
```

## Autor

- **Zédles dos Reis Santos** — PUCRS (Fundamentos de Sistemas Web, 2026)

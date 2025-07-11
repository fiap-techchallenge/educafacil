# EducaFácil - Arquitetura de Design Atômico

## Estrutura do Projeto

Este projeto segue a metodologia de Atomic Design para organização de componentes, utilizando o shadcn/ui como base:

### Componentes Base (`/components/ui/`)

Componentes base do shadcn/ui que fornecem a fundação do sistema de design:

- Botões, campos, diálogos, menus e outros elementos básicos
- Baseados na biblioteca Radix UI para acessibilidade e interatividade

### 🔬 Átomos (`/components/atoms/`)

Blocos básicos de construção da interface, personalizados a partir dos componentes base:

- `button/` - Componente de botão com variantes
- `input/` - Componente de campo de entrada
- `label/` - Componente de etiqueta
- `badge/` - Componente de distintivo/tag
- `avatar/` - Componente de avatar com imagem e fallback
- `switch/` - Componente de interruptor
- `card/` - Componentes de container de cartão
- `separator/` - Componente de divisor

### 🧬 Moléculas (`/components/molecules/`)

Combinações simples de átomos:

- `form-field/` - Etiqueta + Campo de entrada + Mensagem de erro
- `user-info/` - Avatar + Nome + Exibição de email
- `stat-card/` - Ícone + Etiqueta + Exibição de valor
- `activity-card/` - Cartão complexo para exibição de atividades
- `search-bar/` - Campo de busca com botão de filtro

### 🧩 Componentes Personalizados (`/components/custom/`)

Versões customizadas dos componentes base para uso específico no projeto:

- Alertas, avatares, botões, cards e outros elementos adaptados
- Estilos personalizados mantendo a base funcional do shadcn/ui

### 🦠 Organismos (`/components/organisms/`)

Componentes complexos feitos de moléculas e átomos:

- `top-navigation/` - Navegação principal com suporte para dispositivos móveis
- `profile-section/` - Seção completa de informações de perfil
- `activities-section/` - Seção de gerenciamento de atividades

### 📄 Templates (`/components/templates/`)

Layouts de página sem conteúdo:

- `main-layout/` - Layout base com navegação
- `profile-layout/` - Layout específico para perfil

### 📱 Páginas (`/app/`)

Instâncias específicas de templates com conteúdo real:

- `page.tsx` - Página de login
- `home/page.tsx` - Página do painel
- `profile/page.tsx` - Página de perfil
- `settings/page.tsx` - Página de configurações
- `search/page.tsx` - Página de busca
- `submit/page.tsx` - Página de envio de atividade

## Dependências

### Dependências Principais

- **Next.js 15.2.4** - Framework React
- **React 19** - Biblioteca de UI
- **TypeScript 5+** - Segurança de tipos
- **Tailwind CSS 3.4.17** - Estilização

### Dependências de UI

- **shadcn/ui** - Sistema de componentes baseado em Radix UI
- **Radix UI** - Primitivos de UI acessíveis (@radix-ui/react-\*)
- **Lucide React** - Biblioteca de ícones
- **clsx** - Nomes de classes condicionais
- **tailwind-merge** - Mesclagem de classes Tailwind
- **class-variance-authority** - Estilos variantes para componentes

### Dependências de Formulários e Validação

- **react-hook-form** - Gerenciamento de formulários
- **@hookform/resolvers** - Integrações para validação
- **zod** - Validação de esquemas tipados

### Dependências Adicionais

- **next-themes** - Suporte para temas claro/escuro
- **sonner** - Sistema de toasts/notificações
- **recharts** - Visualização de dados e gráficos
- **date-fns** - Manipulação de datas
- **embla-carousel-react** - Carrosséis e sliders
- **vaul** - Componentes de drawer

## Benefícios do Design Atômico

### 🔧 Manutenibilidade

- Hierarquia clara de componentes
- Princípio de responsabilidade única
- Fácil localização e modificação de componentes

### 📈 Escalabilidade

- Componentes reutilizáveis em todos os níveis
- Sistema de design consistente
- Facilidade para adicionar novos recursos

### ⚡ Desempenho

- Tamanho de pacote otimizado
- Compatível com tree-shaking
- Dependências mínimas

### 🎨 Consistência de Design

- Tokens de design centralizados
- Comportamento consistente dos componentes
- Abordagem unificada de estilização

## Diretrizes de Desenvolvimento

### Criação de Componentes

1. Comece com átomos para elementos básicos
2. Combine átomos em moléculas para funcionalidades simples
3. Construa organismos a partir de moléculas para recursos complexos
4. Crie templates para layouts de página
5. Use templates em páginas com conteúdo real

### Estrutura de Importação

```tsx
// Padrão de importação preferido
import { Button } from "@/components/atoms/button";
import { FormField } from "@/components/molecules/form-field";
import { TopNavigation } from "@/components/organisms/top-navigation";
import { MainLayout } from "@/components/templates/main-layout";
```

### Organização de Arquivos

```
components/
├── ui/ # Componentes base shadcn/ui
│ ├── button.tsx
│ ├── input.tsx
│ └── ...
├── custom/ # Componentes customizados
│ ├── button.tsx
│ ├── card.tsx
│ └── ...
├── atoms/
│ ├── button/
│ │ ├── button.tsx
│ │ └── index.ts
│ └── index.ts
├── molecules/
├── organisms/
├── templates/
└── index.ts
```

## Login de Demonstração

Para acessar a demonstração do sistema, use as seguintes credenciais:

- **Email**: `admin@example.com`
- **Senha**: `password`

## Primeiros Passos

```bash

# Instalar dependências

npm install

# ou

pnpm install

# Executar servidor de desenvolvimento

npm run dev

# ou

pnpm dev

# Construir para produção

npm run build

# ou

pnpm build
```

## Gerenciamento de Temas

Este projeto utiliza `next-themes` para gerenciar o tema claro/escuro:

- Temas são configurados com variáveis CSS personalizadas
- Alternância automática baseada nas preferências do sistema
- Persistência de seleção de tema via localStorage

## Benefícios da Arquitetura

- **Modularidade**: Cada componente tem uma única responsabilidade
- **Reutilização**: Componentes podem ser usados em diferentes contextos
- **Testabilidade**: Componentes pequenos e focados são mais fáceis de testar
- **Documentação**: Hierarquia clara torna o sistema autodocumentado
- **Colaboração em Equipe**: Desenvolvedores podem trabalhar em diferentes níveis independentemente

## Sobre Este Documento

Este README foi atualizado em julho de 2025 para refletir com precisão:

- A estrutura atual do projeto usando shadcn/ui como base
- As dependências reais e suas versões
- A organização de componentes seguindo o Atomic Design
- A integração entre os componentes base do shadcn/ui e os componentes personalizados

Este documento serve como guia para novos desenvolvedores compreenderem rapidamente a arquitetura do projeto e seus principais recursos.

# Spoton - MVP de Reserva de Espaços

Um MVP para alugar espaços e fazer reservas, inspirado no Airbnb, com foco em 4 categorias principais: coworkings, estacionamentos, restaurantes e serviços.

## 🚀 Funcionalidades

### Página Principal
- **Header**: Logo do Spoton + botões de entrar/cadastrar
- **Navegação**: 4 opções de aluguel com ícones (coworkings, estacionamento, restaurantes, serviços)
- **Campo de busca**: Localização, check-in, check-out e número de hóspedes
- **Cards de espaços**: Imagens, títulos, preços, avaliações e amenidades
- **Seções organizadas**: Espaços em destaque por categoria

### Sistema de Cadastro
- **Formulário completo**: Nome, email, telefone, senha
- **Opção para estrangeiros**: Checkbox que alterna entre CPF e passaporte
- **Validação**: Campos obrigatórios e formatos corretos
- **Países**: Lista de países para usuários estrangeiros

### Páginas de Autenticação
- **Login**: Email e senha com validação
- **Cadastro**: Formulário completo com opção para estrangeiros
- **Login social**: Botões para Google e Facebook (preparados)

## 🛠️ Tecnologias

- **Next.js 14** com App Router
- **TypeScript** para tipagem
- **Tailwind CSS** para estilização
- **React** com hooks modernos

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── cadastro/
│   │   └── page.tsx          # Página de cadastro
│   ├── login/
│   │   └── page.tsx          # Página de login
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Página inicial
│   └── globals.css           # Estilos globais
├── components/
│   ├── Header.tsx            # Cabeçalho com navegação
│   ├── SearchBar.tsx         # Barra de busca
│   ├── SpaceCard.tsx         # Card de espaço
│   └── SpaceTypeNavigation.tsx # Navegação de tipos
└── data/
    └── mockData.ts           # Dados mock dos espaços
```

## 🎨 Design

- **Layout responsivo** inspirado no Airbnb
- **Gradientes** azul/roxo para elementos principais
- **Cards modernos** com hover effects
- **Tipografia** clara e hierárquica
- **Ícones** para cada categoria de espaço

## 📊 Dados Mock

O arquivo `mockData.ts` contém:
- **8 espaços** distribuídos nas 4 categorias
- **Imagens** do Unsplash
- **Preços** realistas em reais
- **Avaliações** e reviews
- **Amenidades** específicas para cada tipo

## 🚀 Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse [http://localhost:3000](http://localhost:3000)

## 🌟 Próximos Passos

- [ ] Integração com banco de dados
- [ ] Sistema de autenticação real
- [ ] Página de detalhes do espaço
- [ ] Sistema de reservas
- [ ] Painel do usuário
- [ ] Sistema de pagamentos
- [ ] Upload de imagens
- [ ] Geolocalização
- [ ] Filtros avançados
- [ ] Sistema de avaliações

## 📝 Notas

- O projeto está configurado para **estrangeiros** no cadastro
- **Validação completa** nos formulários
- **Design responsivo** para mobile e desktop
- **Mock data** realista para demonstração
- **TypeScript** para melhor manutenibilidade

## 🤝 Contribuição

Este é um MVP em desenvolvimento. Sugestões e melhorias são bem-vindas!
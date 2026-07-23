# TekCityM Frontend

Nền tảng sự kiện & đặt vé TekCityM - Frontend Application.

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management & Data Fetching**: [TanStack React Query](https://tanstack.com/query) + [Zustand](https://zustand-demo.pmnd.rs/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Cấu trúc dự án (Project Structure)

```text
src/
├── app/          # App Router & Providers
├── assets/       # Media assets (images, icons)
├── components/   # UI & Common components (common, layout, ui)
├── features/     # Feature-based modules (auth, booking, event, payment, profile, ticket, organizer)
├── hooks/        # Custom React Hooks
├── layouts/      # Page layout wrappers
├── lib/          # Helper utilities & configuration
├── pages/        # Route page views
├── services/     # API integration & WebSocket handlers
├── styles/       # Global CSS & Tailwind configuration
├── types/        # TypeScript interfaces & types
└── utils/        # Utility functions
```

## 🚀 Khởi chạy dự án (Getting Started)

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Chạy môi trường Development:
```bash
npm run dev
```

### 3. Build sản phẩm:
```bash
npm run build
```

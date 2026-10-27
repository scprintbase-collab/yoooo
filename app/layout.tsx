import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://scprintbase-collab.github.io/yoooo/"),
  title: "форма. — Дизайн, который имеет значение",
  description: "Независимая дизайн-студия. Создаём выразительные бренды, сайты и цифровые продукты, которые помогают бизнесу расти.",
  openGraph: {
    title: "форма. — Дизайн, который имеет значение",
    description: "Брендинг, сайты и цифровые продукты. От первой идеи до большого запуска.",
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f8f7f4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}

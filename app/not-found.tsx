import Link from "next/link";
import { ArrowLeft, Asterisk } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Asterisk size={72} strokeWidth={1.2} className="mb-8 text-accent" aria-hidden="true" />
      <p className="eyebrow mb-5 text-muted">404 · НЕМНОГО НЕ ТУДА</p>
      <h1 className="text-4xl font-medium tracking-[-0.06em] sm:text-6xl">Пока без формы.</h1>
      <p className="mt-5 max-w-sm text-sm leading-7 text-muted">Такой страницы нет. Но на главной точно найдётся что-то интересное.</p>
      <Link href="/" className="button button-dark mt-9"><ArrowLeft size={17} /> На главную</Link>
    </main>
  );
}

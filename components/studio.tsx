"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Check, Download, Menu, Plus, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

const navigation = [{ label: "Проекты", href: "#work" }, { label: "Услуги", href: "#services" }, { label: "Подход", href: "#process" }];

export default function Studio({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefReady, setBriefReady] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => { element.classList.add("reveal-pending"); observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  function openBrief() {
    setMenuOpen(false);
    setBriefReady(false);
    opener.current = menuOpen ? document.getElementById("menu-toggle") : document.activeElement as HTMLElement;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function closeBrief() {
    document.body.style.overflow = "";
    opener.current?.focus();
  }

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const content = ["БРИФ НОВОГО ПРОЕКТА / форма.", "", `Имя: ${form.get("name")}`, `Email: ${form.get("email")}`, `Направление: ${form.get("service")}`, "", "О проекте:", String(form.get("message")), "", "Подготовлено на демо-сайте студии «форма.». Данные не отправлялись на сервер."].join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", content], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "forma-project-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setBriefReady(true);
  }

  return (
    <>
      <a href="#main" className="skip-link">Перейти к содержимому</a>
      <header className="site-header">
        <div className="site-container flex h-24 items-center justify-between gap-6">
          <a href="#" className="wordmark" aria-label="Форма — на главную">форма<span className="text-accent">.</span><Asterisk size={30} strokeWidth={2.3} className="ml-2 text-accent" aria-hidden="true" /></a>
          <nav aria-label="Основная навигация" className="hidden items-center gap-9 md:flex">
            {navigation.map((item) => <a className="nav-link" key={item.href} href={item.href}>{item.label}</a>)}
            <a className="nav-link" href="#about">О студии</a>
          </nav>
          <button onClick={openBrief} className="button button-dark hidden sm:inline-flex">Обсудить проект <ArrowUpRight size={17} /></button>
          <button id="menu-toggle" className="icon-button md:hidden" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav id="mobile-navigation" aria-label="Мобильная навигация" className="mobile-menu md:hidden">
          {[...navigation, { label: "О студии", href: "#about" }].map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={20} /></a>)}
          <button className="button button-accent mt-4" onClick={openBrief}>Обсудить проект <ArrowUpRight size={18} /></button>
        </nav>}
      </header>

      <main id="main">
        <section className="site-container hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow hero-enter"><span className="status-dot" /> НЕЗАВИСИМАЯ ДИЗАЙН-СТУДИЯ</div>
            <h1 id="hero-title" className="hero-title hero-enter">Придаём<br />форму<br /><span>вашим идеям.</span></h1>
            <p className="hero-description hero-enter">Соединяем стратегию и эстетику.<br className="hidden lg:block" /> Создаём бренды и цифровой опыт,<br className="hidden lg:block" /> которые невозможно не заметить.</p>
            <div className="hero-actions hero-enter">
              <a className="button button-dark button-large" href="#work">Смотреть проекты <ArrowUpRight size={20} /></a>
              <a className="text-link" href="#about"><span className="play-button"><ArrowDown size={16} /></span>Знакомьтесь, форма.</a>
            </div>
            <div className="hero-note"><span className="mini-avatars" aria-hidden="true"><span>а</span><span>м</span><span>д</span></span><span>Маленькая команда.<br /><strong>Большие возможности.</strong></span><ArrowDownRight size={23} className="ml-auto text-ink/40" /></div>
          </div>
          <div className="hero-art hero-enter">
            <div className="absolute top-7 left-7 z-10 flex items-center gap-2 text-[11px] font-semibold tracking-[0.04em]"><span className="h-1.5 w-1.5 rounded-full bg-ink" /> СМЫСЛ ОБРЕТАЕТ ФОРМУ</div>
            <div className="absolute right-7 top-7 z-10 text-ink/50"><Plus size={21} strokeWidth={1} /></div>
            <span className="art-orbit art-orbit-one" aria-hidden="true" /><span className="art-orbit art-orbit-two" aria-hidden="true" />
            <Image src={assetPath("/images/forma-sculpture.svg")} alt="Объёмная оранжевая скульптура в форме звезды — символ творческой энергии студии" width={640} height={640} priority className="hero-sculpture" />
            <div className="art-caption"><span>Меньше шаблонов.<br /><strong>Больше характера.</strong></span><Asterisk size={38} strokeWidth={1} /></div>
            <div className="art-label"><span className="status-dot" /> ОТКРЫТЫ К НОВЫМ ПРОЕКТАМ <ArrowUpRight size={15} /></div>
          </div>
        </section>

        <section className="site-container" aria-label="Наши принципы">
          <div className="trust-strip">
            <p>Хорошие идеи рождаются<br /><span className="font-semibold text-ink">в хорошей компании.</span></p>
            <div className="client-wordmark">Layers<Asterisk size={25} className="text-accent" aria-hidden="true" /></div>
            <div className="client-wordmark client-wordmark-serif">Quotient.</div>
            <div className="client-wordmark"><span className="client-mark" />Circooles</div>
            <div className="client-wordmark tracking-[-0.09em]">Sisyphus</div>
            <div className="client-wordmark hidden xl:flex"><span className="text-[30px]">◈</span> Catalog</div>
          </div>
        </section>

        {children}

        <section id="about" className="site-container about-section reveal" aria-labelledby="about-title">
          <div className="eyebrow"><span className="section-dot" /> О СТУДИИ</div>
          <div className="about-grid">
            <h2 id="about-title">За каждым<br />проектом — <span className="font-serif italic text-accent">люди.</span></h2>
            <div><p className="about-description">Мы — форма. Небольшая команда с большим любопытством. Верим, что сильный дизайн начинается с правильных вопросов и открытого диалога.</p><p className="mt-5 max-w-lg text-sm leading-7 text-muted">Работаем без лишних уровней и сложных процессов. Вы общаетесь напрямую с теми, кто придумывает, рисует и создаёт ваш проект. Нам важно, чтобы результат был вашим — по-настоящему.</p><div className="mt-9 flex flex-wrap gap-2"><span className="tag">Открытость</span><span className="tag">Внимание к деталям</span><span className="tag">Любовь к делу</span></div></div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="site-container contact-grid">
            <div><div className="eyebrow mb-9"><span className="status-dot bg-ink!" /> СЛЕДУЮЩИЙ ПРОЕКТ МОЖЕТ БЫТЬ ВАШИМ</div><h2 id="contact-title">Есть идея?<br />Давайте <span className="font-serif italic">создадим.</span></h2><p className="mt-7 max-w-md text-[15px] leading-7 text-ink/75">Амбициозная задача, смелая идея или просто желание познакомиться — всё начинается с разговора.</p></div>
            <button className="contact-circle" onClick={openBrief} aria-label="Обсудить проект"><ArrowUpRight aria-hidden="true" /><span>Обсудить проект</span></button>
          </div>
        </section>
      </main>

      <footer className="site-container pb-7 pt-12">
        <div className="flex flex-col justify-between gap-7 border-b border-line pb-9 sm:flex-row sm:items-center"><a href="#" className="wordmark">форма<span className="text-accent">.</span><Asterisk size={26} className="ml-2 text-accent" /></a><p className="text-sm text-muted">Хорошему дизайну всегда найдётся форма.</p><a href="#main" className="text-link text-sm">Наверх <ArrowUpRight size={17} /></a></div>
        <div className="mt-6 flex flex-col gap-3 text-[11px] text-muted sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} форма. Создано с вниманием.</span><span>Концептуальная студия · Демонстрационный проект</span><span className="inline-flex items-center gap-1.5">Сделано с <Asterisk size={14} className="text-accent" /> и смыслом</span></div>
      </footer>

      <dialog ref={dialog} className="brief-dialog" onClose={closeBrief} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-labelledby="brief-title">
        <div className="relative p-6 sm:p-10">
          <button className="icon-button absolute right-4 top-4" onClick={() => dialog.current?.close()} aria-label="Закрыть форму"><X size={23} /></button>
          {briefReady ? <div className="py-8 text-center"><span className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent"><Check size={30} /></span><h2 id="brief-title" className="text-4xl font-semibold tracking-tight">Отличное начало!</h2><p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-muted" role="status">Ваш бриф подготовлен и скачан. Сохраните его — это первый шаг к новому проекту. Данные никуда не отправлялись.</p><button className="button button-dark mx-auto mt-8" onClick={() => dialog.current?.close()}>Готово <ArrowRight size={17} /></button></div> : <>
            <div className="eyebrow mb-6 text-[#b04427]">ДАВАЙТЕ ПОЗНАКОМИМСЯ</div><h2 id="brief-title" className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">С чего начнём?</h2><p className="mt-3 text-sm leading-6 text-muted">Расскажите немного о себе и вашей идее.</p>
            <form className="mt-8 grid gap-5" onSubmit={prepareBrief}>
              <div className="grid gap-5 sm:grid-cols-2"><label className="form-label">Ваше имя<input name="name" autoComplete="name" placeholder="Как к вам обращаться?" required maxLength={100} /></label><label className="form-label">Email<input name="email" type="email" autoComplete="email" placeholder="you@company.ru" required maxLength={200} /></label></div>
              <label className="form-label">Что будем создавать?<select name="service" defaultValue="Сайт"><option>Сайт</option><option>Брендинг</option><option>Цифровой продукт</option><option>Арт-дирекшн</option><option>Пока не знаю — обсудим</option></select></label>
              <label className="form-label">Пару слов о проекте<textarea name="message" placeholder="Какая у вас идея и чем мы можем помочь?" rows={3} required maxLength={4000} /></label>
              <button type="submit" className="button button-dark justify-center py-4!">Скачать бриф <Download size={17} /></button>
              <p className="text-[11px] leading-5 text-muted">Это демо-форма. Бриф сохранится текстовым файлом на вашем устройстве. Мы не отправляем и не храним ваши данные.</p>
            </form>
          </>}
        </div>
      </dialog>
    </>
  );
}

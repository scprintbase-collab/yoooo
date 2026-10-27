"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { ArrowDownRight, ArrowUpRight, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    name: "AURA",
    category: "Архитектура и пространства",
    tags: "Стратегия · Айдентика · Веб-сайт",
    image: assetPath("/images/project-architecture.svg"),
    alt: "Светлый архитектурный интерьер с природными материалами",
    year: "2025",
    intro: "Пространство, в котором хочется остаться.",
    description:
      "Концепция бренда архитектурного бюро, которое создаёт спокойные, наполненные светом пространства. Мы перенесли его подход в визуальный язык: тёплая палитра, выверенная типографика и много воздуха.",
    deliverables: ["Позиционирование и характер бренда", "Логотип и визуальная система", "Концепция адаптивного сайта"],
    color: "#e2dfd5",
  },
  {
    name: "MŌNO",
    category: "Красота в простых вещах",
    tags: "Айдентика · Упаковка · Арт-дирекшн",
    image: assetPath("/images/project-skincare.svg"),
    alt: "Минималистичные средства ухода за кожей в естественном свете",
    year: "2025",
    intro: "Меньше лишнего. Больше заботы.",
    description:
      "Визуальная концепция осознанного ухода за собой. Честные материалы, тактильная упаковка и деликатная графика помогают бренду говорить просто о самом важном — ежедневной заботе.",
    deliverables: ["Нейминг и визуальная идентичность", "Концепция линейки упаковки", "Арт-дирекшн коммуникаций"],
    color: "#e6e2d8",
  },
  {
    name: "Daily Ritual",
    category: "Твой маленький ежедневный ритуал",
    tags: "Стратегия · Брендинг · Упаковка",
    image: assetPath("/images/project-coffee.svg"),
    alt: "Чашка кофе и тёплая атмосфера ежедневного кофейного ритуала",
    year: "2026",
    intro: "Хороший день начинается с маленького ритуала.",
    description:
      "Концепция дружелюбного кофейного бренда, который превращает обычную паузу в особенный момент. Живая типографика, тёплые цвета и простые слова делают каждый контакт немного ближе.",
    deliverables: ["Идея и стратегия бренда", "Айдентика и дизайн упаковки", "Система digital-коммуникаций"],
    color: "#70533e",
  },
];

const services = [
  { title: "Брендинг", text: "Находим характер. Создаём имя, айдентику и визуальный язык, который узнают." },
  { title: "Веб-сайты", text: "Соединяем красоту и логику в сайтах, которыми приятно пользоваться." },
  { title: "Цифровые продукты", text: "Превращаем сложные задачи в понятные интерфейсы и удобный опыт." },
  { title: "Арт-дирекшн", text: "Собираем всё в цельную историю — от первой идеи до последней детали." },
];

export default function ContentSections() {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <>
      <section id="work" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
          <div className="reveal mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#686e62]">ИЗБРАННЫЕ ПРОЕКТЫ <span className="ml-3 text-[#707568]">/ 01—03</span></p>
              <h2 className="text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.1] font-medium tracking-[-0.055em]">Хороший дизайн.<br /><span className="text-[#8b9085]">Большие перемены.</span></h2>
            </div>
            <p className="max-w-[285px] text-sm leading-relaxed text-[#686e62]">У каждого бренда своя история.<br />Мы помогаем рассказать её так,<br className="hidden md:block" /> чтобы вас услышали.</p>
          </div>

          <div className="grid gap-x-7 gap-y-10 md:grid-cols-2">
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setSelected(project)}
                aria-label={`Смотреть проект ${project.name}`}
                className={`reveal group block w-full text-left ${index === 2 ? "md:col-span-2" : ""}`}
              >
                <div className={`relative isolate overflow-hidden rounded-2xl ${index === 2 ? "aspect-[1.4] sm:aspect-[2.5] md:aspect-[2.9]" : "aspect-[1.17]"}`} style={{ backgroundColor: project.color }}>
                  <Image src={project.image} alt={project.alt} fill sizes={index === 2 ? "(max-width: 1400px) 95vw, 1288px" : "(max-width: 768px) 95vw, (max-width: 1400px) 45vw, 630px"} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${index === 2 ? "from-black/50 via-black/5 to-black/10" : "from-black/30 via-transparent to-black/5"}`} />
                  <span className="absolute top-5 left-5 rounded-full border border-white/30 bg-white/80 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#30372d] backdrop-blur-md sm:top-6 sm:left-6">{index === 0 ? "АРХИТЕКТУРА" : index === 1 ? "LIFESTYLE" : "FOOD & BEVERAGE"}</span>
                  <span className={`absolute right-6 bottom-6 left-6 text-white ${index === 2 ? "text-[clamp(3rem,8vw,7rem)] tracking-[-0.065em]" : "text-[clamp(3.5rem,7vw,7rem)] tracking-[-0.06em]"} leading-none font-medium`}>{project.name}<span className="ml-1 align-top text-sm">®</span></span>
                  <span className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-white text-[#20251f] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff623a] group-hover:text-white sm:top-6 sm:right-6"><ArrowUpRight size={18} aria-hidden="true" /></span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div><h3 className="text-lg font-semibold tracking-[-0.035em]">{project.name}<span className="ml-3 hidden text-sm font-normal tracking-normal text-[#686e62] sm:inline">{project.category}</span></h3><p className="mt-1 text-xs text-[#686e62]">{project.tags}</p></div>
                  <span className="pt-1 text-xs text-[#686e62]">{project.year}</span>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-6 text-[11px] text-[#707568]">Концептуальные проекты студии. Открывайте карточки, чтобы узнать больше.</p>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-t border-[#e3e4dd] py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-14">
          <div className="reveal">
            <p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#686e62]">ЧТО МЫ ДЕЛАЕМ</p>
            <h2 className="text-[clamp(2.3rem,4.5vw,3.8rem)] leading-[1.1] font-medium tracking-[-0.055em]">От первой идеи<br />до последнего<br /><span className="text-[#8b9085]">пикселя.</span></h2>
            <p className="mt-6 max-w-[290px] text-sm leading-relaxed text-[#686e62]">Смотрим на задачу целиком. Соединяем стратегию, дизайн и технологии, чтобы ваш бизнес двигался вперёд.</p>
            <ArrowDownRight className="mt-10 text-[#ff623a]" size={38} strokeWidth={1.4} aria-hidden="true" />
          </div>
          <div>
            {services.map((service, i) => (
              <div key={service.title} className="reveal grid grid-cols-[28px_1fr] gap-4 border-t border-[#dadcd4] py-7 last:border-b sm:grid-cols-[34px_1fr_22px] sm:gap-5">
                <span className="pt-1 text-xs text-[#707568]">0{i + 1}</span>
                <div><h3 className="text-2xl font-medium tracking-[-0.04em]">{service.title}</h3><p className="mt-2 max-w-[370px] text-sm leading-relaxed text-[#686e62]">{service.text}</p></div>
                <ArrowUpRight className="hidden text-[#818775] sm:block" size={21} strokeWidth={1.5} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 bg-[#242e28] py-20 text-[#f8f7f4] sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
          <div className="reveal mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#b2b8ae]">ПРОСТОЙ ПРОЦЕСС. СИЛЬНЫЙ РЕЗУЛЬТАТ.</p><h2 className="text-[clamp(2.3rem,4.6vw,3.8rem)] leading-[1.1] font-medium tracking-[-0.055em]">На одной волне.<br /><span className="text-[#a4ae9a]">На каждом этапе.</span></h2></div>
            <p className="max-w-[270px] text-sm leading-relaxed text-[#b2b8ae]">Без сложных терминов и сюрпризов.<br />Только открытый диалог и внимание<br className="hidden md:block" /> к тому, что важно для вас.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {[
              ["Погружаемся", "Задаём вопросы, слушаем и исследуем. Разбираемся в вашем бизнесе, аудитории и амбициях."],
              ["Находим форму", "Превращаем смыслы в идеи. Вместе выбираем направление и доводим каждую деталь до ума."],
              ["Запускаем", "Готовим всё к выходу в мир. Передаём материалы и помогаем уверенно сделать первый шаг."],
            ].map(([title, description], i) => (
              <div key={title} className="reveal border-t border-white/20 pt-7">
                <div className="mb-7 flex items-center justify-between"><span className="rounded-full bg-[#ff623a] px-3 py-1.5 text-[11px] font-semibold text-[#242e28]">ШАГ 0{i + 1}</span><span className="text-xs text-[#a4ae9a]">{i === 0 ? "01—03" : i === 1 ? "02—03" : "03—03"}</span></div>
                <h3 className="text-2xl font-medium tracking-[-0.04em]">{title}</h3>
                <p className="mt-3 max-w-[340px] text-sm leading-[1.8] text-[#b2b8ae]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <dialog ref={dialogRef} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }} aria-labelledby="project-dialog-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-3xl overflow-y-auto rounded-2xl border-0 bg-[#f8f7f4] p-0 text-[#20251f] shadow-2xl backdrop:bg-[#20251f]/65 backdrop:backdrop-blur-sm">
        {selected && (
          <div>
            <div className="relative aspect-[1.8] overflow-hidden bg-[#e3e4dd] sm:aspect-[2.3]">
              <Image src={selected.image} alt={selected.alt} fill sizes="(max-width: 768px) 95vw, 768px" className="object-cover" />
              <button type="button" autoFocus aria-label="Закрыть проект" onClick={() => setSelected(null)} className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-[#20251f] shadow-sm transition-colors hover:bg-[#ff623a]"><X size={20} /></button>
            </div>
            <div className="p-6 sm:p-10">
              <p className="mb-3 text-[10px] font-semibold tracking-widest text-[#686e62]">КОНЦЕПЦИЯ · {selected.year}</p>
              <h2 id="project-dialog-title" className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl">{selected.name}</h2>
              <h3 className="mt-5 text-xl font-medium tracking-[-0.03em]">{selected.intro}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#686e62]">{selected.description}</p>
              <ul className="mt-7 space-y-3 border-t border-[#dadcd4] pt-6">{selected.deliverables.map((item) => <li key={item} className="flex items-center gap-3 text-sm"><Check size={16} className="shrink-0 text-[#b04427]" aria-hidden="true" />{item}</li>)}</ul>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

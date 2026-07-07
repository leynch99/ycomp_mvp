"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrice, placeholder } from "@/lib/data";

type StepKey = "cpu" | "motherboard" | "ram" | "gpu" | "storage" | "psu";

type ConfigOption = {
  id: string;
  name: string;
  tags: string[];
  price: number;
  image: string;
  socket?: "AM5" | "LGA1700";
  tdp?: number;
  watt?: number;
};

type ConfigStep = {
  key: StepKey;
  label: string;
  eyebrow: string;
  title: string;
  desc: string;
  options: ConfigOption[];
};

type Selections = Partial<Record<StepKey, ConfigOption>>;

const steps: ConfigStep[] = [
  {
    key: "cpu",
    label: "CPU",
    eyebrow: "Шаг 1 из 6",
    title: "Процессор",
    desc: "Выберите процессор. Его сокет сразу ограничит список совместимых материнских плат.",
    options: [
      {
        id: "cpu-7500f",
        name: "AMD Ryzen 5 7500F",
        tags: ["AM5", "65W TDP", "6 / 12"],
        price: 5990,
        socket: "AM5",
        tdp: 65,
        image: placeholder("Ryzen 5 7500F", 360, 220)
      },
      {
        id: "cpu-9700x",
        name: "AMD Ryzen 7 9700X",
        tags: ["AM5", "65W TDP", "8 / 16"],
        price: 14990,
        socket: "AM5",
        tdp: 65,
        image: placeholder("Ryzen 7 9700X", 360, 220)
      },
      {
        id: "cpu-14400f",
        name: "Intel Core i5-14400F",
        tags: ["LGA1700", "65W TDP", "10 / 16"],
        price: 7490,
        socket: "LGA1700",
        tdp: 65,
        image: placeholder("Core i5 14400F", 360, 220)
      }
    ]
  },
  {
    key: "motherboard",
    label: "Плата",
    eyebrow: "Шаг 2 из 6",
    title: "Материнская плата",
    desc: "Несовместимые сокеты остаются видимыми как datasheet-строки, но недоступны для выбора.",
    options: [
      {
        id: "mb-b650-plus",
        name: "ASUS TUF Gaming B650-PLUS",
        tags: ["AM5", "DDR5", "ATX"],
        price: 6490,
        socket: "AM5",
        image: placeholder("ASUS B650 PLUS", 360, 220)
      },
      {
        id: "mb-x670e-elite",
        name: "Gigabyte X670E AORUS Elite",
        tags: ["AM5", "DDR5", "Wi-Fi"],
        price: 11990,
        socket: "AM5",
        image: placeholder("X670E AORUS", 360, 220)
      },
      {
        id: "mb-b760m-a",
        name: "MSI PRO B760M-A",
        tags: ["LGA1700", "DDR5", "mATX"],
        price: 4990,
        socket: "LGA1700",
        image: placeholder("MSI B760M-A", 360, 220)
      }
    ]
  },
  {
    key: "ram",
    label: "Память",
    eyebrow: "Шаг 3 из 6",
    title: "Оперативная память",
    desc: "Подберите объем и частоту памяти. Для текущих плат в конфигураторе используется DDR5.",
    options: [
      {
        id: "ram-16",
        name: "Kingston FURY Beast 16GB DDR5 6000MHz",
        tags: ["DDR5", "16GB", "CL36"],
        price: 2490,
        image: placeholder("FURY 16GB DDR5", 360, 220)
      },
      {
        id: "ram-32",
        name: "Kingston FURY Beast 32GB DDR5 6000MHz",
        tags: ["DDR5", "32GB", "CL36"],
        price: 4590,
        image: placeholder("FURY 32GB DDR5", 360, 220)
      },
      {
        id: "ram-64",
        name: "Corsair Vengeance 64GB DDR5 5600MHz",
        tags: ["DDR5", "64GB", "CL40"],
        price: 8990,
        image: placeholder("Vengeance 64GB", 360, 220)
      }
    ]
  },
  {
    key: "gpu",
    label: "GPU",
    eyebrow: "Шаг 4 из 6",
    title: "Видеокарта",
    desc: "Видеокарта участвует в расчете мощности блока питания вместе с TDP процессора.",
    options: [
      {
        id: "gpu-5070",
        name: "ASUS Dual RTX 5070 OC 12GB",
        tags: ["12GB", "PCIe 5.0", "250W"],
        price: 32990,
        tdp: 250,
        image: placeholder("ASUS RTX 5070", 360, 220)
      },
      {
        id: "gpu-5070ti",
        name: "MSI RTX 5070 Ti Ventus 3X 16GB",
        tags: ["16GB", "PCIe 5.0", "300W"],
        price: 44290,
        tdp: 300,
        image: placeholder("MSI RTX 5070 Ti", 360, 220)
      },
      {
        id: "gpu-9070xt",
        name: "Sapphire Pulse RX 9070 XT 16GB",
        tags: ["16GB", "PCIe 4.0", "304W"],
        price: 27990,
        tdp: 304,
        image: placeholder("RX 9070 XT", 360, 220)
      }
    ]
  },
  {
    key: "storage",
    label: "SSD",
    eyebrow: "Шаг 5 из 6",
    title: "Накопитель",
    desc: "NVMe SSD для системы и игр. Второй диск можно будет добавить уже из корзины.",
    options: [
      {
        id: "ssd-990-1tb",
        name: "Samsung 990 PRO 1TB NVMe PCIe 4.0",
        tags: ["1TB", "7450 MB/s", "NVMe"],
        price: 3990,
        image: placeholder("Samsung 990 1TB", 360, 220)
      },
      {
        id: "ssd-990-2tb",
        name: "Samsung 990 PRO 2TB NVMe PCIe 4.0",
        tags: ["2TB", "7450 MB/s", "NVMe"],
        price: 6190,
        image: placeholder("Samsung 990 2TB", 360, 220)
      }
    ]
  },
  {
    key: "psu",
    label: "БП",
    eyebrow: "Шаг 6 из 6",
    title: "Блок питания",
    desc: "Нужная мощность считается по формуле (TDP CPU + TDP GPU + 50) x 1.3.",
    options: [
      {
        id: "psu-500",
        name: "be quiet! System Power 10 500W Bronze",
        tags: ["500W", "80+ Bronze", "ATX"],
        price: 2590,
        watt: 500,
        image: placeholder("System Power 500W", 360, 220)
      },
      {
        id: "psu-750",
        name: "be quiet! Pure Power 12 M 750W Gold",
        tags: ["750W", "80+ Gold", "ATX 3.1"],
        price: 3890,
        watt: 750,
        image: placeholder("Pure Power 750W", 360, 220)
      },
      {
        id: "psu-850",
        name: "Corsair RM850x 850W Gold",
        tags: ["850W", "80+ Gold", "Modular"],
        price: 5490,
        watt: 850,
        image: placeholder("Corsair RM850x", 360, 220)
      }
    ]
  }
];

function requiredWattage(selections: Selections) {
  const cpuTdp = selections.cpu?.tdp ?? 65;
  const gpuTdp = selections.gpu?.tdp ?? 0;
  return Math.round((cpuTdp + gpuTdp + 50) * 1.3);
}

function optionBlocked(step: ConfigStep, option: ConfigOption, selections: Selections) {
  return step.key === "motherboard" && selections.cpu?.socket != null && option.socket !== selections.cpu.socket;
}

function optionWarning(step: ConfigStep, option: ConfigOption, selections: Selections) {
  if (step.key !== "psu" || option.watt == null) {
    return null;
  }

  const required = requiredWattage(selections);
  return option.watt < required ? `нужно от ${required}W` : `запас ${option.watt - required}W`;
}

export function ConfiguratorPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selections, setSelections] = useState<Selections>({});
  const activeStep = steps[activeIndex];

  const required = requiredWattage(selections);
  const total = useMemo(
    () => steps.reduce((sum, step) => sum + (selections[step.key]?.price ?? 0), 0),
    [selections]
  );
  const allSelected = steps.every((step) => selections[step.key]);
  const socketWarning =
    selections.cpu && selections.motherboard && selections.cpu.socket !== selections.motherboard.socket
      ? `Несовпадение сокета: CPU ${selections.cpu.socket} и плата ${selections.motherboard.socket}`
      : null;
  const psuWarning =
    selections.psu?.watt != null && selections.psu.watt < required
      ? `БП ${selections.psu.watt}W недостаточно, нужно от ${required}W`
      : null;
  const hasWarnings = Boolean(socketWarning || psuWarning);

  function selectOption(step: ConfigStep, option: ConfigOption) {
    if (optionBlocked(step, option, selections)) {
      return;
    }

    setSelections((current) => ({ ...current, [step.key]: option }));
  }

  function removeSelection(key: StepKey) {
    setSelections((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  return (
    <>
      <header className="cfg-bare">
        <div className="wrap">
          <Link className="logo" href="/">
            YComp<span>.</span>
            <small>компоненты</small>
          </Link>
          <Link className="cfg-exit-link" href="/catalog">
            × Выйти из конфигуратора
          </Link>
        </div>
      </header>

      <nav className="cfg-stepper-bar" aria-label="Шаги конфигуратора">
        <div className="wrap">
          {steps.map((step, index) => (
            <div className="cfg-step-wrap" key={step.key}>
              <button
                className={`cfg-step${index === activeIndex ? " active" : ""}${selections[step.key] ? " done" : ""}`}
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                <span className="n">{selections[step.key] ? "✓" : index + 1}</span>
                {step.label}
              </button>
              {index < steps.length - 1 ? <span className="cfg-step-line" /> : null}
            </div>
          ))}
        </div>
      </nav>

      <main className="wrap cfg-layout">
        <section>
          <div className="cfg-step-head">
            <div className="eyebrow">{activeStep.eyebrow}</div>
            <h1>{activeStep.title}</h1>
            <p>{activeStep.desc}</p>
          </div>

          <div className="cfg-option-grid">
            {activeStep.options.map((option) => {
              const selected = selections[activeStep.key]?.id === option.id;
              const blocked = optionBlocked(activeStep, option, selections);
              const warning = optionWarning(activeStep, option, selections);

              return (
                <button
                  className={`cfg-opt-card${selected ? " selected" : ""}${blocked ? " incompatible" : ""}`}
                  disabled={blocked}
                  type="button"
                  onClick={() => selectOption(activeStep, option)}
                  key={option.id}
                >
                  <span className="cfg-opt-check">✓</span>
                  <img src={option.image} alt={option.name} />
                  <span className="name">{option.name}</span>
                  <span className="p-tags">
                    {option.tags.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                    {warning ? (
                      <span className={`chip ${warning.startsWith("нужно") ? "warn" : "ok"}`}>{warning}</span>
                    ) : null}
                  </span>
                  <span className="foot">
                    <span className="price">{formatPrice(option.price)}</span>
                  </span>
                  {blocked ? <span className="incompat-note">Несовместим с выбранным сокетом</span> : null}
                </button>
              );
            })}
          </div>

          <div className="cfg-step-nav">
            <button className="btn btn-outline" disabled={activeIndex === 0} type="button" onClick={() => setActiveIndex(activeIndex - 1)}>
              ← Назад
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setActiveIndex(Math.min(activeIndex + 1, steps.length - 1))}
            >
              {activeIndex === steps.length - 1 ? "Завершить →" : "Далее →"}
            </button>
          </div>
        </section>

        <aside className="cfg-summary-ticket">
          <div className="cfg-st-head">
            <h2>Ваша сборка</h2>
            <span className={`status-pill ${hasWarnings ? "st-alert" : "st-delivered"}`}>
              {hasWarnings ? "⚠ Есть предупреждения" : "✓ Совместимо"}
            </span>
          </div>

          <div className="cfg-st-rows">
            {steps.map((step) => {
              const selected = selections[step.key];

              return (
                <div className={`cfg-st-row${selected ? "" : " empty"}`} key={step.key}>
                  {selected ? (
                    <>
                      <span className="lbl">
                        <span>{step.title.toUpperCase()}</span>
                        <b>{selected.name}</b>
                      </span>
                      <span className="val">
                        {formatPrice(selected.price)}
                        <button type="button" onClick={() => removeSelection(step.key)} aria-label={`Удалить ${selected.name}`}>
                          ×
                        </button>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="lbl">{step.title} — не выбрано</span>
                      <span className="val">—</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="cfg-compat-log">
            <div className="row">
              <span className="ic ok">i</span>
              <span>Формула БП: ({selections.cpu?.tdp ?? 65}W + {selections.gpu?.tdp ?? 0}W + 50) x 1.3 = {required}W</span>
            </div>
            {socketWarning ? (
              <div className="row">
                <span className="ic warn">!</span>
                <span>{socketWarning}</span>
              </div>
            ) : selections.cpu && selections.motherboard ? (
              <div className="row">
                <span className="ic ok">✓</span>
                <span>Сокет {selections.cpu.socket} совпадает у CPU и материнской платы</span>
              </div>
            ) : null}
            {psuWarning ? (
              <div className="row">
                <span className="ic warn">!</span>
                <span>{psuWarning}</span>
              </div>
            ) : selections.psu ? (
              <div className="row">
                <span className="ic ok">✓</span>
                <span>БП {selections.psu.watt}W проходит расчет мощности</span>
              </div>
            ) : null}
          </div>

          <div className="cfg-st-total">
            <div className="cfg-st-total-row">
              <span>Сумма</span>
              <b>{formatPrice(total)}</b>
            </div>
            <Link className={`btn btn-primary${allSelected ? "" : " disabled"}`} href={allSelected ? "/cart" : "#"}>
              {allSelected ? "Добавить сборку в корзину" : "Заполните все шаги"}
            </Link>
          </div>
        </aside>
      </main>
    </>
  );
}

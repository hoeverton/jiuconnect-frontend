import { useMemo } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  Home as HomeIcon,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const PURPLE = "#7C3AED";

const heroImage =
  "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=2000&q=88";

const familyImage =
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=85";

const companyImage =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85";

const recoveryImages = {
  sauna:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85",
  ice:
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85",
  compression:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85",
  release:
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=85",
  chiropractic:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
};

const programs = [
  {
    title: "Plano Individual",
    description: "Seu treino. Seu objetivo. No seu tempo e no seu lugar.",
    image: heroImage,
    icon: Users,
  },
  {
    title: "Plano Family",
    description: "Treine com quem você ama. Mais que um treino, uma família mais forte.",
    image: familyImage,
    icon: Heart,
    featured: true,
  },
  {
    title: "Plano Company",
    description: "Leve o Jiu-Jitsu para sua empresa e crie uma experiência para o seu time.",
    image: companyImage,
    icon: Building2,
  },
];

const recoveryItems = [
  ["Sauna", "Relaxamento profundo", recoveryImages.sauna],
  ["Banheira de gelo", "Recuperação e foco", recoveryImages.ice],
  ["Botas de compressão", "Recuperação pós-treino", recoveryImages.compression],
  ["Liberação miofascial", "Alívio e mobilidade", recoveryImages.release],
  ["Quiropraxia", "Atendimento especializado", recoveryImages.chiropractic],
];

const belts = [
  ["Branca", "Fundamentos", "Disciplina", "bg-white text-slate-900"],
  ["Azul", "Evolução", "Confiança", "bg-blue-700 text-white"],
  ["Roxa", "Superação", "Resiliência", "bg-purple-700 text-white"],
  ["Marrom", "Maturidade", "Liderança", "bg-amber-900 text-white"],
  ["Preta", "Referência", "Novo você", "bg-slate-950 text-white"],
];

const testimonials = [
  {
    quote:
      "Eu queria treinar há anos, mas nunca conseguia encaixar a academia na minha rotina.",
    name: "Aluno JiuConnect",
    type: "Plano Individual",
  },
  {
    quote:
      "Treinar com meus filhos virou um dos melhores momentos da nossa semana.",
    name: "Família JiuConnect",
    type: "Plano Family",
  },
  {
    quote:
      "Levar uma experiência de Jiu-Jitsu para a empresa criou momentos de conexão que ficaram com o time.",
    name: "Cliente JiuConnect",
    type: "Plano Company",
  },
];

function scrollToExperience() {
  document.getElementById("experiencia")?.scrollIntoView({ behavior: "smooth" });
}

function Logo() {
  return (
    <a href="#" className="group flex items-center gap-3" aria-label="JiuConnect">
      <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/10">
        <span className="text-2xl font-black text-violet-400">A</span>
      </div>
      <div>
        <div className="text-lg font-black tracking-[0.18em] text-white">JIUCONNECT</div>
        <div className="text-[8px] font-semibold tracking-[0.12em] text-white/50">
          MAIS QUE UM TREINO. UM ESTILO DE VIDA.
        </div>
      </div>
    </a>
  );
}

export default function Home() {
  const benefits = useMemo(
    () => [
      [Clock3, "Horários flexíveis"],
      [HomeIcon, "Nós vamos até você"],
      [Users, "Treine com sua família"],
      [Heart, "Saúde e bem-estar"],
      [Award, "Evolução para todas as idades"],
      [ShieldCheck, "Acompanhamento e graduação"],
      [MapPin, "Casa, empresa ou condomínio"],
    ],
    []
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
      {/* HERO */}
      <section className="relative isolate min-h-[720px] overflow-hidden bg-slate-950 text-white">
        <img
          src={heroImage}
          alt="Treinamento de Jiu-Jitsu"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,7,18,.96)_0%,rgba(3,7,18,.82)_38%,rgba(3,7,18,.2)_75%,rgba(3,7,18,.5)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-slate-950/90 to-transparent" />

        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-white/75 lg:flex">
            <a className="text-violet-300" href="#">Home</a>
            <a href="#por-que" className="hover:text-white">Sobre</a>
            <a href="#programas" className="hover:text-white">Programas</a>
            <a href="#recovery" className="hover:text-white">Recovery</a>
            <a href="#jornada" className="hover:text-white">Nossa Jornada</a>
            <a href="#depoimentos" className="hover:text-white">Depoimentos</a>
            <a href="#contato" className="hover:text-white">Contato</a>
          </nav>
          <button
            onClick={scrollToExperience}
            className="hidden rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 sm:inline-flex"
          >
            Agendar Aula Grátis <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-20 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:pt-28">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[.22em] text-violet-300">
              Jiu-Jitsu em casa, na sua empresa ou condomínio
            </p>
            <h1 className="text-5xl font-black leading-[.95] tracking-[-.045em] sm:text-6xl lg:text-7xl">
              Mais que um treino.
              <br />
              Um tempo de qualidade em{" "}
              <span className="text-violet-400">família.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">
              A JiuConnect leva o Jiu-Jitsu até você, com aulas personalizadas,
              no seu horário e no seu lugar. Treinamento, disciplina e momentos
              que ficam para sempre.
            </p>

            <button
              onClick={scrollToExperience}
              className="mt-8 inline-flex items-center rounded-2xl bg-violet-600 px-7 py-4 text-base font-extrabold shadow-2xl shadow-violet-950/40 transition hover:-translate-y-0.5 hover:bg-violet-500"
            >
              Agendar minha Aula Grátis
              <ArrowRight className="ml-3 h-5 w-5" />
            </button>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
              {["Aula personalizada", "Recovery incluso", "Sem compromisso", "Nós vamos até você"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-violet-600">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="por-que" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.45fr_1.55fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-violet-600">Por que JiuConnect?</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Seu Jiu-Jitsu,
                <br />
                <span className="text-violet-600">do seu jeito.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
              {benefits.map(([Icon, label]) => (
                <div key={label} className="text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-900">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-5 text-slate-700">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programas" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-violet-400">Nossos programas</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Escolha como viver o Jiu-Jitsu.</h2>
            </div>
            <Sparkles className="hidden h-10 w-10 text-violet-400 sm:block" />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <article
                  key={program.title}
                  className={`group relative min-h-[430px] overflow-hidden rounded-3xl border ${program.featured ? "border-violet-500 shadow-2xl shadow-violet-950/30" : "border-white/10"}`}
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />
                  {program.featured && (
                    <span className="absolute left-5 top-5 rounded-full bg-violet-600 px-3 py-1.5 text-xs font-black uppercase tracking-wider">
                      Mais escolhido
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <Icon className="mb-4 h-7 w-7 text-violet-300" />
                    <h3 className="text-3xl font-black">{program.title}</h3>
                    <p className="mt-2 max-w-sm text-white/80">{program.description}</p>
                    <button
                      onClick={scrollToExperience}
                      className={`mt-5 inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-bold ${program.featured ? "bg-violet-600" : "border border-white/40 bg-white/10 backdrop-blur"}`}
                    >
                      Saiba mais <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FREE EXPERIENCE - WHITE */}
      <section id="experiencia" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[.2em] text-violet-600">Sua primeira experiência</p>
              <h2 className="mt-2 text-5xl font-black leading-none tracking-tight">
                Aula Experimental
                <br />
                <span className="text-6xl text-violet-600 sm:text-7xl">GRÁTIS</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Viva a experiência JiuConnect sem compromisso: conheça o professor,
                faça uma aula personalizada, experimente o Recovery e descubra sua jornada.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Grátis de verdade",
                  "Sem compromisso",
                  "No seu horário",
                  "Nós vamos até você",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 font-semibold">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-100 text-violet-700">
                      <Check className="h-4 w-4" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={scrollToExperience}
                className="mt-8 inline-flex items-center rounded-2xl bg-violet-600 px-7 py-4 font-extrabold text-white shadow-xl shadow-violet-200 transition hover:bg-violet-700"
              >
                Quero minha aula GRÁTIS
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-100">
              <img
                src={familyImage}
                alt="Família reunida"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/35 p-5 text-white backdrop-blur-md">
                <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">O primeiro passo</p>
                <p className="mt-1 text-2xl font-black">pode mudar tudo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY - WHITE */}
      <section id="jornada" className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[.2em] text-violet-600">Nossa metodologia</p>
              <h2 className="mt-3 text-5xl font-black leading-tight tracking-tight">
                Sua evolução
                <br />
                <span className="text-violet-600">é a nossa missão.</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
                Do primeiro treino até a faixa-preta, você evolui com acompanhamento,
                método, frequência de aulas e uma jornada planejada para cada fase.
              </p>
              <button
                onClick={scrollToExperience}
                className="mt-7 inline-flex items-center rounded-xl border border-slate-900 px-5 py-3 font-bold transition hover:bg-slate-950 hover:text-white"
              >
                Conheça nossa metodologia <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {belts.map(([belt, title, subtitle, classes], index) => (
                <div key={belt} className="relative text-center">
                  <div className={`mx-auto grid aspect-[1.1] w-full max-w-28 place-items-center rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm`}>
                    <div className={`h-7 w-full rounded-md shadow-inner ${classes}`} />
                  </div>
                  <p className="mt-3 text-sm font-black sm:text-base">{belt}</p>
                  <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500 sm:text-xs">{title}</p>
                  <p className="text-[11px] text-slate-400 sm:text-xs">{subtitle}</p>
                  {index < belts.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-10 hidden h-5 w-5 text-violet-500 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECOVERY */}
      <section id="recovery" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[.2em] text-violet-400">JiuConnect Recovery</p>
              <h2 className="mt-3 text-5xl font-black leading-tight tracking-tight">
                Seu corpo pronto
                <br />
                para o <span className="text-violet-400">próximo treino.</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/70">
                Adicione Recovery ao seu plano e tenha uma experiência complementar
                de performance, recuperação e bem-estar.
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="font-bold">+ Recovery</p>
                <p className="mt-1 text-sm text-white/60">
                  Os planos com Recovery incluem 1 sessão por semana. Sessões extras podem ser contratadas à parte.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {recoveryItems.map(([title, description, image]) => (
                <div key={title} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img
                    src={image}
                    alt={title}
                    className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="p-3">
                    <p className="font-bold leading-5">{title}</p>
                    <p className="mt-1 text-xs leading-4 text-white/50">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="depoimentos" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[.2em] text-violet-600">Histórias reais</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Vidas conectadas pelo Jiu-Jitsu.</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                <div className="flex gap-1 text-amber-400">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
                <p className="mt-5 text-lg font-semibold leading-8 text-slate-800">“{item.quote}”</p>
                <div className="mt-7 border-t border-slate-200 pt-4">
                  <p className="font-black">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.type}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contato" className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(124,58,237,.3),transparent_45%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-violet-400">Pronto para começar?</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              Sua jornada começa com
              <br />
              uma primeira experiência.
            </h2>
            <p className="mt-4 max-w-xl text-white/65">
              Agende sua aula experimental gratuita e descubra como o Jiu-Jitsu pode fazer parte da sua rotina e da sua família.
            </p>
          </div>
          <button
            onClick={scrollToExperience}
            className="inline-flex shrink-0 items-center rounded-2xl bg-violet-600 px-7 py-4 font-extrabold shadow-2xl shadow-violet-950/50 hover:bg-violet-500"
          >
            Quero minha aula GRÁTIS <ArrowRight className="ml-3 h-5 w-5" />
          </button>
        </div>
      </section>

      <footer className="bg-black py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Logo />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">
            <a href="#por-que" className="hover:text-white">Sobre</a>
            <a href="#programas" className="hover:text-white">Programas</a>
            <a href="#recovery" className="hover:text-white">Recovery</a>
            <a href="#jornada" className="hover:text-white">Nossa Jornada</a>
            <a href="#depoimentos" className="hover:text-white">Depoimentos</a>
            <a href="#contato" className="hover:text-white">Contato</a>
          </div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-white/40">
            Disciplina · Conexão · Evolução
          </p>
        </div>
      </footer>
    </main>
  );
}

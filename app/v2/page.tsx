'use client'

import { useState } from 'react'

type FormType = 'sales' | 'demo' | null
interface FormData { name: string; company: string; email: string; type: FormType }

const DELIVERABLES = [
  {
    label: 'Prima nota & contabilità',
    title: 'Ogni mese ricevi la prima nota completa, pronta per la firma',
    desc: 'Ci occupiamo noi di raccogliere documenti, classificare movimenti e riconciliare i conti. Tu ricevi tutto verificato, ordinato e pronto — senza dover fare nulla.',
    mock: (
      <div className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between">
          <span className="text-xs text-white/30">Consegna mensile — Aprile 2025</span>
          <span className="text-xs text-white/20 border border-white/8 px-2 py-0.5 rounded-full">Pronto per firma</span>
        </div>
        <div className="p-5 space-y-2">
          {[
            { desc: 'Prima nota completa', pages: '48 registrazioni', done: true },
            { desc: 'Riconciliazione bancaria', pages: '2 conti correnti', done: true },
            { desc: 'Estratto conto IVA', pages: 'Quadro mensile', done: true },
            { desc: 'Situazione patrimoniale', pages: 'Stato aggiornato', done: true },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-sm text-white/70">{row.desc}</span>
              </div>
              <span className="text-xs text-white/25">{row.pages}</span>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-white/20">Validato dal team di esperti il 30/04</span>
          <span className="text-xs text-white/30">↓ Scarica PDF</span>
        </div>
      </div>
    ),
  },
  {
    label: 'Cedolini & paghe',
    title: 'I cedolini pronti entro il 10 di ogni mese, senza pensieri',
    desc: 'Gestione completa del ciclo paghe: raccogliamo i dati, elaboriamo, verifichiamo con i consulenti del lavoro e ti consegniamo tutto pronto per la distribuzione.',
    mock: (
      <div className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between">
          <span className="text-xs text-white/30">Consegna paghe — Aprile 2025</span>
          <span className="text-xs text-white/20 border border-white/8 px-2 py-0.5 rounded-full">Consegnato l&apos;8 aprile</span>
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: 'Cedolini elaborati', val: '12' },
            { label: 'F24 previdenziale', val: 'Pronto · € 3.810' },
            { label: 'Prospetto TFR', val: 'Aggiornato' },
            { label: 'Scadenze prossimo mese', val: '16 Mag · 31 Mag' },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-sm text-white/40">{r.label}</span>
              <span className="text-sm text-white/70">{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Adempimenti & scadenze',
    title: 'Nessuna scadenza dimenticata. Ci pensiamo noi.',
    desc: 'F24, IVA, dichiarazioni periodiche, scadenzario INPS e INAIL. Ti avvisiamo in anticipo, prepariamo tutto e gestiamo gli adempimenti per tuo conto.',
    mock: (
      <div className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/8">
          <span className="text-xs text-white/30">Adempimenti gestiti — Maggio 2025</span>
        </div>
        <div className="p-5 space-y-2">
          {[
            { label: 'F24 INPS dipendenti', date: '16 Mag', stato: 'Preparato' },
            { label: 'Versamento IVA mensile', date: '16 Mag', stato: 'Preparato' },
            { label: 'Dich. IVA trimestrale', date: '31 Mag', stato: 'In lavorazione' },
            { label: 'CU lavoratori autonomi', date: '31 Mag', stato: 'In lavorazione' },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <div>
                <div className="text-sm text-white/65">{r.label}</div>
                <div className="text-xs text-white/25 mt-0.5">Scadenza {r.date}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${r.stato === 'Preparato' ? 'border-white/15 text-white/40' : 'border-white/8 text-white/25'}`}>{r.stato}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Report & chiusure',
    title: 'Chiusure mensili e annuali pronte, senza rincorrere nessuno',
    desc: 'Situazioni patrimoniali mensili, bilanci di verifica, chiusure annuali. Tutto elaborato dal nostro team e consegnato nei tempi concordati.',
    mock: (
      <div className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between">
          <span className="text-xs text-white/30">Report mensile — Aprile 2025</span>
          <span className="text-xs text-white/20 border border-white/8 px-2 py-0.5 rounded-full">Consegnato 30/04</span>
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: 'Ricavi del mese', val: '€ 84.200', trend: '+12% vs marzo' },
            { label: 'Costi operativi', val: '€ 61.400', trend: '−3% vs marzo' },
            { label: 'Posizione IVA', val: '€ 4.320 a debito', trend: 'Versamento 16 Mag' },
            { label: 'Liquidità netta', val: '€ 38.100', trend: 'Aggiornata al 30/04' },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-sm text-white/40">{r.label}</span>
              <div className="text-right">
                <div className="text-sm text-white/70">{r.val}</div>
                <div className="text-xs text-white/20">{r.trend}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function HomeV2() {
  const [activeTab, setActiveTab] = useState(0)
  const [formType, setFormType] = useState<FormType>(null)
  const [formData, setFormData] = useState<FormData>({ name: '', company: '', email: '', type: null })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const openForm = (type: FormType) => { setFormType(type); setFormData({ name: '', company: '', email: '', type }); setError('') }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch { setError('Qualcosa è andato storto. Riprova.') }
    finally { setLoading(false) }
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5 sticky top-0 bg-[#0d1117]/90 backdrop-blur-md z-40 border-b border-white/5">
        <div className="font-bold text-xl tracking-tight">Numer.ia</div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/40">
          <span className="hover:text-white/70 cursor-pointer transition-colors">Il servizio</span>
          <span className="hover:text-white/70 cursor-pointer transition-colors">Come funziona</span>
          <span className="hover:text-white/70 cursor-pointer transition-colors">Chi siamo</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => openForm('sales')} className="text-sm px-4 py-2 text-white/50 hover:text-white transition-colors">
            Parla con noi
          </button>
          <button onClick={() => openForm('demo')} className="text-sm px-5 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-medium">
            Demo gratuita
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-8 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs text-white/35 border border-white/8 px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white/25 inline-block"/>
              Servizio certificato ISO 9001 · ISO 27001 — Supervisione umana garantita
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Il tuo back-office<br />
              <span className="text-white/25">ci pensa Numer.ia.</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
              Esternalizzi contabilità, paghe e adempimenti fiscali.
              Noi gestiamo tutto con tecnologia AI supervisionata da esperti certificati
              e ti consegniamo i risultati, pronti, ogni mese.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => openForm('demo')} className="px-7 py-3.5 bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-semibold">
                Prenota una demo di 10&apos;
              </button>
              <button onClick={() => openForm('sales')} className="px-7 py-3.5 border border-white/12 text-white/60 rounded-lg hover:border-white/25 hover:text-white transition-colors">
                Parla con un consulente
              </button>
            </div>
            <p className="text-xs text-white/20 mt-5">Nessun impegno. Risposta entro 24 ore.</p>
          </div>

          {/* HERO CARD — delivery, not dashboard */}
          <div className="max-w-2xl mx-auto rounded-2xl border border-white/8 bg-[#161b22] overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
              <span className="text-sm text-white/40 font-medium">Consegna mensile — Aprile 2025</span>
              <div className="flex items-center gap-2 text-xs text-white/25">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"/>
                Consegnato il 30/04
              </div>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: 'Prima nota completa', sub: '48 registrazioni verificate' },
                { label: 'Cedolini elaborati', sub: '12 dipendenti · F24 pronto' },
                { label: 'Riconciliazione bancaria', sub: '2 conti correnti — 148 movimenti' },
                { label: 'Scadenzario maggio', sub: 'F24 INPS · IVA · Dich. trimestrale' },
                { label: 'Report mensile', sub: 'Situazione patrimoniale aggiornata' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-white/5 last:border-0">
                  <div className="w-6 h-6 rounded-full border border-white/12 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white/75">{r.label}</div>
                    <div className="text-xs text-white/25 mt-0.5">{r.sub}</div>
                  </div>
                  <span className="text-xs text-white/20">↓ PDF</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-white/5 bg-[#0d1117]/50">
              <p className="text-xs text-white/20 text-center">Validato dal team di esperti certificati · Nessun intervento richiesto da parte tua</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-8 py-10 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {['ISO 9001:2015', 'ISO 27001', 'GDPR Compliant', 'Dati server EU', 'Supervisione umana certificata'].map(b => (
              <div key={b} className="flex items-center gap-2 border border-white/8 rounded-lg px-4 py-2">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5l2.5 2.5L9.5 2.5" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-xs text-white/35">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-8 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { val: '10×', label: 'più veloce del processo manuale', sub: 'dalla ricezione documenti alla consegna' },
            { val: '−94%', label: 'errori rispetto alla gestione interna', sub: 'validato su 12 mesi di operatività' },
            { val: '200+', label: 'studi e aziende già clienti', sub: 'in tutta Italia' },
          ].map(s => (
            <div key={s.val}>
              <div className="text-5xl font-bold mb-2">{s.val}</div>
              <div className="text-sm text-white/40 mb-1">{s.label}</div>
              <div className="text-xs text-white/20">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="px-8 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-3">Il servizio</p>
            <h2 className="text-4xl font-bold leading-snug">Cosa ricevi ogni mese</h2>
            <p className="text-white/35 mt-3 max-w-xl text-sm">Tutto consegnato dal nostro team, verificato dagli esperti. Tu non devi fare nulla.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-0 border border-white/8 rounded-2xl overflow-hidden">
            <div className="border-r border-white/8 bg-[#161b22]">
              {DELIVERABLES.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-full text-left px-6 py-5 text-sm transition-all border-b border-white/5 last:border-0 flex items-center gap-3 ${activeTab === i ? 'text-white bg-white/5' : 'text-white/35 hover:text-white/60'}`}
                >
                  <div className={`w-0.5 h-4 rounded-full shrink-0 ${activeTab === i ? 'bg-white/40' : 'bg-transparent'}`}/>
                  {f.label}
                </button>
              ))}
            </div>
            <div className="p-8 bg-[#0d1117]">
              <h3 className="text-xl font-bold mb-3">{DELIVERABLES[activeTab].title}</h3>
              <p className="text-sm text-white/35 mb-6 leading-relaxed">{DELIVERABLES[activeTab].desc}</p>
              {DELIVERABLES[activeTab].mock}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-8 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-3">Come funziona</p>
            <h2 className="text-3xl font-bold">Operativo in 48 ore. Poi pensiamo a tutto noi.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', title: 'Onboarding in 48h', desc: 'Ci colleghi il gestionale e ci passi i documenti del mese corrente. Assegniamo il tuo referente dedicato. Nessuna migrazione, nessuna interruzione.' },
              { n: '02', title: 'Noi gestiamo tutto', desc: 'Contabilità, paghe, F24 e adempimenti. Il nostro team — umano e AI — elabora, verifica e consegna ogni mese senza che tu debba fare nulla.' },
              { n: '03', title: 'Tu ricevi e firmi', desc: 'Ogni mese trovi tutto pronto: documenti verificati, scadenze gestite, report aggiornati. Il tuo referente ti aggiorna su qualsiasi novità.' },
            ].map(s => (
              <div key={s.n} className="border border-white/8 rounded-2xl p-8 bg-[#161b22]">
                <div className="text-4xl font-bold text-white/8 mb-6">{s.n}</div>
                <h3 className="font-semibold text-white/75 text-lg mb-3">{s.title}</h3>
                <p className="text-sm text-white/30 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI POSITIONING */}
      <section className="px-8 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-white/25 uppercase tracking-widest mb-4">Perché Numer.ia</p>
            <h2 className="text-3xl font-bold mb-5 leading-snug">AI che lavora. Esperti che controllano. Tu che ti concentri sui tuoi clienti.</h2>
            <p className="text-white/35 leading-relaxed text-sm mb-4">
              Non vendiamo software. Forniamo un servizio completo: i nostri sistemi AI — sviluppati
              specificatamente per la normativa italiana — elaborano ogni documento, e ogni output
              viene verificato da un team di esperti prima di arrivare da te.
            </p>
            <p className="text-white/35 leading-relaxed text-sm">
              Il risultato è la velocità dell&apos;automazione con la responsabilità di un professionista esperto.
            </p>
          </div>
          <div className="border border-white/8 rounded-2xl p-6 bg-[#161b22] space-y-4">
            {[
              { title: 'Non usi software — ricevi risultati', desc: 'Non devi imparare nulla. Non devi configurare niente. Ti consegniamo documenti pronti.' },
              { title: 'Supervisione umana su ogni output', desc: 'Ogni elaborazione è controllata da un esperto certificato prima della consegna.' },
              { title: 'Un referente, non un call center', desc: 'Una persona dedicata conosce il tuo studio e risponde in meno di 4 ore.' },
              { title: 'Normativa sempre aggiornata', desc: 'Il servizio recepisce automaticamente variazioni fiscali e previdenziali italiane.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start py-3 border-b border-white/5 last:border-0">
                <div className="w-7 h-7 border border-white/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1.5 5.5l2.5 2.5L9.5 2.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/70 mb-1">{item.title}</div>
                  <div className="text-xs text-white/30 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="px-8 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-white/20 uppercase tracking-widest mb-4">Partnership e investitori</p>
          <h2 className="text-2xl font-bold mb-4 text-white/70">Fondati con il supporto dei migliori studi italiani</h2>
          <p className="text-sm text-white/25 max-w-xl mx-auto mb-12 leading-relaxed">
            Numer.ia è nata con la partnership e il contributo diretto di alcuni tra i principali
            studi di commercialisti e consulenti del lavoro in Italia. La loro esperienza operativa
            guida ogni aspetto del servizio.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { region: 'Nord Ovest', spec: 'Consulenza fiscale' },
              { region: 'Nord Est', spec: 'Diritto del lavoro' },
              { region: 'Centro Italia', spec: 'PMI e aziende' },
              { region: 'Sud Italia', spec: 'Contabilità industriale' },
            ].map((p, i) => (
              <div key={i} className="border border-white/8 rounded-xl p-6 text-center bg-[#161b22]">
                <div className="w-10 h-10 border border-white/8 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white/15 text-sm">✦</span>
                </div>
                <div className="text-xs font-medium text-white/40">Studio partner</div>
                <div className="text-xs text-white/20 mt-1">{p.region}</div>
                <div className="text-xs text-white/15 mt-0.5">{p.spec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Smetti di gestire la contabilità. Inizia a riceverla.</h2>
          <p className="text-white/35 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            10 minuti di demo per capire quanto tempo puoi liberare ogni mese.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <button onClick={() => openForm('demo')} className="px-7 py-4 bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-semibold">
              Prenota una demo gratuita
            </button>
            <button onClick={() => openForm('sales')} className="px-7 py-4 border border-white/12 text-white/50 rounded-lg hover:border-white/25 hover:text-white transition-colors">
              Parla con un consulente
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-white/18">
            <span>ISO 9001 · ISO 27001</span><span>GDPR Compliant</span><span>Dati server EU</span><span>Supporto in italiano</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-8 border-t border-white/5 text-center text-xs text-white/15">
        © {new Date().getFullYear()} Numer.ia
      </footer>

      {/* MODAL */}
      {formType && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#161b22] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 border border-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l4.5 4.5L16 6" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Ricevuto!</h3>
                <p className="text-white/35 text-sm">Ti ricontatteremo entro 24 ore.</p>
                <button onClick={() => { setFormType(null); setSubmitted(false) }} className="mt-6 text-sm text-white/25 hover:text-white/50 underline">
                  Chiudi
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-lg">{formType === 'demo' ? "Prenota una demo di 10'" : 'Parla con un consulente'}</h3>
                  <button onClick={() => setFormType(null)} className="text-white/25 hover:text-white/50 text-2xl leading-none">×</button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { ph: 'Il tuo nome', key: 'name', type: 'text' },
                    { ph: 'Studio / Azienda', key: 'company', type: 'text' },
                    { ph: 'Email', key: 'email', type: 'email' },
                  ].map((f) => (
                    <input
                      key={f.key} required type={f.type} placeholder={f.ph}
                      value={formData[f.key as keyof FormData] as string}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="bg-[#0d1117] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25"
                    />
                  ))}
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button type="submit" disabled={loading} className="bg-white text-black rounded-lg py-3.5 text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50 mt-2">
                    {loading ? 'Invio...' : formType === 'demo' ? 'Prenota la demo' : 'Invia richiesta'}
                  </button>
                  <p className="text-xs text-white/18 text-center">Nessuno spam. Risposta entro 24 ore.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

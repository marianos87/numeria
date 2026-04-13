'use client'

import { useState } from 'react'

type FormType = 'sales' | 'demo' | null

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  type: FormType
}

export default function Home() {
  const [formType, setFormType] = useState<FormType>(null)
  const [formData, setFormData] = useState<FormData>({ name: '', company: '', email: '', phone: '', type: null })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const openForm = (type: FormType) => {
    setFormType(type)
    setFormData({ name: '', company: '', email: '', phone: '', type })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Qualcosa è andato storto. Riprova o scrivici a mariano.spalletti@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-40">
        <div className="font-bold text-xl tracking-tight text-white">Numer.ia</div>
        <div className="flex gap-3">
          <button
            onClick={() => openForm('sales')}
            className="text-sm px-4 py-2 border border-white/20 text-white rounded-lg hover:border-white/50 transition-colors"
          >
            Parla con noi
          </button>
          <button
            onClick={() => openForm('demo')}
            className="text-sm px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Demo gratuita
          </button>
        </div>
      </nav>

      {/* HERO — dark */}
      <section className="bg-[#0a0a0a] text-white px-8 pt-28 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 text-gray-300 px-4 py-1.5 rounded-full mb-10">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            Tecnologia certificata — supervisionata da esperti contabili e fiscali
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
            Contabilità e paghe.<br />
            <span className="text-gray-500">Senza errori. Senza attese.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Sistemi AI sviluppati ad hoc per il back-office contabile, validati e supervisionati
            da un network di esperti certificati in tutta Italia.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => openForm('demo')}
              className="px-7 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-semibold text-base"
            >
              Prenota una demo di 10&apos;
            </button>
            <button
              onClick={() => openForm('sales')}
              className="px-7 py-4 border border-white/20 text-white rounded-lg hover:border-white/50 transition-colors font-medium text-base"
            >
              Parla con un consulente
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-6">Nessun impegno. Risposta entro 24 ore.</p>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-[#0a0a0a] border-t border-white/5 pb-16">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-8">Certificazioni e standard di qualità</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['ISO 9001', 'ISO 27001', 'GDPR Compliant', 'SOC 2 Type II'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 border border-white/10 rounded-lg px-5 py-2.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.3l-3.2 1.7.6-3.6L2 4.8l3.6-.5z" fill="#10b981" stroke="#10b981" strokeWidth="0.5"/>
                </svg>
                <span className="text-sm text-gray-300 font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — white */}
      <section className="border-y border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">10×</div>
            <div className="text-sm text-gray-500">velocità di elaborazione</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">−94%</div>
            <div className="text-sm text-gray-500">errori di riconciliazione</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">200+</div>
            <div className="text-sm text-gray-500">studi e aziende clienti</div>
          </div>
        </div>
      </section>

      {/* AI POSITIONING — alternating layout */}
      <section className="max-w-5xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-medium">Tecnologia</div>
            <h2 className="text-3xl font-bold mb-5 leading-snug">AI sviluppata per la contabilità italiana — non adattata.</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              I nostri sistemi non sono strumenti generici. Sono stati progettati specificamente per
              i flussi contabili e fiscali italiani: normative, scadenzari, adempimenti previdenziali.
              Ogni output è verificato da un team di esperti prima di essere consegnato.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Il risultato: la velocità dell&apos;automazione con la precisione di un professionista esperto.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 space-y-5">
            {[
              { label: 'Supervisione umana', desc: 'Ogni elaborazione è controllata da un esperto certificato' },
              { label: 'Aggiornamento continuo', desc: 'Il sistema si adatta automaticamente alle variazioni normative' },
              { label: 'Audit trail completo', desc: 'Ogni operazione è tracciata e documentata per i controlli' },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PARTNERS */}
        <div className="border-t border-gray-100 pt-20">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-10 font-medium">
            Partner e collaborazioni con studi di consulenza in tutta Italia
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Studio Rossi & Associati\nMilano',
              'Consulgroup S.r.l.\nRoma',
              'Fabbri Tax Advisory\nBologna',
              'Studio Ferrara & Partners\nNapoli',
            ].map((partner) => {
              const [name, city] = partner.split('\n')
              return (
                <div key={name} className="border border-gray-100 rounded-xl p-5 text-center hover:border-gray-200 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold text-gray-400">
                    {name.charAt(0)}
                  </div>
                  <div className="text-xs font-semibold text-gray-700">{name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{city}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — dark */}
      <section className="bg-[#0a0a0a] text-white py-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Come funziona</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Tre passaggi per integrare Numer.ia nel tuo studio senza interruzioni operative.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Onboarding in 48h', desc: 'Colleghi il tuo gestionale, assegniamo il referente dedicato. Nessuna migrazione, nessuna interruzione.' },
              { step: '02', title: 'Elaborazione continua', desc: 'Contabilità, paghe, F24 e adempimenti gestiti in automatico e supervisionati dal team certificato.' },
              { step: '03', title: 'Controllo totale', desc: 'Accesso in tempo reale a tutto. Il tuo referente ti aggiorna su scadenze, anomalie e report mensili.' },
            ].map((s) => (
              <div key={s.step} className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
                <div className="text-3xl font-bold text-gray-700 mb-6">{s.step}</div>
                <h3 className="font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WHO — white */}
      <section className="max-w-5xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-medium">Per chi</div>
            <h2 className="text-3xl font-bold mb-6">Pensato per studi e PMI italiani</h2>
            <div className="space-y-4">
              {[
                'Studi di commercialisti con 2–20 collaboratori',
                'Consulenti del lavoro con gestione paghe esternalizzata',
                'PMI con reparto amministrativo da ottimizzare',
                'Studi in crescita che vogliono scalare senza assumere',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => openForm('demo')}
              className="mt-8 px-7 py-3.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Verifica se fa per te
            </button>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-6 font-medium">Cosa gestiamo</div>
            <div className="space-y-0">
              {[
                'Registrazioni e prima nota',
                'Riconciliazioni bancarie',
                'Chiusure mensili e annuali',
                'Elaborazione cedolini',
                'F24 e versamenti contributivi',
                'Scadenzario e adempimenti',
                'Dichiarazioni fiscali',
              ].map((item) => (
                <div key={item} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">{item}</span>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">AI + Supervisione</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="bg-[#0a0a0a] text-white py-24">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Pronto a liberare il tuo studio?</h2>
          <p className="text-gray-400 mb-10 text-lg">
            10 minuti di demo. Nessun impegno. Scopri quante ore puoi recuperare ogni mese.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <button
              onClick={() => openForm('demo')}
              className="px-7 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Prenota una demo gratuita
            </button>
            <button
              onClick={() => openForm('sales')}
              className="px-7 py-4 border border-white/20 text-white rounded-lg hover:border-white/50 transition-colors font-medium"
            >
              Parla con un consulente
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-600">
            <span>ISO 9001 · ISO 27001</span>
            <span>GDPR Compliant</span>
            <span>Dati in server EU</span>
            <span>Supporto in italiano</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-8 border-t border-gray-100 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Numer.ia — mariano.spalletti@gmail.com
      </footer>

      {/* MODAL */}
      {formType && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l4.5 4.5L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Ricevuto!</h3>
                <p className="text-gray-500 text-sm">Ti ricontatteremo entro 24 ore.</p>
                <button
                  onClick={() => { setFormType(null); setSubmitted(false) }}
                  className="mt-6 text-sm underline text-gray-400 hover:text-gray-600"
                >
                  Chiudi
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-lg">
                    {formType === 'demo' ? 'Prenota una demo di 10\'' : 'Parla con un consulente'}
                  </h3>
                  <button onClick={() => setFormType(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    required
                    placeholder="Il tuo nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                  />
                  <input
                    required
                    placeholder="Studio / Azienda"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                  />
                  <input
                    type="tel"
                    placeholder="Telefono (opzionale)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                  />
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white rounded-lg py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 mt-2"
                  >
                    {loading ? 'Invio in corso...' : formType === 'demo' ? 'Prenota la demo' : 'Invia richiesta'}
                  </button>
                  <p className="text-xs text-gray-400 text-center">Nessuno spam. Risposta entro 24 ore.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </main>
  )
}

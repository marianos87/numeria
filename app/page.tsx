'use client'

import { useState } from 'react'

type FormType = 'sales' | 'demo' | null

interface FormData {
  name: string
  company: string
  email: string
  type: FormType
}

export default function Home() {
  const [formType, setFormType] = useState<FormType>(null)
  const [formData, setFormData] = useState<FormData>({ name: '', company: '', email: '', type: null })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const openForm = (type: FormType) => {
    setFormType(type)
    setFormData({ name: '', company: '', email: '', type })
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
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
        <div className="font-bold text-xl tracking-tight">Numer.ia</div>
        <div className="flex gap-3">
          <button
            onClick={() => openForm('sales')}
            className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-500 transition-colors"
          >
            Parla con noi
          </button>
          <button
            onClick={() => openForm('demo')}
            className="text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Demo gratuita
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <div className="inline-block text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-6">
          Centro elaborazione dati — potenziato dall&apos;AI
        </div>
        <h1 className="text-5xl font-bold tracking-tight leading-tight mb-6">
          Contabilità e paghe.<br />
          <span className="text-gray-400">Senza errori. Senza attese.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          Numer.ia gestisce i processi di back-office del tuo studio con intelligenza artificiale.
          10× più veloce, più preciso, con un referente dedicato che conosci per nome.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => openForm('demo')}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Prenota una demo di 10&apos;
          </button>
          <button
            onClick={() => openForm('sales')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-500 transition-colors font-medium"
          >
            Parla con un consulente
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-8 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-1">10×</div>
            <div className="text-sm text-gray-500">velocità di elaborazione</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">−94%</div>
            <div className="text-sm text-gray-500">errori di riconciliazione</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">1</div>
            <div className="text-sm text-gray-500">referente dedicato</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-2xl font-bold mb-12 text-center">Come funziona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Elaborazione contabile',
              desc: 'Registrazioni, riconciliazioni e chiusure mensili gestite in automatico. Il tuo studio si concentra sui clienti.',
            },
            {
              title: 'Gestione paghe',
              desc: 'Cedolini, F24 e adempimenti previdenziali elaborati con precisione e puntualità. Zero ritardi.',
            },
            {
              title: 'Referente dedicato',
              desc: 'Un professionista che conosce il tuo studio segue ogni pratica. Disponibile, responsabile, continuo.',
            },
          ].map((f) => (
            <div key={f.title} className="border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOR WHO */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Per chi è Numer.ia</h2>
          <p className="text-gray-500 mb-8">
            Studi commercialisti, consulenti del lavoro e PMI che vogliono ridurre i costi fissi,
            gestire i picchi di lavoro e liberare tempo per le attività ad alto valore.
          </p>
          <button
            onClick={() => openForm('demo')}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Scopri se fa per te — 10&apos; di demo
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-8 border-t border-gray-100 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Numer.ia — mariano.spalletti@gmail.com
      </footer>

      {/* MODAL */}
      {formType && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-4">✓</div>
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
                  <button onClick={() => setFormType(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
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
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 mt-2"
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

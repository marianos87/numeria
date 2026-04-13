import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const { name, company, email, phone, type } = await req.json()

  // Save to Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error: dbError } = await supabase.from('leads').insert([
    { name, company, email, phone: phone || null, type, created_at: new Date().toISOString() }
  ])

  if (dbError) {
    console.error('Supabase error:', dbError)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  // Send confirmation email
  const resend = new Resend(process.env.RESEND_API_KEY!)

  await resend.emails.send({
    from: 'Numer.ia <noreply@nexdomus.it>',
    to: email,
    subject: type === 'demo' ? 'Demo prenotata — Numer.ia' : 'Richiesta ricevuta — Numer.ia',
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; color: #1a1a1a;">
        <h2 style="font-size: 1.3rem; margin-bottom: 8px;">Ciao ${name},</h2>
        <p style="color: #555; line-height: 1.6;">
          ${type === 'demo'
            ? 'Abbiamo ricevuto la tua richiesta di demo. Ti ricontatteremo entro 24 ore per fissare un appuntamento di 10 minuti.'
            : 'Abbiamo ricevuto la tua richiesta. Ti ricontatteremo entro 24 ore.'}
        </p>
        <p style="color: #555; line-height: 1.6; margin-top: 16px;">
          Nel frattempo, puoi scriverci direttamente a <a href="mailto:mariano.spalletti@gmail.com" style="color:#000;">mariano.spalletti@gmail.com</a>.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="font-size: 0.8rem; color: #aaa;">Numer.ia — Centro elaborazione dati potenziato dall'AI</p>
      </div>
    `,
  })

  // Notify Mario
  await resend.emails.send({
    from: 'Numer.ia <noreply@nexdomus.it>',
    to: 'mariano.spalletti@gmail.com',
    subject: `Nuovo lead: ${name} (${type === 'demo' ? 'Demo' : 'Sales'})`,
    html: `
      <div style="font-family: system-ui, sans-serif; padding: 24px; color: #1a1a1a;">
        <h3>Nuovo lead da Numer.ia</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Studio/Azienda:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
        <p><strong>Tipo:</strong> ${type === 'demo' ? 'Demo 10\'' : 'Parla con noi'}</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}

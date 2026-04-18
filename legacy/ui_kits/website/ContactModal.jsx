function ContactModal({ open, onClose }) {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ nome: '', placa: '', servico: 'Diagnóstico', msg: '' });

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="eyebrow" style={{color:'#FF6A1A'}}>FALA COM A GENTE</div>
            <h3>{step === 0 ? 'PEDIR ORÇAMENTO' : 'MANDAMOS PRO ZAP ›'}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        {step === 0 ? (
          <form onSubmit={submit} className="modal-body">
            <label>Seu nome
              <input className="field" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} placeholder="Ex: João Ribeiro" required/>
            </label>
            <label>Placa do caminhão
              <input className="field mono" value={form.placa} onChange={e=>setForm({...form,placa:e.target.value.toUpperCase()})} placeholder="ABC-1D23"/>
            </label>
            <label>Serviço
              <select className="field" value={form.servico} onChange={e=>setForm({...form,servico:e.target.value})}>
                <option>Diagnóstico</option>
                <option>Motor</option>
                <option>Bico injetor / bomba</option>
                <option>Turbo</option>
                <option>Preventiva</option>
                <option>Guincho / socorro</option>
              </select>
            </label>
            <label>Conta o problema
              <textarea className="field" rows="3" value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Ex: falhando em rotação baixa, fumaça preta..."/>
            </label>
            <button type="submit" className="btn whatsapp" style={{width:'100%', justifyContent:'center'}}>MANDAR PRO ZAP ›</button>
            <div className="modal-note">A gente responde na hora, em horário de oficina.</div>
          </form>
        ) : (
          <div className="modal-body success">
            <div className="success-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#4CB944" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>
            </div>
            <h3 style={{textAlign:'center'}}>OBRIGADO, {form.nome.split(' ')[0].toUpperCase() || 'CHEFE'}!</h3>
            <p style={{textAlign:'center'}}>
              A gente recebeu seu pedido e já tá te chamando no WhatsApp.
              Placa <span className="mono">{form.placa || '—'}</span> · {form.servico}.
            </p>
            <button className="btn secondary" style={{width:'100%', justifyContent:'center'}} onClick={onClose}>FECHAR</button>
          </div>
        )}
      </div>
    </div>
  );
}

function WhatsAppFloat({ onClick }) {
  return (
    <button className="wa-float" onClick={onClick} aria-label="Abrir WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    </button>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-stripe"/>
      <div className="footer-inner">
        <div className="footer-col">
          <img src="../../assets/logo-mark.svg" width="64" height="64" alt=""/>
          <div className="footer-brand">FABIO MECÂNICA DIESEL</div>
          <div className="muted">Oficina especializada em caminhões.</div>
        </div>
        <div className="footer-col">
          <div className="h3">CONTATO</div>
          <div>(11) 98765-4321</div>
          <div>contato@fabiodiesel.com.br</div>
          <div className="muted">Rod. BR-116, km 218 · Guarulhos/SP</div>
        </div>
        <div className="footer-col">
          <div className="h3">HORÁRIO</div>
          <div>Seg–Sex · 7h–18h</div>
          <div>Sáb · 7h–13h</div>
          <div className="muted">Emergência 24h via WhatsApp</div>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 FABIO MECÂNICA DIESEL · CNPJ 00.000.000/0001-00</span>
        <span className="muted">Feito com óleo diesel e café.</span>
      </div>
    </footer>
  );
}

window.ContactModal = ContactModal;
window.WhatsAppFloat = WhatsAppFloat;
window.Footer = Footer;

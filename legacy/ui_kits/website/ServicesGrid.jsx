const SERVICES = [
  { icon: 'piston', title: 'Motor Diesel', desc: 'Retífica, revisão completa, diagnóstico por scanner.' },
  { icon: 'injector', title: 'Bico & Bomba Injetora', desc: 'Teste em bancada, limpeza ultrassônica, troca.' },
  { icon: 'turbo', title: 'Turbocompressor', desc: 'Reparo, balanceamento, substituição.' },
  { icon: 'gauge', title: 'Diagnóstico Eletrônico', desc: 'Scanner para todas as marcas — Scania, Volvo, MB, Iveco.' },
  { icon: 'wrench', title: 'Manutenção Preventiva', desc: 'Checklist a cada 20 mil km. Contratos de frota.' },
  { icon: 'truck', title: 'Guincho & Socorro', desc: 'Caminhão quebrado na estrada? A gente vai buscar.' },
];

function ServiceIcon({ name }) {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2 };
  if (name === 'piston') return <img src="../../assets/icon-piston.svg" width="32" height="32" />;
  if (name === 'turbo') return <img src="../../assets/icon-turbo.svg" width="32" height="32" />;
  if (name === 'injector') return <img src="../../assets/icon-injector.svg" width="32" height="32" />;
  if (name === 'gauge') return <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}><path d="M12 14l4-4"/><path d="M3.34 19A10 10 0 1 1 20.66 19"/></svg>;
  if (name === 'wrench') return <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
  if (name === 'truck') return <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}><rect x="1" y="6" width="14" height="11"/><rect x="15" y="9" width="7" height="8"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>;
  return null;
}

function ServicesGrid() {
  return (
    <section className="services" id="servicos">
      <div className="section-head">
        <div className="eyebrow">O QUE A GENTE FAZ</div>
        <h2 className="display-md">SERVIÇOS ESPECIALIZADOS</h2>
      </div>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div className={"card service-card" + (i === 0 ? ' feature' : '')} key={s.title}>
            <div className="service-icon"><ServiceIcon name={s.icon} /></div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

window.ServicesGrid = ServicesGrid;

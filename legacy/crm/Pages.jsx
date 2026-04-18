function Veiculos({ go }) {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">FROTA</span>
          <div className="page-title">VEÍCULOS</div>
          <p>{VEICULOS.length} caminhões cadastrados · veja placa, KM e cliente responsável.</p>
        </div>
        <div className="page-actions">
          <button className="btn sm">{Icon.plus} NOVO VEÍCULO</button>
        </div>
      </div>
      <div className="veiculos-grid">
        {VEICULOS.map(v => (
          <div key={v.placa} className="veic-card" onClick={()=>go('os')}>
            <div className="veic-row">
              <div>
                <div className="veic-marca">{v.marca}</div>
                <div className="veic-modelo">{v.modelo} · {v.ano}</div>
              </div>
              <span className="veic-placa">{v.placa}</span>
            </div>
            <div className="veic-meta">
              <div><div className="m-l">KM atual</div><div className="m-v mono">{v.km.toLocaleString('pt-BR')}</div></div>
              <div><div className="m-l">Cliente</div><div className="m-v" style={{fontSize:13,fontFamily:'var(--font-body)',fontWeight:500}}>{v.cliente}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Agenda() {
  const dias = [
    { d: 'SEG', n: '14', today: false },
    { d: 'TER', n: '15', today: false },
    { d: 'QUA', n: '16', today: false },
    { d: 'QUI', n: '17', today: false },
    { d: 'SEX', n: '18', today: true },
    { d: 'SÁB', n: '19', today: false },
  ];
  const horas = ['08:00','10:00','12:00','14:00','16:00'];
  const events = {
    '08:00-0': { t: 'Preventiva · DAF XF', who: 'FrigoNorte', kind: 'green' },
    '08:00-4': { t: 'OS-0418 · Bicos Scania', who: 'João Ribeiro', kind: 'orange' },
    '10:00-1': { t: 'Retorno câmbio', who: 'Toninho Lima', kind: '' },
    '10:00-3': { t: 'Visita frota', who: 'LogiSul', kind: '' },
    '12:00-4': { t: 'Entrega Actros', who: 'Três Irmãos', kind: 'green' },
    '14:00-0': { t: 'Turbo Garrett chega', who: 'OS-0415', kind: 'warn' },
    '14:00-2': { t: 'Diagnóstico urgente', who: 'autônomo', kind: 'danger' },
    '16:00-3': { t: 'Revisão Volvo FH', who: 'Cerealista', kind: 'orange' },
    '16:00-5': { t: 'Checklist sábado', who: 'interno', kind: '' },
  };
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">SEMANA · 14 a 19 ABR</span>
          <div className="page-title">AGENDA DA OFICINA</div>
          <p>Agendamentos, visitas de frota e serviços previstos.</p>
        </div>
        <div className="page-actions">
          <button className="btn secondary sm">SEMANA ‹</button>
          <button className="btn secondary sm">HOJE</button>
          <button className="btn secondary sm">› SEMANA</button>
          <button className="btn sm">{Icon.plus} AGENDAR</button>
        </div>
      </div>
      <div className="agenda">
        <div className="ag-head"></div>
        {dias.map(d => <div key={d.n} className={"ag-head day"+(d.today?' today':'')}>{d.d}<strong>{d.n}</strong></div>)}
        {horas.map(h => (
          <React.Fragment key={h}>
            <div className="ag-time">{h}</div>
            {dias.map((d, i) => {
              const e = events[h+'-'+i];
              return (
                <div key={d.n} className="ag-cell">
                  {e && <div className={"ag-event "+e.kind}><strong>{e.t}</strong><span className="who">{e.who}</span></div>}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Financeiro() {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">CAIXA · ABRIL 2026</span>
          <div className="page-title">FINANCEIRO</div>
          <p>A receber, recebido e inadimplência. Fechamento do mês em 12 dias.</p>
        </div>
        <div className="page-actions">
          <button className="btn secondary sm">{Icon.print} RELATÓRIO</button>
          <button className="btn sm">+ LANÇAMENTO</button>
        </div>
      </div>
      <div className="kpi-grid">
        <div className="kpi success"><div className="kpi-label">RECEBIDO · MÊS</div><div className="kpi-value">R$ 48k</div><div className="kpi-sub"><span className="up">+12%</span> vs mês passado</div></div>
        <div className="kpi"><div className="kpi-label">A RECEBER</div><div className="kpi-value">R$ 22k</div><div className="kpi-sub">9 ordens faturadas</div></div>
        <div className="kpi warn"><div className="kpi-label">VENCIDO</div><div className="kpi-value">R$ 4,8k</div><div className="kpi-sub">2 clientes · cobrar</div></div>
        <div className="kpi alt"><div className="kpi-label">TICKET MÉDIO</div><div className="kpi-value">R$ 3,2k</div><div className="kpi-sub">mês corrente</div></div>
      </div>
      <div className="panel">
        <div className="panel-head"><div className="panel-title">CONTAS A RECEBER</div><button className="panel-link">VER TUDO ›</button></div>
        <table className="data">
          <thead><tr><th>OS</th><th>CLIENTE</th><th>EMISSÃO</th><th>VENCIMENTO</th><th>VALOR</th><th>STATUS</th></tr></thead>
          <tbody>
            <tr><td className="mono"><strong>OS-2026-0411</strong></td><td>Cerealista Paulista</td><td className="mono">2026-04-15</td><td className="mono">2026-05-15</td><td className="mono"><strong>R$ 11.780,00</strong></td><td><span className="pill faturada"><span className="dot"/>EM DIA</span></td></tr>
            <tr><td className="mono"><strong>OS-2026-0401</strong></td><td>Toninho Lima</td><td className="mono">2026-03-20</td><td className="mono">2026-04-10</td><td className="mono danger-text"><strong>R$ 2.400,00</strong></td><td><span className="pill urgente"><span className="dot"/>VENCIDO 8D</span></td></tr>
            <tr><td className="mono"><strong>OS-2026-0398</strong></td><td>FrigoNorte</td><td className="mono">2026-03-28</td><td className="mono">2026-04-27</td><td className="mono"><strong>R$ 6.080,00</strong></td><td><span className="pill faturada"><span className="dot"/>EM DIA</span></td></tr>
            <tr><td className="mono"><strong>OS-2026-0395</strong></td><td>Severino da Silva</td><td className="mono">2026-03-15</td><td className="mono">2026-04-05</td><td className="mono danger-text"><strong>R$ 2.400,00</strong></td><td><span className="pill urgente"><span className="dot"/>VENCIDO 13D</span></td></tr>
            <tr><td className="mono"><strong>OS-2026-0407</strong></td><td>Transp. Três Irmãos</td><td className="mono">2026-04-08</td><td className="mono">2026-05-08</td><td className="mono"><strong>R$ 4.150,00</strong></td><td><span className="pill faturada"><span className="dot"/>EM DIA</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

window.Veiculos = Veiculos;
window.Agenda = Agenda;
window.Financeiro = Financeiro;

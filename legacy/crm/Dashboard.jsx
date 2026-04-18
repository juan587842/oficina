function Dashboard({ go }) {
  const recent = OS_LIST.slice(0, 5);
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">HOJE · SEX, 18 ABR</span>
          <div className="page-title">PAINEL DA OFICINA</div>
          <p>7 ordens em aberto · 3 com peça aguardando · R$ 18.350 faturados esta semana.</p>
        </div>
        <div className="page-actions">
          <button className="btn secondary sm">{Icon.print} IMPRIMIR</button>
          <button className="btn sm">{Icon.plus} NOVA OS</button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">OS ABERTAS</div>
          <div className="kpi-value">7</div>
          <div className="kpi-sub"><span className="up">+2</span> vs ontem</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-label">AGUARDANDO PEÇA</div>
          <div className="kpi-value">3</div>
          <div className="kpi-sub">mais antiga: 6 dias</div>
        </div>
        <div className="kpi success">
          <div className="kpi-label">CONCLUÍDAS · SEMANA</div>
          <div className="kpi-value">14</div>
          <div className="kpi-sub"><span className="up">+18%</span> vs semana passada</div>
        </div>
        <div className="kpi alt">
          <div className="kpi-label">FATURAMENTO · MÊS</div>
          <div className="kpi-value">R$ 62k</div>
          <div className="kpi-sub">meta R$ 80k · 78%</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">ORDENS RECENTES</div>
            <button className="panel-link" onClick={() => go('os')}>VER TODAS ›</button>
          </div>
          <div className="panel-body">
            <table className="data">
              <thead><tr>
                <th>OS</th><th>CLIENTE</th><th>VEÍCULO</th><th>STATUS</th><th>VALOR</th>
              </tr></thead>
              <tbody>
                {recent.map(os => (
                  <tr key={os.num} onClick={() => go('os/'+os.num)}>
                    <td className="mono"><strong>{os.num}</strong></td>
                    <td><div className="cell-name">{os.cliente}</div><div className="meta mono">{os.clienteId}</div></td>
                    <td><span className="placa">{os.placa}</span><div className="meta" style={{marginTop:4}}>{os.marca} · {os.modelo}</div></td>
                    <td><span className={"pill "+os.status}><span className="dot"/>{statusLabel(os.status)}</span></td>
                    <td className="mono"><strong>{os.valor > 0 ? BRL(os.valor) : '—'}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">HOJE NA OFICINA</div>
              <span className="mono muted-text" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em'}}>7h — 18h</span>
            </div>
            <div className="panel-body">
              <div className="tl-item">
                <div className="tl-dot"/>
                <div className="tl-body">
                  <div className="tl-when">08:20 · AGORA</div>
                  <div className="tl-what"><strong>OS-2026-0418</strong> entrou — João Ribeiro · Scania R 450</div>
                </div>
              </div>
              <div className="tl-item done">
                <div className="tl-dot"/>
                <div className="tl-body">
                  <div className="tl-when">09:00</div>
                  <div className="tl-what">Diego iniciou preventiva no Actros (OS-0416)</div>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-dot"/>
                <div className="tl-body">
                  <div className="tl-when">10:30</div>
                  <div className="tl-what">Chamada preventiva agendada — Três Irmãos</div>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-dot"/>
                <div className="tl-body">
                  <div className="tl-when">14:00</div>
                  <div className="tl-what">Turbo Garrett previsto chegar — OS-0415</div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">SERVIÇOS · ESTA SEMANA</div>
              {Icon.chart}
            </div>
            <div className="panel-body pad">
              <svg viewBox="0 0 300 140" style={{width:'100%', height:140}}>
                {[{d:'SEG',v:60},{d:'TER',v:80},{d:'QUA',v:45},{d:'QUI',v:90},{d:'SEX',v:70},{d:'SÁB',v:30}].map((b,i) => (
                  <g key={i}>
                    <rect x={20+i*46} y={120-b.v} width={32} height={b.v} fill={i===4?"#FF6A1A":"#0E0E10"}/>
                    <text x={36+i*46} y={135} textAnchor="middle" fontSize="10" fill="#55585F" fontFamily="JetBrains Mono, monospace">{b.d}</text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;

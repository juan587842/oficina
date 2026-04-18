function Ordens({ go }) {
  const [view, setView] = React.useState('kanban');
  const cols = [
    { id: 'aberta', label: 'ABERTAS' },
    { id: 'andamento', label: 'EM ANDAMENTO' },
    { id: 'aguardando', label: 'AGUARDANDO PEÇA' },
    { id: 'concluida', label: 'CONCLUÍDAS' },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">OPERAÇÃO</span>
          <div className="page-title">ORDENS DE SERVIÇO</div>
          <p>{OS_LIST.filter(o=>o.status!=='faturada').length} ordens ativas · arraste entre colunas para mudar status.</p>
        </div>
        <div className="page-actions">
          <div style={{display:'flex', border:'2px solid var(--preto-diesel)', borderRadius:2, overflow:'hidden'}}>
            <button className="chip" style={{border:0, borderRadius:0, background: view==='kanban'?'var(--preto-diesel)':'white', color: view==='kanban'?'var(--papel)':'var(--preto-diesel)'}} onClick={()=>setView('kanban')}>KANBAN</button>
            <button className="chip" style={{border:0, borderRadius:0, background: view==='lista'?'var(--preto-diesel)':'white', color: view==='lista'?'var(--papel)':'var(--preto-diesel)'}} onClick={()=>setView('lista')}>LISTA</button>
          </div>
          <button className="btn sm">{Icon.plus} NOVA OS</button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="kanban">
          {cols.map(col => {
            const items = OS_LIST.filter(o => o.status === col.id);
            return (
              <div key={col.id} className={"kan-col "+col.id}>
                <div className="kan-head">
                  <div className="t">{col.label}</div>
                  <div className="n">{items.length}</div>
                </div>
                <div className="kan-body">
                  {items.map(o => (
                    <div key={o.num} className={"os-card"+(o.urgente?' urgent':'')} onClick={()=>go('os/'+o.num)}>
                      <div className="os-num">{o.num}{o.urgente && <span style={{marginLeft:6, color:'var(--vermelho-freio)', fontWeight:700}}>· URGENTE</span>}</div>
                      <div className="os-title">{o.problema.length > 40 ? o.problema.slice(0,40)+'…' : o.problema}</div>
                      <div className="os-meta"><span className="placa">{o.placa}</span><span>{o.marca}</span></div>
                      <div className="os-meta" style={{margin:0}}>{o.cliente}</div>
                      <div className="os-foot">
                        <span className="mono muted-text">{o.mecanico}</span>
                        <span className="val">{o.valor>0?BRL(o.valor):'—'}</span>
                      </div>
                    </div>
                  ))}
                  {items.length===0 && <div style={{padding:'20px 10px', textAlign:'center', fontSize:12, color:'var(--graxa)', fontFamily:'var(--font-mono)'}}>—</div>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="panel">
          <table className="data">
            <thead><tr><th>OS</th><th>CLIENTE</th><th>VEÍCULO</th><th>PROBLEMA</th><th>MECÂNICO</th><th>STATUS</th><th>VALOR</th></tr></thead>
            <tbody>
              {OS_LIST.map(o => (
                <tr key={o.num} onClick={()=>go('os/'+o.num)}>
                  <td className="mono"><strong>{o.num}</strong></td>
                  <td>{o.cliente}</td>
                  <td><span className="placa">{o.placa}</span><div className="meta mono" style={{marginTop:4}}>{o.marca}</div></td>
                  <td style={{maxWidth:280, fontSize:13}}>{o.problema}</td>
                  <td className="mono">{o.mecanico}</td>
                  <td><span className={"pill "+o.status}><span className="dot"/>{statusLabel(o.status)}</span></td>
                  <td className="mono"><strong>{o.valor>0?BRL(o.valor):'—'}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function OrdemDetail({ num, go }) {
  const o = OS_LIST.find(x => x.num === num) || OS_LIST[0];
  const lines = [
    { kind: 'sec', label: 'MÃO DE OBRA' },
    { desc: 'Diagnóstico eletrônico por scanner', qt: 1, un: 'h', v: 180, total: 180 },
    { desc: 'Remoção e recolocação de bico injetor', qt: 6, un: 'un', v: 120, total: 720 },
    { desc: 'Teste de pressão em bancada', qt: 1, un: 'un', v: 240, total: 240 },
    { kind: 'sec', label: 'PEÇAS' },
    { desc: 'Bico injetor Bosch 0445120212', qt: 6, un: 'un', v: 480, total: 2880 },
    { desc: 'Kit vedação bico injetor', qt: 1, un: 'kit', v: 180, total: 180 },
    { desc: 'Óleo motor 15W40 CI-4 (balde 20L)', qt: 1, un: 'un', v: 600, total: 600 },
  ];
  const subtotal = lines.filter(l=>!l.kind).reduce((s,l)=>s+l.total,0);
  return (
    <div className="page">
      <button className="btn ghost xs" onClick={()=>go('os')} style={{marginBottom:12}}>{Icon.back} VOLTAR</button>
      <div className="detail-head">
        <div className="detail-head-row">
          <div>
            <div className="detail-kicker">ORDEM DE SERVIÇO · ENTRADA {o.entrada}</div>
            <div className="detail-title">{o.num}</div>
            <div className="detail-subs">
              <span><strong>{o.cliente}</strong></span>
              <span className="placa" style={{letterSpacing:2}}>{o.placa}</span>
              <span><strong>{o.marca}</strong> {o.modelo}</span>
              <span>Mecânico <strong>{o.mecanico}</strong></span>
              {o.urgente && <span style={{color:'#fff', background:'var(--vermelho-freio)', padding:'2px 8px'}}>URGENTE</span>}
            </div>
          </div>
          <div className="detail-actions">
            <span className={"pill "+o.status} style={{background:'white', color:'var(--preto-diesel)'}}><span className="dot"/>{statusLabel(o.status)}</span>
            <button className="btn secondary sm">{Icon.print} IMPRIMIR OS</button>
            <button className="btn whatsapp sm">{Icon.whatsapp} ENVIAR</button>
            <button className="btn sm">MUDAR STATUS ›</button>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">PROBLEMA RELATADO</div></div>
            <div className="panel-body pad">
              <p style={{margin:0, fontSize:15}}>{o.problema}.</p>
              <p style={{margin:'12px 0 0', fontSize:13, color:'var(--fg3)'}}>Cliente relata que falha começou após abastecimento em posto da estrada. Fumaça preta acentuada em aclives. KM atual: 412.500.</p>
            </div>
          </div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">ITENS DA OS</div><button className="panel-link">+ ADICIONAR ITEM</button></div>
            <table className="lines">
              <thead><tr><th>DESCRIÇÃO</th><th className="right">QT</th><th className="right">UN</th><th className="right">VALOR UN.</th><th className="right">TOTAL</th></tr></thead>
              <tbody>
                {lines.map((l, i) => l.kind === 'sec' ? (
                  <tr key={i} className="sec"><td colSpan="5">{l.label}</td></tr>
                ) : (
                  <tr key={i}>
                    <td>{l.desc}</td>
                    <td className="right">{l.qt}</td>
                    <td className="right">{l.un}</td>
                    <td className="right">{BRL(l.v)}</td>
                    <td className="right"><strong>{BRL(l.total)}</strong></td>
                  </tr>
                ))}
                <tr className="subtotal"><td colSpan="4" className="right">SUBTOTAL</td><td className="right">{BRL(subtotal)}</td></tr>
                <tr className="subtotal"><td colSpan="4" className="right">DESCONTO (5%)</td><td className="right">− {BRL(subtotal*0.05)}</td></tr>
                <tr className="total"><td colSpan="4" className="right">TOTAL</td><td className="right">{BRL(subtotal*0.95)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">LINHA DO TEMPO</div></div>
            <div className="timeline">
              <div className="tl-item"><div className="tl-dot"/><div className="tl-body"><div className="tl-when">HOJE · 08:20</div><div className="tl-what">OS aberta por atendimento do balcão</div><div className="tl-who">por Fabio M.</div></div></div>
              <div className="tl-item done"><div className="tl-dot"/><div className="tl-body"><div className="tl-when">08:45</div><div className="tl-what">Diagnóstico eletrônico concluído · códigos P0087 P0093</div><div className="tl-who">por Fabio M.</div></div></div>
              <div className="tl-item"><div className="tl-dot"/><div className="tl-body"><div className="tl-when">09:10</div><div className="tl-what">Bicos removidos, enviados p/ bancada</div><div className="tl-who">por Zé Carlos</div></div></div>
              <div className="tl-item"><div className="tl-dot"/><div className="tl-body"><div className="tl-when">—</div><div className="tl-what">Aguardando aprovação do cliente para troca dos 6 bicos</div></div></div>
            </div>
          </div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">INFO RÁPIDA</div></div>
            <div className="infobox">
              <div><div className="lbl">Entrada</div><div className="val mono">{o.entrada}</div></div>
              <div><div className="lbl">Previsão</div><div className="val mono">{o.previsao}</div></div>
              <div><div className="lbl">Cliente</div><div className="val">{o.cliente}</div></div>
              <div><div className="lbl">Veículo</div><div className="val mono">{o.placa}</div></div>
              <div><div className="lbl">Forma de pagto</div><div className="val">PIX · 30 dias</div></div>
              <div><div className="lbl">Garantia</div><div className="val">6 meses</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Ordens = Ordens;
window.OrdemDetail = OrdemDetail;

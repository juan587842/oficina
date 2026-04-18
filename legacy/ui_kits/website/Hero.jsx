function Hero({ onContact }) {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-left">
          <div className="eyebrow">OFICINA DIESEL · ESPECIALISTA EM CAMINHÕES</div>
          <h1 className="display-lg hero-title">
            CAMINHÃO PARADO<br/>
            É <span className="accent-word">PREJUÍZO</span>.<br/>
            A GENTE RESOLVE HOJE.
          </h1>
          <p className="body-lg hero-sub">
            Motor, câmbio, bico injetor, turbo, bomba injetora. Orçamento fechado antes
            do serviço — sem surpresa na hora de pagar.
          </p>
          <div className="hero-ctas">
            <button className="btn" onClick={onContact}>FALA COM A GENTE ›</button>
            <a className="btn secondary" href="#servicos">VER SERVIÇOS</a>
          </div>
          <div className="hero-meta">
            <div><strong>ABERTO</strong> seg–sáb · 7h–18h</div>
            <div><strong>EMERGÊNCIA</strong> 24h via WhatsApp</div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-photo">
            <div className="photo-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="64" height="64">
                <rect x="1" y="6" width="14" height="11"/><rect x="15" y="9" width="7" height="8"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>
              </svg>
              <div className="photo-caption">foto da oficina — substituir</div>
            </div>
          </div>
          <div className="hero-badge">
            <div className="hero-badge-n">+15</div>
            <div className="hero-badge-l">ANOS DE ESTRADA</div>
          </div>
        </div>
      </div>
      <div className="hero-stripe" />
    </section>
  );
}

window.Hero = Hero;

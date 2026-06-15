function CoinCard({ coin, navigate }) {
  const change = coin.price_change_percentage_24h;
  return (
    <tr onClick={() => navigate(`/coin/${coin.id}`, { state: { coin } })}>
      <td className="rank">{coin.market_cap_rank}</td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={coin.image} alt={coin.name} width="32" height="32" style={{ borderRadius: "50%", background: "rgba(255,255,255,0.06)", padding: 3 }} />
          <span className="coin-name-text">{coin.name}</span>
        </div>
      </td>
      <td className="coin-symbol">{coin.symbol.toUpperCase()}</td>
      <td style={{ color: "#f1f5f9", fontWeight: 600 }}>${coin.current_price.toLocaleString()}</td>
      <td className={change >= 0 ? "positive" : "negative"}>
        {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
      </td>
      <td>${coin.market_cap.toLocaleString()}</td>
    </tr>
  );
}

export default CoinCard;

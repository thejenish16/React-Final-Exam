function CoinCard({ coin, navigate }) {
  return (
    <tr onClick={() => navigate(`/coin/${coin.id}`, { state: { coin } })}>
      <td className="rank">{coin.market_cap_rank}</td>
      <td>
        <img src={coin.image} alt={coin.name} width="32" height="32" style={{ borderRadius: "50%", display: "block" }} />
      </td>
      <td className="coin-name-text">{coin.name}</td>
      <td className="coin-symbol">{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>${coin.market_cap.toLocaleString()}</td>
    </tr>
  );
}

export default CoinCard;

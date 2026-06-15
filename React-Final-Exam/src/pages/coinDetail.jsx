import { Link, useLocation, useParams } from "react-router";

function CoinDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const coin = state?.coin;

  if (!coin) return <div className="status">Coin not found. <Link to="/">Go Back</Link></div>;

  const change = coin.price_change_percentage_24h;

  return (
    <div className="detail-container">
      <Link to="/" className="back-btn">← Back</Link>

      <div className="detail-card">
        <div className="detail-header">
          <img src={coin.image} alt={coin.name} />
          <div>
            <h2>{coin.name}</h2>
            <span>{coin.symbol.toUpperCase()} · Rank #{coin.market_cap_rank}</span>
          </div>
        </div>

        <div className="detail-price">${coin.current_price.toLocaleString()}</div>

        <div className="detail-grid">
          <div className="detail-item">
            <div className="label">24h Change</div>
            <div className={`value ${change >= 0 ? "positive" : "negative"}`}>
              {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
            </div>
          </div>
          <div className="detail-item">
            <div className="label">Market Cap</div>
            <div className="value">${coin.market_cap.toLocaleString()}</div>
          </div>
          <div className="detail-item">
            <div className="label">Total Volume</div>
            <div className="value">${coin.total_volume.toLocaleString()}</div>
          </div>
          <div className="detail-item">
            <div className="label">24h High</div>
            <div className="value" style={{ color: "#4ade80" }}>${coin.high_24h.toLocaleString()}</div>
          </div>
          <div className="detail-item">
            <div className="label">24h Low</div>
            <div className="value" style={{ color: "#f87171" }}>${coin.low_24h.toLocaleString()}</div>
          </div>
          <div className="detail-item">
            <div className="label">Circulating Supply</div>
            <div className="value">{coin.circulating_supply.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinDetail;

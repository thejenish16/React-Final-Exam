import { useEffect, useState } from "react";
import SearchBar from "../components/searchbar";
import CoinCard from "../components/coincard";
import { useNavigate } from "react-router";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://corsproxy.io/?https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((r) => r.json())
      .then((data) => setCoins(data))
      .catch((err) => setError(err.message || "Failed to fetch"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="navbar">
        <h1>Crypto<span>Tracker</span></h1>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {loading && <div className="status">Loading coins...</div>}
      {error && <div className="status" style={{ color: "#f87171" }}>⚠ {error}</div>}

      {!loading && !error && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>24h %</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((coin) => (
                  <CoinCard key={coin.id} coin={coin} navigate={navigate} />
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.2)" }}>
                    No results for "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

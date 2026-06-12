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
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const response = await fetch(
        "https://corsproxy.io/?https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );

      // if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);/=

      const data = await response.json();
      setCoins(data);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="navbar">
        <h1>Crypto<span>Tracker</span></h1>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {loading && <div className="status">Loading coins...</div>}
      {error && <div className="status" style={{ color: "#ef4444" }}>⚠️ {error}</div>}

      {!loading && !error && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Image</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Current Price</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => (
                  <CoinCard key={coin.id} coin={coin} navigate={navigate} />
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No coins found for "{search}"
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

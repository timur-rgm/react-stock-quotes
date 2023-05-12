import { useEffect, useState } from "react";
import { getStockQuotes } from "../../api/getStockQuotes";
import { StocksType } from "../../types/stocks";
import styles from "./App.module.scss";

function App() {
  const [quotes, setQuotes] = useState<StocksType>();

  const getData = async () => {
    try {
      const { data } = await getStockQuotes();
      setQuotes(data);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(quotes);

  return (
    <main className={styles.root}>
      <h1 className={styles.title}>Акции авиакомпаний</h1>

      <table>
        <tr>
          <td>№</td>
          <td>Название</td>
          <td>Цена</td>
        </tr>
        {quotes?.slice(0, 10).map((item, i) => (
          <tr key={item.companyName}>
            <td>{i + 1}</td>
            <td>{item.companyName}</td>
            <td>{item.latestPrice ?? '-'}</td>
          </tr>
        ))}
      </table>
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";
import { getStockQuotes } from "../../api/getStockQuotes";
import { StocksType } from "../../types/stocks";
import styles from "./App.module.scss";

function App() {
  const [quotes, setQuotes] = useState<StocksType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    try {
      const { data } = await getStockQuotes();
      setQuotes(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(quotes);

  return (
    <main className={styles.root}>
      <div className={styles.wrap}>
        <table className={styles.table}>
          <caption className={styles.title}>Акции авиакомпаний</caption>
          <tr className={styles.header}>
            <th>№</th>
            <th>Название</th>
            <th>Цена</th>
          </tr>

          {isLoading && (
            <tr>
              <td className={styles.message} colSpan={3}>
                Загрузка...
              </td>
            </tr>
          )}

          {isError && (
            <tr>
              <td className={styles.message} colSpan={3}>
                Ошибка. Проверьте подключение к сети
              </td>
            </tr>
          )}

          {!!quotes &&
            quotes?.slice(0, 10).map((item, i) => (
              <tr key={item.companyName}>
                <td>{i + 1}</td>
                <td>{item.companyName}</td>
                <td>
                  {item.latestPrice ?? (
                    <span className={styles.empty}>Нет данных</span>
                  )}
                </td>
              </tr>
            ))}
        </table>
      </div>
    </main>
  );
}

export default App;

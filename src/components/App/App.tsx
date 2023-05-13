import { useEffect, useState } from "react";

import cn from "classnames";

import { getStockQuotes } from "../../api/getStockQuotes";
import { StocksType } from "../../types/stocks";
import styles from "./App.module.scss";
import arrowIcon from "../../assets/images/arrow-icon.svg";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quotes, setQuotes] = useState<StocksType>();
  const [displayedQuotes, setDisplayedQuotes] = useState({ from: 0, to: 10 });

  const handlePrevButtonClick = () => {
    if (displayedQuotes.from > 0) {
      setDisplayedQuotes((prev) => ({
        from: prev.from - 10,
        to: prev.to - 10,
      }));
    }
  };

  const handleNextButtonClick = () => {
    if (!!quotes && displayedQuotes.to < quotes.length) {
      setDisplayedQuotes((prev) => ({
        from: prev.from + 10,
        to: prev.to + 10,
      }));
    }
  };

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

  return (
    <main className={styles.root}>
      <div className={styles.wrap}>
        <table className={styles.table}>
          <caption className={styles.title}>Акции авиакомпаний</caption>
          <tbody>
            <tr className={styles.header}>
              <th>№</th>
              <th>Название</th>
              <th colSpan={2}>Цена</th>
            </tr>

            {isLoading && (
              <tr>
                <td className={styles.message} colSpan={4}>
                  Загрузка...
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td className={styles.message} colSpan={4}>
                  Ошибка. Проверьте подключение к сети
                </td>
              </tr>
            )}

            {!!quotes &&
              quotes.map(({ companyName, latestPrice, ytdChange }, i) => {
                if (i >= displayedQuotes.from && i < displayedQuotes.to) {
                  return (
                    <tr key={companyName + i}>
                      <td>{i + 1}</td>
                      <td>{companyName}</td>

                      {!!latestPrice ? (
                        <>
                          <td>${latestPrice}</td>
                          <td>
                            <span
                              className={cn(styles.change, {
                                [styles.inc]: ytdChange > 0,
                                [styles.dec]: ytdChange < 0,
                              })}
                            >
                              {ytdChange > 0 && "+"}
                              {ytdChange.toFixed(4)}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <span className={styles.empty}>Нет данных</span>
                          </td>
                          <td>
                            <span className={styles.empty}>Нет данных</span>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                }

                return null;
              })}
          </tbody>
        </table>

        <button
          className={cn(styles.button, styles.prev)}
          aria-label="Previous button"
          onClick={handlePrevButtonClick}
        >
          <img src={arrowIcon} alt="Previous arrow icon" />
        </button>
        <button
          className={cn(styles.button, styles.next)}
          aria-label="Next button"
          onClick={handleNextButtonClick}
        >
          <img src={arrowIcon} alt="Next arrow icon" />
        </button>
      </div>
    </main>
  );
}

export default App;

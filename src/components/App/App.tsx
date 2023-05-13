import { useEffect, useState } from "react";

import cn from "classnames";

import { useAppDispatch } from "../../store/store";
import { getQuotes } from "../../store/quotes/asynqActions";
import { useSelector } from "react-redux";
import { getItems, getLoadingStatus } from "../../store/quotes/selectors";
import styles from "./App.module.scss";
import arrowIcon from "../../assets/images/arrow-icon.svg";
import { LoadingStatuses } from "../../const";

function App() {
  const quotes = useSelector(getItems);
  const loadingStatus = useSelector(getLoadingStatus);
  const dispatch = useAppDispatch();

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
    dispatch(getQuotes());
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

            {loadingStatus === LoadingStatuses.Loading && (
              <tr>
                <td className={styles.message} colSpan={4}>
                  Загрузка...
                </td>
              </tr>
            )}

            {loadingStatus === LoadingStatuses.Error && (
              <tr>
                <td className={styles.message} colSpan={4}>
                  Ошибка. Проверьте подключение к сети
                </td>
              </tr>
            )}

            {loadingStatus === LoadingStatuses.Success &&
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
          aria-label="Previous button"
          className={cn(styles.button, styles.prev)}
          disabled={displayedQuotes.from === 0}
          onClick={handlePrevButtonClick}
        >
          <img src={arrowIcon} alt="Previous arrow icon" />
        </button>
        <button
          aria-label="Next button"
          className={cn(styles.button, styles.next)}
          disabled={displayedQuotes.to === quotes?.length}
          onClick={handleNextButtonClick}
        >
          <img src={arrowIcon} alt="Next arrow icon" />
        </button>
      </div>
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";

import cn from "classnames";

import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { getItems, getLoadingStatus } from "../../store/quotes/selectors";
import { fetchStocks } from "../../store/quotes/asynqActions";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { LoadingStatuses } from "../../const";

import styles from "./App.module.scss";


function App() {
  const [displayedStocks, setDisplayedStocks] = useState({ from: 0, to: 10 });

  const stocks = useSelector(getItems);
  const loadingStatus = useSelector(getLoadingStatus);

  const dispatch = useAppDispatch();

  const handlePrevButtonClick = () => {
    if (displayedStocks.from > 0) {
      setDisplayedStocks((prev) => ({
        from: prev.from - 10,
        to: prev.to - 10,
      }));
    }
  };

  const handleNextButtonClick = () => {
    if (!!stocks && displayedStocks.to < stocks.length) {
      setDisplayedStocks((prev) => ({
        from: prev.from + 10,
        to: prev.to + 10,
      }));
    }
  };

  const getData = async () => {
    dispatch(fetchStocks());
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
              stocks.map(({ companyName, latestPrice, ytdChange }, i) => {
                if (i >= displayedStocks.from && i < displayedStocks.to) {
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

        <ButtonIcon
          ariaLabel="Previous button"
          classes={{ button: cn(styles.button, styles.prev)}}
          icon="arrow-prev"
          isDisabled={displayedStocks.from === 0}
          onClick={handlePrevButtonClick}
        />

        <ButtonIcon
          ariaLabel="Next button"
          classes={{ button: cn(styles.button, styles.next)}}
          icon="arrow-next"
          isDisabled={displayedStocks.to === stocks?.length}
          onClick={handleNextButtonClick}
        />
      </div>
    </main>
  );
}

export default App;

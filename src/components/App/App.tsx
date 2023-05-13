import { useEffect, useState } from "react";

import cn from "classnames";

import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { getItems, getLoadingStatus } from "../../store/quotes/selectors";
import { fetchStocks } from "../../store/quotes/asynqActions";

import TableRow from "../TableRow/TableRow";
import TableContent from "../TableContent/TableContent";
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
            <TableRow
              classes={{ row: styles.header }}
              cellData={[
                { data: "№" },
                { data: "Название" },
                { data: "Цена", colSpan: 2 },
              ]}
              isHeader
            />

            {loadingStatus === LoadingStatuses.Loading && (
              <TableRow
                classes={{ cell: styles.message }}
                cellData={[{ data: "Загрузка...", colSpan: 4 }]}
              />
            )}

            {loadingStatus === LoadingStatuses.Error && (
              <TableRow
                classes={{ cell: styles.message }}
                cellData={[
                  { data: "Ошибка. Проверьте подключение к сети", colSpan: 4 },
                ]}
              />
            )}

            {loadingStatus === LoadingStatuses.Success && (
              <TableContent stocks={stocks} displayedStocks={displayedStocks} />
            )}
          </tbody>
        </table>

        <ButtonIcon
          ariaLabel="Previous button"
          classes={{ button: cn(styles.button, styles.prev) }}
          icon="arrow-prev"
          isDisabled={displayedStocks.from === 0}
          onClick={handlePrevButtonClick}
        />

        <ButtonIcon
          ariaLabel="Next button"
          classes={{ button: cn(styles.button, styles.next) }}
          icon="arrow-next"
          isDisabled={displayedStocks.to === stocks?.length}
          onClick={handleNextButtonClick}
        />
      </div>
    </main>
  );
}

export default App;

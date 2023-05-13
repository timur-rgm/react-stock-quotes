import cn from "classnames";
import { StockType } from "../../types/stocks";
import styles from "./TableContent.module.scss";

type ContentProps = {
  stocks: StockType[];
  displayedStocks: { from: number; to: number };
};

const TableContent = ({ stocks, displayedStocks }: ContentProps) => {
  return (
    <>
      {stocks.map(({ companyName, latestPrice, ytdChange }, i) => {
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
    </>
  );
};

export default TableContent;

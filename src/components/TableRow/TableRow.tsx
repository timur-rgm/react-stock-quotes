import cn from "classnames";
import styles from "./TableRow.module.scss";

type TableRowProps = {
  cellData: { data: string; colSpan?: number }[];
  classes?: {
    row?: string;
    cell?: string;
  };
  isHeader?: boolean;
};

const TableRow = ({ cellData, classes, isHeader = false }: TableRowProps) => {
  return (
    <tr className={cn(styles.row, classes?.row)}>
      {cellData.map(({ data, colSpan = 1 }) =>
        isHeader ? (
          <th className={cn(styles.cell, classes?.cell)} colSpan={colSpan}>
            {data}
          </th>
        ) : (
          <td className={cn(styles.cell, classes?.cell)} colSpan={colSpan}>
            {data}
          </td>
        )
      )}
    </tr>
  );
};

export default TableRow;

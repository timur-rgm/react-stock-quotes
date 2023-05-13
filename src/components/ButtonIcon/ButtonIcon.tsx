import cn from "classnames";
import styles from "./ButtonIcon.module.scss";

type ButtonIconProps = {
  ariaLabel: string;
  classes?: {
    button?: string;
    icon?: string;
  };
  isDisabled?: boolean;
  icon: string;
  onClick: () => void;
};

const ButtonIcon = ({
  ariaLabel,
  classes,
  icon,
  isDisabled = false,
  onClick,
}: ButtonIconProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(styles.button, classes?.button)}
      disabled={isDisabled}
      onClick={onClick}
    >
      <svg className={classes?.button}>
        <use xlinkHref={`/images/sprite.svg#${icon}`} />
      </svg>
    </button>
  );
};

export default ButtonIcon;

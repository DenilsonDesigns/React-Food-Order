import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnClassesOn, setBtnClassesOn] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((acc, el) => {
    return acc + el.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnClassesOn ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnClassesOn(true);

    const timer = setTimeout(() => {
      setBtnClassesOn(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../static/data";
import styles from "../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((x, i) => (
          <div className="flex" key={i}>
            <Link
              to={x.url}
              className={`${
                active === i + 1
                  ? "text-[#FFA500]"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              {x.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;

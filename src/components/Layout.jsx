import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <nav>
        <ul>
          {props.days.map((day, ind) => {
            let path = `/day-${day}`;
            return (
              <li className={props.done[ind] ? "done" : "not-done"} key={day}>
                <Link to={path}>{day}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;

import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Layout = (props) => {
  let days = Object.keys(props.puzzles);
  return (
    <>
      <nav>
        <ul>
          {days.map((day) => {
            let path = `/day-${day}`;
            return (
              <li
                className={props.puzzles[day] ? "done" : "not-done"}
                key={day}
              >
                <NavLink
                  to={path}
                  activeclassname="selected"
                >{`[${day}]`}</NavLink>
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

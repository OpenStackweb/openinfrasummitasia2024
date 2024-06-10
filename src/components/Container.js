import * as React from "react";

const Container = ({ className, children }) => (
  <div className={`${className ?? ""} container`}>
    {children}
  </div>
);

export default Container;
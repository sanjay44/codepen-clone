import React from "react";

const SplitView = (props) => {
  const { children, direction, style } = props;
  let count = React.Children.count(children);

  const total = 100;
  const each = 100 / count;

  const dir = direction === "VERTICAL" ? "column" : "row";
  const dimension = direction === "VERTICAL" ? "height" : "width";

  return (
    <div
      style={{
        [dimension]: `${total}%`,
        display: "flex",
        flexDirection: dir,
        ...style,
      }}
    >
      {React.Children.map(children, (child, index) => {
        console.log(child);
        return (
          <React.Fragment>
            {React.cloneElement(child, {
              ...child.props,
              style: { ...child.props.style, [dimension]: `${each}%` },
            })}
            {index !== count - 1 && <div style={{ [dimension]: "4px" }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SplitView;

/* eslint-disable react/prop-types */
export const Button1 = ({ className, name, dataAos, onClick }) => {
  return (
    <button
      onClick={onClick}
      data-aos={dataAos}
      className={`Button1 ss-button2 ${className}`}
    >
      {name}
    </button>
  );
};
export const Button2 = ({ className, name, dataAos, onClick }) => {
  return (
    <button
      onClick={onClick}
      data-aos={dataAos}
      className={`Button2 ${className}`}
    >
      {name}
    </button>
  );
};
export const Button5 = ({ className, name, dataAos, onClick }) => {
  return (
    <button
      onClick={onClick}
      data-aos={dataAos}
      className={`Button5 ${className}`}
    >
      {name}
    </button>
  );
};

export const ToggleButton = ({ className, dataAos, onClick }) => {
  return (
    <div
      data-aos={dataAos}
      onClick={onClick}
      className={`ToggleButton ${className}`}
    >
      <input type="checkbox" />
    </div>
  );
};

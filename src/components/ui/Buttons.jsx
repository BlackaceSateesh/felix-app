/* eslint-disable react/prop-types */
export const Button1 = ({ className, name, dataAos }) => {
  return <button data-aos={dataAos} className={`Button1 ss-button2 ${className}`}>{name}</button>;
};

export const numberWithCommas = (x: number) =>
  x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


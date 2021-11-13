const formatAddress = (address) => {
  if (!address) return null;
  return address?.slice(0, 10) + "...";
};

const formatBalance = (val) => parseFloat(val).toFixed(2);

export { formatAddress, formatBalance };

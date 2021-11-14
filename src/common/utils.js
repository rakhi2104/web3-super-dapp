const formatAddress = (address) => {
  if (!address) return null;
  return (
    address?.slice(0, 6) +
    "..." +
    address?.slice(address?.length - 4, address?.length)
  );
};

const formatBalance = (val) => parseFloat(val).toFixed(2);

export { formatAddress, formatBalance };

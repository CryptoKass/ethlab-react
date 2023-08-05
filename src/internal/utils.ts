export const shortAddress = (address?: string | null) => {
  if (address == null) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

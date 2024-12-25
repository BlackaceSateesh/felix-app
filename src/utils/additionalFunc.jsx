import axios from "axios";
export const maskMemberId = (memberId) => {
  if (!memberId || memberId.length <= 2) {
    return memberId;
  }

  const firstChar = memberId[0];
  const lastChar = memberId[memberId.length - 1];
  const maskedChars = "*".repeat(memberId.length - 2);

  return `${firstChar}${maskedChars}${lastChar}`;
};




export const convertUSDToBNB = async (usdAmount) => {
  try {
    // Fetch current BNB price in USD from CoinGecko
    // const response = await axios.get(
    //   "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
    // );
    
    const bnbPriceInUSD =  697.65;

    const bnbAmount = usdAmount / bnbPriceInUSD;

    return bnbAmount;
  } catch (error) {
    console.error("Error during conversion:", error);
  }
};


import { useSelector } from "react-redux";

export const roleEnum = {
  ADMIN: "Admin",
  USER: "User",
  PROMOTER: "Promoter",
}
export const FindAdmin = (role) => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  return userInfo?.role === role ? true : false;
};

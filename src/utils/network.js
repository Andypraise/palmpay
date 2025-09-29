export const detectNetwork = (phone) => {
  if (!phone) return "";
  const prefix = phone.slice(0, 4);
  if (/^(0803|0806|0703|0706|0813|0816|0810|0814|0903|0906)$/.test(prefix)) return "MTN";
  if (/^(0805|0807|0811|0815|0905|0915)$/.test(prefix)) return "GLO";
  if (/^(0802|0808|0708|0701|0812|0902|0907|0912)$/.test(prefix)) return "Airtel";
  if (/^(0809|0817|0818|0909|0908)$/.test(prefix)) return "9mobile";
  return "";
};

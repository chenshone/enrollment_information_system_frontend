export const setLocal = (key: string, value: any) => {
  if (typeof value == "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

export const getLocal = (key = "userToken") => {
  return localStorage.getItem(key);
};

export const clearLocal = (key = "userToken") => {
  return localStorage.removeItem(key);
};

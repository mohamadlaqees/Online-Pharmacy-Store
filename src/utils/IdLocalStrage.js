//will be triggered when a user add item or remove item from the cart

export const addIdLocal = (id) => {
  // if the array already exists then add the id
  const ids = localStorage.getItem("Ids");
  if (ids !== null) {
    let idsArray = JSON.parse(ids);
    idsArray.push(id);
    localStorage.setItem("Ids", JSON.stringify(idsArray));
  } else {
    // if not , create the array then add the id
    let idsArray = [];
    idsArray.push(id);
    localStorage.setItem("Ids", JSON.stringify(idsArray));
  }
};
export const removeIdLocal = (id) => {
  // if the array already exists then remove all occurrences of the id
  const ids = localStorage.getItem("Ids");
  if (ids !== null) {
    let idsArray = JSON.parse(ids);
    const updatedArray = idsArray.filter((item) => item !== parseInt(id));
    localStorage.setItem("Ids", JSON.stringify(updatedArray));
  }
};

export const idInLocal = (id) => {
  const ids = localStorage.getItem("Ids");
  if (ids === null) {
    return false;
  }
  let idsArray = JSON.parse(ids);
  if (idsArray.includes(parseInt(id))) {
    return true;
  }
  return false;

 
};

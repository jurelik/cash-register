function checkCashRegister(price, cash, cid) {
  // Variable declarations
  let denom = [
    { name: 'ONE HUNDRED', val: 100.00},
    { name: 'TWENTY', val: 20.00},
    { name: 'TEN', val: 10.00},
    { name: 'FIVE', val: 5.00},
    { name: 'ONE', val: 1.00},
    { name: 'QUARTER', val: 0.25},
    { name: 'DIME', val: 0.10},
    { name: 'NICKEL', val: 0.05},
    { name: 'PENNY', val: 0.01}
  ];
  let cashInRegister = {};
  let cashTotalAmount = 0;
  let returnAmount = Math.round((cash - price) * 100) / 100;
  let result = {status: "", change: []};
  
  // Make an object from cid array
  cid.forEach(element => {
    cashInRegister[element[0]] = element[1];
    cashTotalAmount += element[1];
  });

  // If the amount of money in register is smaller than the return amount, display INSUFFICIENT FUNDS
  if (returnAmount > cashTotalAmount) {
    result.status = "INSUFFICIENT_FUNDS";
    result.change = [];
  }

  // If the amount of money in register is equal to the return amount, display CLOSED;
  else if (returnAmount == cashTotalAmount){
    result.status = "CLOSED";
    result.change = cid;
  }

  // Else cycle throught the denom array and make a new array of returned money values
  else {
    denom.forEach(element => {
      let amount = 0;
      while (returnAmount >= element.val && cashInRegister[element.name] >= element.val) {
        returnAmount -= element.val;
        cashInRegister[element.name] -= element.val;
        amount += element.val;
        returnAmount = Math.round(returnAmount * 100) / 100;
      }
      if (amount > 0) {
        result.change.push([element.name, amount]);
      }
    });

    // If we returned everything display OPEN, else INSUFFICIENT FUNDS
    if (returnAmount === 0) {
      result.status = "OPEN";
    }
    else {
      result.status = "INSUFFICIENT_FUNDS";
      result.change = [];
    }
  }

  console.log(result);
  return result;
}
const copyAccountNumberToClipboard = (accountNumber) => {
  navigator.clipboard.writeText(accountNumber);
  alert("Account Number copied!")
}
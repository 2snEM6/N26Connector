/*
This is a simple script that connects your N26 account to a Google Sheets cell.
The list of available attributes to extract from your account are:
- "usableBalance": Gets the usable balance currently on your account as a decimal balance.

Developed by: Daniel Limia
Github: https://github.com/limiaspasdaniel
MIT license.
*/


/**
 * Gets the account object from the N26 API.
 * @param {string} token The OAUTH access token.
 * @return {object} The account object.
 * @customfunction
 * @private
 */
function _getAccount(token) {
  const bearer = "Bearer " + token;
  const options = { 
    "method"  : "GET",
    "headers": {
      "Origin": "https://my.number26.de",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36",
      "Referer": "https://my.number26.de/",
      "Authorization": bearer,
    }
  }
  const result = UrlFetchApp.fetch("https://api.tech26.de/api/accounts", options);
  return JSON.parse(result.getContentText());
}


/**
 * Extracts the selected attribute from the account object based on the attribute name.
 * @param {string} attribute The attribute that wants to be extracted from the account object. [usableBalance]
 * @return {object} The account information selected
 * @customfunction
 * @private
 */
function _getInfo(attribute, account) {
  switch(attribute) {
    case "usableBalance": {
      return account.usableBalance;
    }
    default:
      return undefined;
  }   
  // To complete with more attribtues.
}

/**
 * Obtains the access token necessary to the following api requests. If invalid email or password, returns undefined.
 * @param {string} email The email required for authentication.
 * @param {string} password The password required for authentication.
 * @return {string | undefined} The access token if found or undefined.
 * @customfunction
 * @private
 */
function _authenticate(email, password) {
  const options = {
    "method"  : "POST",
    "headers": {
      "Origin": "https://my.number26.de",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36",
      "Referer": "https://my.number26.de/",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic bXktdHJ1c3RlZC13ZHBDbGllbnQ6c2VjcmV0",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "payload": {
      "username": email,
      "password": password,
      "grant_type": "password"
    }
  };
  const result = UrlFetchApp.fetch("https://api.tech26.de/oauth/token", options);
  if (result.getResponseCode() == 200) {
    const response = JSON.parse(result.getContentText());
    return response.access_token;
  }
  return undefined;
}

/* MAIN FUNCTION BELOW */

/**
 * Gets account information from your N26 bank account.
 * @param {string} email Your email.
 * @param {string} password Your password.
 * @param {string} attribute The attribute you want to extract from your account information. [usableBalance]
 * @param {strina} refreshCell Reference a cell and change its value to refresh this function
 * @return {object} The account information selected
 * @customfunction
 */
function N26(attribute, email, password, value, refreshCell) {
  attribute = attribute || "usableBalance";
  const accessToken = _authenticate(email, password);
  if (!accessToken) {
    Logger.log("Error while authenticating");
    return;
  };
  return _getInfo(attribute, _getAccount(accessToken));
}

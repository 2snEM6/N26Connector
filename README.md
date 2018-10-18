# N26Connector
A simple script to connect your N26 bank account to a Google Sheets cell.

(I was tired of inputting my current balance manually into my Google Sheet's sheet, so why not)


## Usage
Type in `N26("usableBalance",  "your email",  "your password",  cellReference)` into a Google Sheets cell.

The method has 4 arguments:

 1. Makes reference to the specific information you want to extact from your account. Currently only the usable balance can be fetched (`usableBalance`). Extended account information will come in the future.
2. Your email.
3. Your password.
4. Cell reference: reference a cell and modify the content of it to refresh the function and fetch new data.

**IMPORTANT NOTE**: Your email and password are not stored anywhere. Feel free to double check this in the code.
**DISCLAIMER**: I am not responsible of any bad use of this script. 

For any further questions please contact me @ limiaspasdaniel@gmail.com

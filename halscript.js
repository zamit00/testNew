// halscript.js

function calculateWithdrawalAmount() {
    // קריאה לערכים מהקלט של המשתמש
    const yitratHalvaa = parseFloat(document.getElementById("loanAmount").value.replace(/[^0-9.]/g, ""));
    const yitratLoNazil = parseFloat(document.getElementById("illiquidBalance").value.replace(/[^0-9.]/g, ""));
    const yitraNazilLOMenayot = parseFloat(document.getElementById("liquidBalanceNonStock").value.replace(/[^0-9.]/g, ""));
    const yitraNazilMenayot = parseFloat(document.getElementById("liquidBalanceStock").value.replace(/[^0-9.]/g, ""));
    const requestedAmount = parseFloat(document.getElementById("requiredWithdrawalAmount").value.replace(/[^0-9.]/g, "")); // סכום נדרש למשיכה

    // חישוב maxLeHalvaa
    const maxLeHalvaa = (yitratLoNazil * 0.30) + (yitraNazilMenayot * 0.60) + (yitraNazilLOMenayot * 0.75);

    // חישוב sumHalvaotLoNazil
    const sumHalvaotLoNazil = yitratLoNazil * 0.30;

    // חישוב yitraHalvaaNazilLOMenayot
    const yitraHalvaaNazilLOMenayot = yitraNazilLOMenayot * 0.75;

    // חישוב yitraLeMeshichaMax (המקסימום למשיכה מתוך החישובים הקודמים)
    const yitraLeMeshichaMax = sumHalvaotLoNazil - yitratHalvaa+yitraNazilLOMenayot+yitraNazilMenayot;
   
    // הצגת סכום מקסימום לתשלום
    document.getElementById("maxPaymentAmountResult").textContent = Math.max(yitraLeMeshichaMax,0).toLocaleString("he-IL");
    if(Number(yitraLeMeshichaMax)<=0){return;}
    let amountForWithdrawalNoLoanRepayment = 0; // ערך ברירת מחדל

    // תנאים לחישוב amountForWithdrawalNoLoanRepayment
    if (maxLeHalvaa < yitratHalvaa) {
        amountForWithdrawalNoLoanRepayment = 0;
    } else if (sumHalvaotLoNazil > yitratHalvaa) {
        amountForWithdrawalNoLoanRepayment = yitraLeMeshichaMax;
    } else if (yitraHalvaaNazilLOMenayot >= (yitratHalvaa - sumHalvaotLoNazil)) {
        amountForWithdrawalNoLoanRepayment = yitraNazilLOMenayot - (yitratHalvaa - sumHalvaotLoNazil) / 0.75 + yitraNazilMenayot;
    } else if (yitraHalvaaNazilLOMenayot < (yitratHalvaa - sumHalvaotLoNazil)) {
        amountForWithdrawalNoLoanRepayment = yitraNazilMenayot - (yitratHalvaa - sumHalvaotLoNazil - yitraHalvaaNazilLOMenayot) / 0.60;
    }

    // הצגת סכום למשיכה ללא פרעון הלוואות
    document.getElementById("withdrawalAmountResult").textContent = amountForWithdrawalNoLoanRepayment.toLocaleString("he-IL");
    document.getElementById("withdrawalneto").textContent = Math.max(Math.min(requestedAmount, yitraLeMeshichaMax),0).toLocaleString("he-IL");



var schomLeMeshihaBafoal;
var schomLePeron;
var nimshachLoMenayati;
var nimshachMenayati;
var schomlemeshich;

if (requestedAmount < amountForWithdrawalNoLoanRepayment) {
    schomLeMeshihaBafoal = requestedAmount;
    schomLePeron = 0;

    if (yitraNazilLOMenayot > schomLeMeshihaBafoal) {
        nimshachLoMenayati = schomLeMeshihaBafoal;
        nimshachMenayati = 0;
    } else {
        nimshachLoMenayati = yitraNazilLOMenayot;
        nimshachMenayati = schomLeMeshihaBafoal - nimshachLoMenayati;
    }

} else if (requestedAmount > yitraLeMeshichaMax) {
    schomLeMeshihaBafoal = yitraNazilLOMenayot + yitraNazilMenayot;
    schomLePeron = yitratHalvaa - sumHalvaotLoNazil;

    nimshachLoMenayati = yitraNazilLOMenayot;
    nimshachMenayati = yitraNazilMenayot;

} else {
    if (yitratHalvaa > maxLeHalvaa) {
        if ((yitraNazilMenayot - (yitratHalvaa - maxLeHalvaa) / (1 - 0.6)) * (1 - 0.6) >= requestedAmount) {
            nimshachMenayati = yitratHalvaa - maxLeHalvaa + (requestedAmount) / (1 - 0.6);
            nimshachLoMenayati = 0;
            schomLePeron = (requestedAmount + yitratHalvaa - maxLeHalvaa) / (1 - 0.6) * 0.6;
        } else if (yitraNazilMenayot * (1 - 0.6) > yitratHalvaa - maxLeHalvaa) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = (requestedAmount - (yitraNazilMenayot - (yitratHalvaa - maxLeHalvaa) / (1 - 0.6)) * (1 - 0.6)) / (1 - 0.75);
            schomLePeron = nimshachMenayati + nimshachLoMenayati - requestedAmount;
        } else if (yitraNazilMenayot * (1 - 0.6) < yitratHalvaa - maxLeHalvaa) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = (requestedAmount + (yitratHalvaa - maxLeHalvaa) - yitraNazilMenayot * (1 - 0.6)) / (1 - 0.75);
            schomLePeron = yitraNazilMenayot * 0.6 + (requestedAmount + (yitratHalvaa - maxLeHalvaa) - yitraNazilMenayot * (1 - 0.6)) / (1 - 0.75) * 0.75;
        }
    } else if (yitratHalvaa <= maxLeHalvaa && amountForWithdrawalNoLoanRepayment == 0) {
        if (yitraNazilMenayot * (1 - 0.6) >= requestedAmount) {
            nimshachMenayati = requestedAmount / (1 - 0.6);
            nimshachLoMenayati = 0;
            schomLePeron = requestedAmount / (1 - 0.6) * 0.6;
        } else if (yitraNazilMenayot * (1 - 0.6) < requestedAmount) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = (requestedAmount - yitraNazilMenayot * (1 - 0.6)) / (1 - 0.75);
            schomLePeron = yitraNazilMenayot * 0.6 + (requestedAmount - yitraNazilMenayot * (1 - 0.6)) / (1 - 0.75) * 0.75;
        }
    } else if (yitratHalvaa <= maxLeHalvaa && amountForWithdrawalNoLoanRepayment > 0) {
        if (yitraNazilMenayot < amountForWithdrawalNoLoanRepayment) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = amountForWithdrawalNoLoanRepayment - yitraNazilMenayot + (requestedAmount - amountForWithdrawalNoLoanRepayment) / (1 - 0.75);
            schomLePeron = (requestedAmount - amountForWithdrawalNoLoanRepayment) / (1 - 0.75) * 0.75;
        } else if ((yitraNazilMenayot - amountForWithdrawalNoLoanRepayment) * (1 - 0.6) + amountForWithdrawalNoLoanRepayment >= requestedAmount) {
            nimshachLoMenayati = 0;
            nimshachMenayati = amountForWithdrawalNoLoanRepayment + (requestedAmount - amountForWithdrawalNoLoanRepayment) / (1 - 0.6);
            schomLePeron = (requestedAmount - amountForWithdrawalNoLoanRepayment) / (1 - 0.6) * 0.6;
        } else if ((yitraNazilMenayot - amountForWithdrawalNoLoanRepayment) * (1 - 0.6) + amountForWithdrawalNoLoanRepayment < requestedAmount) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = (requestedAmount - amountForWithdrawalNoLoanRepayment - (yitraNazilMenayot - amountForWithdrawalNoLoanRepayment) * (1 - 0.6)) / (1 - 0.75);
            schomLePeron = (yitraNazilMenayot - amountForWithdrawalNoLoanRepayment) * 0.6 + nimshachLoMenayati * 0.75;
        }
    }
}
schomlemeshich=nimshachMenayati+nimshachLoMenayati;
console.log(schomLeMeshihaBafoal+":"+nimshachMenayati+":"+nimshachLoMenayati+":"+schomLePeron);
document.getElementById("schomLeMeshihaBafoal").textContent = schomlemeshich;
document.getElementById("nimshachMenayati").textContent = nimshachMenayati;
document.getElementById("nimshachLoMenayati").textContent = nimshachLoMenayati;
document.getElementById("schomLePeron").textContent = schomLePeron;



}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loanForm");
    
    // הוספת מאזין לאירוע שליחת הטופס
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // מונע שליחה של הטופס (ללא חישוב)
        calculateWithdrawalAmount(); // חישוב סכום למשיכה ללא פרעון הלוואות
    });
});

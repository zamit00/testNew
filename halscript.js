// halscript.js
const shiurNazilM=0.60;
const shiurNazilLm=0.75;
const shiurLoNazil=0.30;
function calculateWithdrawalAmount() {
    // קריאה לערכים מהקלט של המשתמש
    const yitratHalvaa = parseFloat(document.getElementById("loanAmount").value.replace(/[^0-9.]/g, ""));
    const yitratLoNazil = parseFloat(document.getElementById("illiquidBalance").value.replace(/[^0-9.]/g, ""));
    const yitraNazilLOMenayot = parseFloat(document.getElementById("liquidBalanceNonStock").value.replace(/[^0-9.]/g, ""));
    const yitraNazilMenayot = parseFloat(document.getElementById("liquidBalanceStock").value.replace(/[^0-9.]/g, ""));
    const requestedAmount = parseFloat(document.getElementById("requiredWithdrawalAmount").value.replace(/[^0-9.]/g, "")); // סכום נדרש למשיכה

    // חישוב maxLeHalvaa
    const maxLeHalvaa = (yitratLoNazil * shiurLoNazil) + (yitraNazilMenayot * shiurNazilM) + (yitraNazilLOMenayot * shiurNazilLm);

    // חישוב sumHalvaotLoNazil
    const sumHalvaotLoNazil = yitratLoNazil * shiurLoNazil;

    // חישוב yitraHalvaaNazilLOMenayot
    const yitraHalvaaNazilLOMenayot = yitraNazilLOMenayot * shiurNazilLm;

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
        amountForWithdrawalNoLoanRepayment = yitraNazilLOMenayot - (yitratHalvaa - sumHalvaotLoNazil) / shiurNazilLm + yitraNazilMenayot;
    } else if (yitraHalvaaNazilLOMenayot < (yitratHalvaa - sumHalvaotLoNazil)) {
        amountForWithdrawalNoLoanRepayment = yitraNazilMenayot - (yitratHalvaa - sumHalvaotLoNazil - yitraHalvaaNazilLOMenayot) / shiurNazilM;
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
        if ((yitraNazilMenayot - (yitratHalvaa - maxLeHalvaa) / (1 - shiurNazilM)) * (1 - shiurNazilM) >= requestedAmount) {
            nimshachMenayati = yitratHalvaa - maxLeHalvaa + (requestedAmount) / (1 - shiurNazilM);
            nimshachLoMenayati = 0;
            schomLePeron = (requestedAmount + yitratHalvaa - maxLeHalvaa) / (1 - shiurNazilM) * shiurNazilM;
        } else if (yitraNazilMenayot * (1 - shiurNazilM) > yitratHalvaa - maxLeHalvaa) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = (requestedAmount - (yitraNazilMenayot - (yitratHalvaa - maxLeHalvaa) / (1 - shiurNazilM)) * (1 - shiurNazilM)) / (1 - shiurNazilLm);
            schomLePeron = nimshachMenayati + nimshachLoMenayati - requestedAmount;
        } else if (yitraNazilMenayot * (1 - shiurNazilM) < yitratHalvaa - maxLeHalvaa) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = (requestedAmount + (yitratHalvaa - maxLeHalvaa) - yitraNazilMenayot * (1 - shiurNazilM)) / (1 - shiurNazilLm);
            schomLePeron = yitraNazilMenayot * shiurNazilM + (requestedAmount + (yitratHalvaa - maxLeHalvaa) - yitraNazilMenayot * (1 - shiurNazilM)) / (1 - shiurNazilLm) * shiurNazilLm;
        }
    } else if (yitratHalvaa <= maxLeHalvaa && amountForWithdrawalNoLoanRepayment == 0) {
        if (yitraNazilMenayot * (1 - shiurNazilM) >= requestedAmount) {
            nimshachMenayati = requestedAmount / (1 - shiurNazilM);
            nimshachLoMenayati = 0;
            schomLePeron = requestedAmount / (1 - shiurNazilM) * shiurNazilM;
        } else if (yitraNazilMenayot * (1 - shiurNazilM) < requestedAmount) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = (requestedAmount - yitraNazilMenayot * (1 - shiurNazilM)) / (1 - shiurNazilLm);
            schomLePeron = yitraNazilMenayot * shiurNazilM + (requestedAmount - yitraNazilMenayot * (1 - shiurNazilM)) / (1 - shiurNazilLm) * shiurNazilLm;
        }
    } else if (yitratHalvaa <= maxLeHalvaa && amountForWithdrawalNoLoanRepayment > 0) {
        if (yitraNazilMenayot < amountForWithdrawalNoLoanRepayment) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = amountForWithdrawalNoLoanRepayment - yitraNazilMenayot + (requestedAmount - amountForWithdrawalNoLoanRepayment) / (1 - shiurNazilLm);
            schomLePeron = (requestedAmount - amountForWithdrawalNoLoanRepayment) / (1 - shiurNazilLm) * shiurNazilLm;
        } else if ((yitraNazilMenayot - amountForWithdrawalNoLoanRepayment) * (1 - shiurNazilM) + amountForWithdrawalNoLoanRepayment >= requestedAmount) {
            nimshachLoMenayati = 0;
            nimshachMenayati = amountForWithdrawalNoLoanRepayment + (requestedAmount - amountForWithdrawalNoLoanRepayment) / (1 - shiurNazilM);
            schomLePeron = (requestedAmount - amountForWithdrawalNoLoanRepayment) / (1 - shiurNazilM) * shiurNazilM;
        } else if ((yitraNazilMenayot - amountForWithdrawalNoLoanRepayment) * (1 - shiurNazilM) + amountForWithdrawalNoLoanRepayment < requestedAmount) {
            nimshachMenayati = yitraNazilMenayot;
            nimshachLoMenayati = (requestedAmount - amountForWithdrawalNoLoanRepayment - (yitraNazilMenayot - amountForWithdrawalNoLoanRepayment) * (1 - 0.6)) / (1 - shiurNazilLm);
            schomLePeron = (yitraNazilMenayot - amountForWithdrawalNoLoanRepayment) * shiurNazilM + nimshachLoMenayati * shiurNazilLm;
        }
    }
}
schomlemeshich=nimshachMenayati+nimshachLoMenayati;
console.log(schomLeMeshihaBafoal+":"+nimshachMenayati+":"+nimshachLoMenayati+":"+schomLePeron);
document.getElementById("schomLeMeshihaBafoal").textContent = schomlemeshich.toLocaleString("he-IL");
document.getElementById("nimshachMenayati").textContent = nimshachMenayati.toLocaleString("he-IL");
document.getElementById("nimshachLoMenayati").textContent = nimshachLoMenayati.toLocaleString("he-IL");
document.getElementById("schomLePeron").textContent = schomLePeron.toLocaleString("he-IL");
document.getElementById("tozaa").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loanForm");
    
    // הוספת מאזין לאירוע שליחת הטופס
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // מונע שליחה של הטופס (ללא חישוב)
        calculateWithdrawalAmount(); // חישוב סכום למשיכה ללא פרעון הלוואות
    });


    function change(){
     document.getElementById("maxPaymentAmountResult").textContent ="";
    document.getElementById("withdrawalAmountResult").textContent ="";
    document.getElementById("withdrawalneto").textContent = "";
    document.getElementById("schomLeMeshihaBafoal").textContent = "";
    document.getElementById("nimshachMenayati").textContent ="";
    document.getElementById("nimshachLoMenayati").textContent = "";
    document.getElementById("schomLePeron").textContent = "";
        
    }
    
});

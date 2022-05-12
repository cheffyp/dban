import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function() {
//    console.log("Finished Loading"); 
    const currentAmount = await dbank.checkBalance();
    const fixedAmount = currentAmount.toFixed(2);
    document.getElementById("value").innerText = fixedAmount;
});

document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();
    // console.log(event);

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length != 0){
        await dbank.topUp(inputAmount);
    } else if (document.getElementById("withdrawal-amount").value.length != 0) {
        await dbank.withdrawl(outputAmount);
    }

    const currentAmount = await dbank.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

    document.getElementById("input-amount").value = "";

    button.removeAttribute("disabled");
});
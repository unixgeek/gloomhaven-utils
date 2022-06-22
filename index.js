"use strict";

///////////////// Begin UI Functions
function setOptions(elementId, costs) {
    const selectElement = document.getElementById(elementId);

    let html = "";
    costs.forEach((element, index) => {
        html += `<option value="${index}">${element.option}</option>`;
    });
    selectElement.insertAdjacentHTML("afterbegin", html);

    selectElement.addEventListener("change", calculateCost);
}

document.querySelector(".tabs").addEventListener("click", event => {
    const clickedTab = event.target.closest("li");

    if (!clickedTab) {
        return;
    }

    // Make all tabs inactive.
    document.querySelectorAll("div.tabs > ul > li").forEach(element => {
        element.classList.remove("is-active");
    });
    // Hide all pages.
    document.querySelectorAll(".section").forEach(element => {
        element.classList.add("is-hidden");
    });

    // Set the clicked tab as active and unhide the associated page.
    clickedTab.classList.add("is-active");
    document.querySelector(`[data-page=${clickedTab.dataset.tab}]`).classList.remove("is-hidden");
});

document.getElementById("number-of-targets").addEventListener("change", calculateCost);

document.getElementById("hand-size").addEventListener("change", calculateRounds);
///////////////// End UI Functions

const cardLevelCosts = [
    {option: 1, cost: 0,},
    {option: 2, cost: 25},
    {option: 3, cost: 50},
    {option: 4, cost: 75},
    {option: 5, cost: 100},
    {option: 6, cost: 125},
    {option: 7, cost: 150},
    {option: 8, cost: 175},
    {option: 9, cost: 200},
];
setOptions("card-level", cardLevelCosts);

const enhancementCountCosts = [
    {option: 0, cost: 0,},
    {option: 1, cost: 75},
    {option: 2, cost: 150},
    {option: 3, cost: 225},
];
setOptions("current-enhancement-count", enhancementCountCosts);

const enhancementCosts = [
    {option: "Any Element", cost: 150},
    {option: "Attack +1", cost: 50},
    {option: "Attack +1 (Summons)", cost: 100},
    {option: "Attack Hex", cost: 200},
    {option: "Bless", cost: 50},
    {option: "Curse", cost: 75},
    {option: "Disarm", cost: 150},
    {option: "Heal +1", cost: 30},
    {option: "HP (Summons)", cost: 50},
    {option: "Immobilize", cost: 100},
    {option: "Jump", cost: 50},
    {option: "Move +1", cost: 30},
    {option: "Move +1 (Summons)", cost: 100},
    {option: "Muddle", cost: 50},
    {option: "Pierce +1", cost: 30},
    {option: "Poison", cost: 75},
    {option: "Pull +1", cost: 30},
    {option: "Push +1", cost: 30},
    {option: "Range +1", cost: 30},
    {option: "Range +1 (Summons)", cost: 50},
    {option: "Retaliate +1", cost: 100},
    {option: "Shield +1", cost: 100},
    {option: "Specific Element", cost: 100},
    {option: "Strengthen", cost: 50},
    {option: "Target +1", cost: 50},
    {option: "Wound", cost: 75},
];
setOptions("enhancement", enhancementCosts);

function calculateCost() {
    const cardLevelCost = cardLevelCosts[document.getElementById("card-level").value].cost;
    const enhancementCountCost = enhancementCountCosts[document.getElementById("current-enhancement-count").value].cost;
    const enhancement = enhancementCosts[document.getElementById("enhancement").value];
    const numberOfTargets = document.getElementById("number-of-targets").value;

    let enhancementCost = enhancement.cost;
    let targetCalculation = "";
    if (enhancement.option === "Attack Hex") {
        targetCalculation = `( ⌊${enhancementCost} ÷ ${numberOfTargets}⌋)`;
        enhancementCost = Math.floor(enhancementCost / numberOfTargets);
    } else if (numberOfTargets > 1) {
        targetCalculation = `(${enhancementCost} × 2)`;
        enhancementCost *= 2;
    }

    const totalCost = cardLevelCost + enhancementCountCost + enhancementCost;

    document.getElementById("table-level-cost").innerHTML = `${cardLevelCost}g`;
    document.getElementById("table-enhancement-count-cost").innerHTML = `${enhancementCountCost}g`;
    document.getElementById("table-base-enhancement-cost").innerHTML = `${enhancementCost}g ${targetCalculation}`;
    document.getElementById("table-total-cost").innerHTML = `${totalCost}g`;
}

function calculateRounds() {
    const handSize = document.getElementById("hand-size").value;

    const roundCountMin = Math.floor(Math.pow((handSize / 2), 2));
    const roundCountMax = roundCountMin + (handSize - 1);

    document.getElementById("rounds-result").innerHTML = `Assuming all short rests you have <strong>${roundCountMin}</strong> rounds. Assuming all long rests you have <strong>${roundCountMax}</strong> rounds.`;
}

// Initialize calculator and rounds.
calculateCost();
calculateRounds();

// Initialize costs table.
{
    const costTable = document.getElementById("cost-table");
    let html = "<tr><th>Enhancement</th><th>Cost</th></tr>";
    enhancementCosts.forEach(enhancement => {
        html += `<tr><th>${enhancement.option}</th><td>${enhancement.cost}g</td></tr>`;
    });
    costTable.insertAdjacentHTML("afterbegin", html);
}

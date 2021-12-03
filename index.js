function setOptions(elementId, costs) {
    const selectElement = document.getElementById(elementId);
    selectElement.innerHTML = "";
    costs.forEach((element, index) => {

        selectElement.innerHTML += "<option value='" + index + "'>" + element.option + "</option>";
    });
}

const currentEnhancementsCost = [
    {option: 0, cost: 0,},
    {option: 1, cost: 75},
    {option: 2, cost: 150},
    {option: 3, cost: 225},
];
setOptions("current-enhancement-count", currentEnhancementsCost);

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
    const enhancementCountCost = currentEnhancementsCost[document.getElementById("current-enhancement-count").value].cost;
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

    setHtml("table-level-cost", `${cardLevelCost}g`);
    setHtml("table-enhancement-count-cost", `${enhancementCountCost}g`);
    setHtml("table-base-enhancement-cost", `${enhancementCost}g ${targetCalculation}`);
    setHtml("table-total-cost", `${totalCost}g`);
}

function setHtml(id, html) {
    document.getElementById(id).innerHTML = html;
}

calculateCost();

// 100g (50g * 2) Use multiply and division symbol? what is the floor symbol?
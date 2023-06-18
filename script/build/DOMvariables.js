export function createDOMvariables() {
    const $addExpanseBtn = document.getElementById("add-expanse-btn");
    const $expansesArea = document.getElementById("expanses-area");
    //add expanse window inputs
    const $expanseNameInput = document.getElementById("expanse-name");
    const $expansePriceInput = document.getElementById("expanse-price");
    const $expanseCardInput = document.getElementById("expanse-card");
    const $newExpanseWindow = document.getElementById("new-expanse-window");
    const $addNewExpanseBtn = document.getElementById("add-new-expanse-btn");
    const $editExpanseBtn = document.getElementById("edit-expanse-btn");
    const $cardsDropdownBtn = document.getElementById("cards-dropdown");
    const $cardFilter = document.getElementById("cards-filter");
    const $cardsList = document.getElementById("cards-list");
    const $expensesTotal = document.getElementById("expenses-total");
    const $expensesSheetSelector = document.querySelectorAll(".select-expenses-sheet");
    const $expensesSheets = document.querySelector("#expenses-sheets");
    const $newExpanseSheetBtn = document.getElementById("new-expanse-sheet-btn");
    const $savNewExpensesSheetBtn = document.getElementById("save-new-expenses-sheet-btn");
    const $newExpensesSheetNameInput = document.getElementById("new-expenses-sheet-name-input");
    //    console.log($editExpanseBtn);
    return {
        $addExpanseBtn,
        $expansesArea,
        $expanseNameInput,
        $expansePriceInput,
        $expanseCardInput,
        $newExpanseWindow,
        $addNewExpanseBtn,
        $editExpanseBtn,
        $cardsDropdownBtn,
        $cardsList,
        $cardFilter,
        $expensesTotal,
        $expensesSheetSelector,
        $expensesSheets,
        $newExpanseSheetBtn,
        $savNewExpensesSheetBtn,
        $newExpensesSheetNameInput,
    };
}

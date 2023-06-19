const $addExpanseBtn = document.getElementById(
   "add-expanse-btn"
) as HTMLElement;
const $expansesArea = document.getElementById("expanses-area");

//add expanse window inputs
const $expanseNameInput = document.getElementById(
   "expanse-name"
) as HTMLInputElement;
const $expansePriceInput = document.getElementById(
   "expanse-price"
) as HTMLInputElement;

const $renameSheetInput = document.getElementById(
   "rename-sheet-input"
) as HTMLInputElement;

const $expanseCardInput = document.getElementById(
   "expanse-card"
) as HTMLInputElement;
const $newExpanseWindow = document.getElementById(
   "new-expanse-window"
) as HTMLElement;
const $addNewExpanseBtn = document.getElementById(
   "add-new-expanse-btn"
) as HTMLElement;
const $editExpanseBtn = document.getElementById(
   "edit-expanse-btn"
) as HTMLElement;

const $cardsDropdownBtn = document.getElementById(
   "cards-dropdown"
) as HTMLElement;

const $currentSheetNewExpense = document.getElementById(
   "current-sheet-new-expense"
) as HTMLElement;

const $transferMultipleExpanseBtn = document.getElementById(
   "transfer-multiple-expanse-btn"
) as HTMLElement;

const $currentSheetTableFooter = document.getElementById(
   "current-sheet-table-footer"
) as HTMLElement;

const $deleteMultipleExpenseBtn = document.getElementById(
   "delete-multiple-expense-btn"
) as HTMLElement;

const $renameExpensesSheetBtn = document.getElementById(
   "rename-expense-sheet-btn"
) as HTMLElement;

const $cardFilter = document.getElementById("cards-filter") as HTMLElement;

const $cardsList = document.getElementById("cards-list") as HTMLElement;
const $expensesTotal = document.getElementById("expenses-total") as HTMLElement;

const $expensesSheetSelector = document.querySelectorAll<HTMLSelectElement>(
   ".select-expenses-sheet"
);

const $expensesSheets = document.querySelector(
   "#expenses-sheets"
) as HTMLSelectElement;

const $newExpanseSheetBtn = document.getElementById(
   "new-expanse-sheet-btn"
) as HTMLElement;

const $savNewExpensesSheetBtn = document.getElementById(
   "save-new-expenses-sheet-btn"
) as HTMLElement;

const $renameExpanseSheetIcon = document.getElementById(
   "rename-expanse-sheet-icon"
) as HTMLElement;
const $deleteExpanseSheetIcon = document.getElementById(
   "delete-expanse-sheet-icon"
) as HTMLElement;

const $newExpensesSheetNameInput = document.getElementById(
   "new-expenses-sheet-name-input"
) as HTMLInputElement;

const $editMultipleDropdown = document.getElementById(
   "edit-multiple-dropdown"
) as HTMLInputElement;

//    console.log($editExpanseBtn);

export {
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
   $transferMultipleExpanseBtn,
   $deleteMultipleExpenseBtn,
   $editMultipleDropdown,
   $currentSheetTableFooter,
   $renameSheetInput,
   $renameExpensesSheetBtn,
   $renameExpanseSheetIcon,
   $deleteExpanseSheetIcon,
   $currentSheetNewExpense,
};

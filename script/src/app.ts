import { Expanse } from "./interfaces/expanse.interface";

import { ExpensesSheet } from "./interfaces/expenses-sheets.interface";

import {
   save,
   addExpense,
   getExpanses,
   removeExpense,
   getExpenseById,
   cardsList,
   addExpensesSheet,
   expensesSheets,
   removeExpensesSheet,
   checkMultiple,
   expensesChecked,
   editMultiple,
   getSheetById,
} from "./data.js";

//    DOM elements
import {
   $expansesArea,
   $expanseNameInput,
   $expansePriceInput,
   $expanseCardInput,
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
} from "./DOMvariables.js";

let $selectorDeleteSheet = $expensesSheetSelector[0];
let $selectorTransferToSheet = $expensesSheetSelector[1];
let $selectorRenameSheet = $expensesSheetSelector[2];

// new expenses-sheet from new expense window
window.addEventListener("change", (e) => {
   let selectElement = e.target as HTMLSelectElement;
   if (selectElement.matches(".select-expenses-sheet")) {
      if (isNaN(Number(selectElement.value))) {
         $newExpanseSheetBtn.click();
      }
   }
});

//cards dropdown listener
$cardsDropdownBtn.addEventListener("click", () => {
   let cardsListNums = cardsList();
   $cardsList.innerHTML = renderCardsList(cardsListNums);
   window.addEventListener("click", (e) => {
      const cardNum = e.target as HTMLElement;
      if (cardNum.matches(".cards-dropdown")) {
         $expanseCardInput.value = cardNum.innerHTML;
      }
   });
});

// handle new expanse btn
$addNewExpanseBtn.addEventListener("click", () => {
   let expensesSheet = $expensesSheets.value;
   let title = $expanseNameInput.value;
   let price = $expansePriceInput.value;
   let card = $expanseCardInput.value;

   addExpense(Number(expensesSheet), title, Number(price), card);

   $expanseNameInput.value = "";
   $expansePriceInput.value = "";
   $expanseCardInput.value = "";
   renderFilteredList(Number(expensesSheet));
});

//handle new expenses-sheet save btn
$savNewExpensesSheetBtn.addEventListener("click", () => {
   const sheetName = $newExpensesSheetNameInput.value;

   const newSheet = addExpensesSheet(sheetName);

   $expensesSheets.size = expensesSheets.length;

   $newExpensesSheetNameInput.value = "";

   renderSelectsElement(expensesSheets);
   $expensesSheets.value = String(newSheet.sheetId);
   renderFilteredList(newSheet.sheetId);
});

//handle remove sheet confirm btn
window.addEventListener("click", (e) => {
   const element = e.target as HTMLElement;
   if (element.closest("#delete-expanse-sheet-icon")) {
      $selectorDeleteSheet.value = $expensesSheets.value;
      return;
   }

   if (element.matches("#delete-expenses-sheet-btn")) {
      removeExpensesSheet(Number($selectorDeleteSheet.value));
      renderApp(getExpanses());
   }
});

//rename sheet SAVE btn

$selectorRenameSheet.addEventListener("change", () => {
   const selectedSheet = getSheetById($selectorRenameSheet.value);
   changeArealabelAndPlaceholder(selectedSheet.sheetName);
});

window.addEventListener("click", (e) => {
   const target = e.target as HTMLButtonElement;
   if (target.title === "Rename") {
      const selectedSheet = getSheetById($selectorRenameSheet.value);
      changeArealabelAndPlaceholder(selectedSheet.sheetName);
   }
   if (target === $renameExpensesSheetBtn) {
      const selectedSheet = getSheetById($selectorRenameSheet.value);
      selectedSheet.sheetName = $renameSheetInput.value;
   }
});

function changeArealabelAndPlaceholder(value: string) {
   $renameSheetInput.ariaLabel = value;
   $renameSheetInput.placeholder = value;
}

// render all selects
function renderSelectsElement(list: ExpensesSheet[]) {
   $selectorTransferToSheet.innerHTML = renderExpensesSheetsDropdown(list);
   if (expensesSheets.length > 1) {
      $selectorDeleteSheet.innerHTML = renderExpensesSheetsDropdown(
         list,
         false,
         true
      );
      $selectorRenameSheet.innerHTML = renderExpensesSheetsDropdown(
         list,
         false,
         true
      );
   }

   $expensesSheets.innerHTML = renderSheetsOptions(list);
}

//handles edit btn
window.addEventListener("click", (e) => {
   let event = e.target as HTMLElement;
   if (event.matches(".edit-expense")) {
      let id = Number(
         event.closest<HTMLElement>(".expense-row").dataset.expenseId
      );
      renderEditExpense(id);
   }
});

//remove expense btn
window.addEventListener("click", (e) => {
   let event = e.target as HTMLElement;
   if (event.matches(".delete-expense")) {
      let id = Number(
         event.closest<HTMLElement>(".expense-row").dataset.expenseId
      );
      removeExpense(id);
      renderFilteredList(Number($expensesSheets.value));
   }
});

//cards filter
$cardFilter.addEventListener("click", () => {
   $cardFilter.nextElementSibling.innerHTML = renderCardsList(
      cardsList(),
      true
   );
   window.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(".card-filter")) {
         const card = target.innerHTML;
         const filteredByCardList = getExpanses().filter(
            (e) => e.cardNumber === card
         );
         renderApp(filteredByCardList);
         $cardFilter.innerHTML = String(card);
         return;
      }
      if (target.matches(".all-card-filter")) {
         renderApp(getExpanses());
         $cardFilter.innerHTML = "כל הכרטיסים";

         return;
      }
   });
});

// <options> of the sheets
function renderSheetsOptions(sheets: ExpensesSheet[]) {
   let html: string;
   for (let sheet of sheets) {
      const { sheetName, sheetId } = sheet;
      html += `
   <option value="${sheetId}">${sheetName} </option>
   `;
   }
   return html;
}

// options  + stuff
function renderExpensesSheetsDropdown(
   sheets: ExpensesSheet[],
   forNew?: boolean,
   forChange?: boolean
): string {
   let html = "";
   html += renderSheetsOptions(sheets);
   if (forNew) {
      html += `
   <option class="new-sheet-select btn btn-outline-info">
   רשימת הוצאות חדשה
   </option>
   `;
   }

   return html;
}

//render expenses table after option select
$expensesSheets.addEventListener("change", (e) => {
   let element = e.target as HTMLOptionElement;

   if (element.value === "1") {
      renderApp(getExpanses());
      return;
   }
   renderFilteredList(Number(element.value));
});

//check multiple expenses
window.addEventListener("change", (e) => {
   let checkbox = e.target as HTMLInputElement;
   if (checkbox.matches(".check-expense")) {
      const id = Number(checkbox.value);
      checkMultiple(id);

      checkIfAnyChecked();
   }
});

//transfer multiple expenses
$transferMultipleExpanseBtn.addEventListener("click", () => {
   const transferTo = Number($selectorTransferToSheet.value);
   editMultiple(expensesChecked, "transfer", transferTo);
   $editMultipleDropdown.ariaExpanded = "false";
   renderApp(getExpanses());
});

//delete multiple expenses
$deleteMultipleExpenseBtn.addEventListener("click", () => {
   if (confirm("למחוק את כל הפריטים המסומנים?")) {
      editMultiple(expensesChecked, "delete");
      checkIfAnyChecked();
      renderApp(getExpanses());
   }
   $editMultipleDropdown.nextElementSibling.classList.remove("show");
});

//toggle multiple checked options
function checkIfAnyChecked() {
   if (expensesChecked.length > 0) {
      $editMultipleDropdown.classList.remove("disabled");
      $editMultipleDropdown.classList.add("btn-outline-info");
   } else {
      $editMultipleDropdown.classList.add("disabled");
      $editMultipleDropdown.classList.remove("btn-outline-info");
   }
}

function renderCardsList(
   cards: (number | string)[],
   forFilter?: boolean
): string {
   let html = forFilter
      ? `
   <li>
   <a
   class="all-card-filter dropdown-item"
   href="#"
>

   כל הכרטיסים
   </a>
</li>`
      : "";

   for (let card of cards) {
      html += `
    <li> <a class="
    ${
       !forFilter ? "cards-dropdown" : "card-filter"
    } dropdown-item" href="#">${card}</a></li>
    `;
   }

   return html;
}

function renderEditExpense(id: number) {
   let { title, price, cardNumber }: Expanse = getExpenseById(id);
   $addNewExpanseBtn.classList.add("d-none");
   $editExpanseBtn.classList.remove("d-none");

   $expanseNameInput.value = `${title}`;
   $expansePriceInput.value = `${price}`;
   $expanseCardInput.value = `${cardNumber}`;

   $editExpanseBtn.addEventListener("click", () => {
      const expense = getExpenseById(id);
      expense.title = $expanseNameInput.value;
      expense.price = Number($expansePriceInput.value);
      expense.cardNumber = $expanseCardInput.value;

      save();

      $editExpanseBtn.classList.add("d-none");

      renderFilteredList(Number($expensesSheets.value));
   });
}

function formatDate(date: Date) {
   let day: string | number = date.getDate();
   let month: string | number = date.getMonth() + 1;
   let year: string | number = date.getFullYear().toString().substr(-2);

   if (day < 10) day = "0" + day;
   if (month < 10) month = "0" + month;

   return `${day}/${month}/${year}`;
}

function getCurrentSheetName(): string {
   const currentSheet = getSheetById($expensesSheets.value).sheetName;
   return currentSheet;
}

function renderExpanse({
   sheetId,
   title,
   price,
   cardNumber,
   id,
   createdAt,
}: Expanse) {
   let html = `

   <tr class="expense-row" data-expense-id="${id}">
   <td scope="row">
   <input class="check-expense form-check-input " type="checkbox"  value="${id}" aria-label="check-expense">
   </td>
   <td>${title}</td>
   <td>${price} ₪</td>
   <td class="text-center">${cardNumber}</td>
   <td class="text-center">${getSheetById(sheetId).sheetName}</td>
   <td class="text-center">${formatDate(createdAt)}</td>
   <td>
                                    <!-- Drop Down -->
                                    <div class="text-center" class="dropdown">
                                       <button
                                          class="btn btn-outline-info dropdown-toggle py-0"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                       ></button>
                                       <ul class="dropdown-menu">
                                          <li id="edit-expanse-btn">
                                             <a class="edit-expense dropdown-item" href="#"
                                                >ערוך</a
                                             >
                                          </li>
                                          <li>
                                             <a
                                                class="delete-expense dropdown-item text-danger"
                                                href="#"
                                                >מחק</a
                                             >
                                          </li>
                                       </ul>
                                    </div>
                                 </td>
</tr>
    `;
   return html;
}

function renderExpensesList(expensesList: Expanse[]) {
   let html = `
   `;

   for (let expense of expensesList) {
      html += renderExpanse(expense);
   }

   return html;
}

function calculateTotalExpenses(expensesList: Expanse[]) {
   let totalExpenses: number = 0;
   expensesList.forEach((expense) => (totalExpenses += expense.price));
   return totalExpenses + " ₪";
}

function toggleEditSheetBtns() {
   if (expensesSheets.length <= 1) {
      $renameExpanseSheetIcon.classList.remove("btn-outline-warning");
      $deleteExpanseSheetIcon.classList.remove("btn-outline-danger");

      $renameExpanseSheetIcon.classList.add(
         "disabled",
         "btn-outline-secondary"
      );
      $deleteExpanseSheetIcon.classList.add(
         "disabled",
         "btn-outline-secondary"
      );
   }
   if (expensesSheets.length === 2) {
      $renameExpanseSheetIcon.classList.add("btn-outline-warning");
      $deleteExpanseSheetIcon.classList.add("btn-outline-danger");
      $renameExpanseSheetIcon.classList.remove("disabled");
      $deleteExpanseSheetIcon.classList.remove("disabled");
   }
}

function renderFilteredList(sheetId: number) {
   let filteredList;
   if (sheetId === 1) {
      filteredList = getExpanses();
   } else {
      filteredList = getExpanses().filter((e) => e.sheetId === sheetId);
   }

   renderTableHtml(filteredList);
}

function renderTableHtml(listToRender: Expanse[]) {
   $expansesArea.innerHTML = renderExpensesList(listToRender);
   $expensesTotal.innerHTML = String(calculateTotalExpenses(listToRender));
   $currentSheetTableFooter.innerHTML = getCurrentSheetName();
   $currentSheetNewExpense.innerHTML = getCurrentSheetName();
}

function renderApp(listToRender: Expanse[], renderExpenseArea?: boolean) {
   toggleEditSheetBtns();
   $expensesSheets.size = expensesSheets.length;

   renderSelectsElement(expensesSheets);

   let selected = $expensesSheets.value; // default "כללי" selected
   selected ? selected : ($expensesSheets.value = "1");

   renderTableHtml(listToRender);
}

renderApp(getExpanses());

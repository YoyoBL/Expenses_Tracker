import { newExpenseData } from "./data.js";
import { Expanse } from "./interfaces/expanse.interface";

import { createDOMvariables } from "./DOMvariables.js";
import { ExpensesSheet } from "./interfaces/expenses-sheets.interface";

let {
   save,
   addExpense,
   getExpanses,
   removeExpense,
   getExpenseById,
   cardsList,
   addExpensesSheet,
   expensesSheets,
   removeExpensesSheet,
} = newExpenseData();

//    DOM elements
const {
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
} = createDOMvariables();

// console.log($expensesSheets);

//load new expanse window
$addExpanseBtn.addEventListener("click", () => {
   $expanseNameInput.value = "";
   $expansePriceInput.value = "";
   $expanseCardInput.value = "";
   $editExpanseBtn.classList.add("d-none");

   $newExpanseWindow.classList.toggle("d-none");
   $addNewExpanseBtn.classList.remove("d-none");

   let { expensesSheets } = newExpenseData();
});

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
   let expensesSheet = $expensesSheetSelector[1].value;
   let title = $expanseNameInput.value;
   let price = $expansePriceInput.value;
   let card = $expanseCardInput.value;

   addExpense(Number(expensesSheet), title, Number(price), card);

   $expanseNameInput.value = "";
   $expansePriceInput.value = "";
   $expanseCardInput.value = "";
   $newExpanseWindow.classList.add("d-none");
   renderApp(getExpanses());
});

//handle new expenses-sheet save btn
$savNewExpensesSheetBtn.addEventListener("click", () => {
   const sheetName = $newExpensesSheetNameInput.value;

   addExpensesSheet(sheetName);

   let { expensesSheets } = newExpenseData();

   $expensesSheets.size = expensesSheets.length;

   renderSelectsElement(expensesSheets);

   $newExpensesSheetNameInput.value = "";
});

//handle remove sheet confirm btn
window.addEventListener("click", (e) => {
   const element = e.target as HTMLElement;
   if (element.matches("#delete-expenses-sheet-btn")) {
      removeExpensesSheet(Number($expensesSheetSelector[0].value));
      const { getExpanses } = newExpenseData();
      renderApp(getExpanses());
   }
});

// render all selects
function renderSelectsElement(list: ExpensesSheet[]) {
   $expensesSheetSelector[1].innerHTML = renderExpensesSheetsDropdown(
      list,
      true
   );
   $expensesSheetSelector[0].innerHTML = renderExpensesSheetsDropdown(list);
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
      renderApp(getExpanses());
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
      sheetId === 1
         ? (html += `
      <option value="${sheetId}" selected>${sheetName}</option>
      `)
         : (html += `
      <option value="${sheetId}">${sheetName} </option>
      `);
   }
   return html;
}
// options  + stuff
function renderExpensesSheetsDropdown(
   sheets: ExpensesSheet[],
   forDelete?: boolean
): string {
   let html = "";
   html += renderSheetsOptions(sheets);
   if (forDelete) {
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
   renderExpensesArea(Number(element.value));
});

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
   let { sheetId, title, price, cardNumber }: Expanse = getExpenseById(id);
   $addNewExpanseBtn.classList.add("d-none");
   $newExpanseWindow.classList.remove("d-none");
   $editExpanseBtn.classList.remove("d-none");

   $expensesSheetSelector[1].value = `${sheetId}`;
   $expanseNameInput.value = `${title}`;
   $expansePriceInput.value = `${price}`;
   $expanseCardInput.value = `${cardNumber}`;

   $editExpanseBtn.addEventListener("click", () => {
      debugger;
      const expense = getExpenseById(id);
      expense.sheetId = Number($expensesSheetSelector[1].value);
      expense.title = $expanseNameInput.value;
      expense.price = Number($expansePriceInput.value);
      expense.cardNumber = $expanseCardInput.value;

      save();

      $newExpanseWindow.classList.add("d-none");
      $editExpanseBtn.classList.add("d-none");
      renderApp(getExpanses());
   });
}

function renderExpanse({ title, price, cardNumber, id }: Expanse) {
   let html = `

   <tr class="expense-row" data-expense-id="${id}">
   <th scope="row">
      <i class="bi bi-credit-card"></i>
   </th>
   <td>${title}</td>
   <td>${price}</td>
   <td class="text-center">${cardNumber}</td>
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
   let html = "";

   for (let expense of expensesList) {
      html += renderExpanse(expense);
   }

   return html;
}

function calculateTotalExpenses(expensesList: Expanse[]) {
   let totalExpenses: number = 0;
   expensesList.forEach((expense) => (totalExpenses += expense.price));
   return totalExpenses;
}
function renderExpensesArea(sheetId: number) {
   let filteredList = getExpanses().filter((e) => e.sheetId === sheetId);

   $expansesArea.innerHTML = renderExpensesList(filteredList);
}

function renderApp(listToRender: Expanse[]) {
   $expensesSheets.size = expensesSheets.length;

   renderSelectsElement(expensesSheets);

   $expansesArea.innerHTML = renderExpensesList(listToRender);
   $expensesTotal.innerHTML = String(calculateTotalExpenses(listToRender));
}

// window.addEventListener("click", (e) => console.log(e.target));
renderApp(getExpanses());

import { newExpenseData } from "./data.js";
import { Expanse } from "./interfaces/expanse.interface";

import { createDOMvariables } from "./DOMvariables.js";

let { addExpense, getExpanses, id, removeExpense, getExpenseById, cardsList } =
   newExpenseData();

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
} = createDOMvariables();

//load new expanse window
$addExpanseBtn.addEventListener("click", () => {
   $editExpanseBtn.classList.add("d-none");

   $newExpanseWindow.classList.toggle("d-none");
   $addNewExpanseBtn.classList.remove("d-none");
});

//cards dropdown listener
$cardsDropdownBtn.addEventListener("click", () => {
   let cardsListNums: number[] = cardsList();
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
   let title = $expanseNameInput.value;
   let price = $expansePriceInput.value;
   let card = $expanseCardInput.value;

   addExpense(title, Number(price), Number(card));

   $expanseNameInput.value = "";
   $expansePriceInput.value = "";
   $expanseCardInput.value = "";
   $newExpanseWindow.classList.toggle("d-none");
   console.log(getExpanses());
   renderExpensesList(getExpanses());
});

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

//remove btn
window.addEventListener("click", (e) => {
   let event = e.target as HTMLElement;
   if (event.matches(".delete-expense")) {
      let id = Number(
         event.closest<HTMLElement>(".expense-row").dataset.expenseId
      );
      removeExpense(id);
      renderExpensesList(getExpanses());
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
         const card = Number(target.innerHTML);
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

function renderCardsList(cards: number[], forFilter?: boolean): string {
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
   $newExpanseWindow.classList.toggle("d-none");
   $editExpanseBtn.classList.remove("d-none");

   $expanseNameInput.value = `${title}`;
   $expansePriceInput.value = `${price}`;
   $expanseCardInput.value = `${cardNumber}`;

   $editExpanseBtn.addEventListener("click", () => {
      let expense = getExpenseById(id);
      expense.title = $expanseNameInput.value;
      expense.price = Number($expansePriceInput.value);
      expense.cardNumber = Number($expanseCardInput.value);

      $newExpanseWindow.classList.toggle("d-none");
      $editExpanseBtn.classList.toggle("d-none");
      renderExpensesList(getExpanses());
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
                                          <li>
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

function renderApp(listToRender: Expanse[]) {
   $expansesArea.innerHTML = renderExpensesList(listToRender);
   $expensesTotal.innerHTML = String(calculateTotalExpenses(listToRender));
}

renderApp(getExpanses());

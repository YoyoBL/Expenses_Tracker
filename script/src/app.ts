import { newExpenseData } from "./data.js";
import { Expanse } from "./interfaces/expanse.interface";

let { addExpense, getExpanses, id, removeExpense, getExpenseById } =
   newExpenseData();

// DOM variables
function createDOMvariables() {
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

   return {
      $addExpanseBtn,
      $expansesArea,
      $expanseNameInput,
      $expansePriceInput,
      $expanseCardInput,
      $newExpanseWindow,
      $addNewExpanseBtn,
      $editExpanseBtn,
   };

   // console.log($expansesArea);
}
const {
   $addExpanseBtn,
   $expansesArea,
   $expanseNameInput,
   $expansePriceInput,
   $expanseCardInput,
   $newExpanseWindow,
   $addNewExpanseBtn,
   $editExpanseBtn,
} = createDOMvariables();

//load new expanse window
$addExpanseBtn.addEventListener("click", () => {
   $editExpanseBtn.classList.add("d-none");

   $newExpanseWindow.classList.toggle("d-none");
   $addNewExpanseBtn.classList.remove("d-none");
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
   let html = ` <table
   id="expanses-area"
   class="table table-striped צא-3"
>
   <thead>
      <tr>
         <th scope="col"></th>
         <th scope="col">שם הו"ק</th>
         <th scope="col">מחיר</th>
         <th class="text-center">כרטיס</th>
        <th></th>

      </tr>
   </thead>
   <tbody> `;

   for (let expense of expensesList) {
      html += renderExpanse(expense);
   }

   html += `
    </tbody>
    <tfoot class="table-info">
   <tr>
   <th scope="row">
      <i class="bi bi-credit-card"></i>
   </th>
   <td>סה"כ</td>
   <td>${calculateTotalExpenses(expensesList)}</td>
   <td class="text-center">כל הכרטיסים</td>
   <td></td>
</tr>

</tfoot>
</table>
    `;

   $expansesArea.innerHTML = html;
}

function calculateTotalExpenses(expensesList: Expanse[]) {
   let totalExpenses: number = 0;
   expensesList.forEach((expense) => (totalExpenses += expense.price));
   return totalExpenses;
}

renderExpensesList(getExpanses());

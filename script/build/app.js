import { newExpenseData } from "./data.js";
import { createDOMvariables } from "./DOMvariables.js";
let { addExpense, getExpanses, id, removeExpense, getExpenseById, cardsList } = newExpenseData();
//    DOM elements
const { $addExpanseBtn, $expansesArea, $expanseNameInput, $expansePriceInput, $expanseCardInput, $newExpanseWindow, $addNewExpanseBtn, $editExpanseBtn, $cardsDropdownBtn, $cardsList, $cardFilter, $expensesTotal, } = createDOMvariables();
//load new expanse window
$addExpanseBtn.addEventListener("click", () => {
    $expanseNameInput.value = "";
    $expansePriceInput.value = "";
    $expanseCardInput.value = "";
    $editExpanseBtn.classList.add("d-none");
    $newExpanseWindow.classList.toggle("d-none");
    $addNewExpanseBtn.classList.remove("d-none");
});
//cards dropdown listener
$cardsDropdownBtn.addEventListener("click", () => {
    let cardsListNums = cardsList();
    $cardsList.innerHTML = renderCardsList(cardsListNums);
    window.addEventListener("click", (e) => {
        const cardNum = e.target;
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
    addExpense(title, Number(price), card);
    $expanseNameInput.value = "";
    $expansePriceInput.value = "";
    $expanseCardInput.value = "";
    $newExpanseWindow.classList.add("d-none");
    renderApp(getExpanses());
});
//handles edit btn
window.addEventListener("click", (e) => {
    let event = e.target;
    if (event.matches(".edit-expense")) {
        let id = Number(event.closest(".expense-row").dataset.expenseId);
        renderEditExpense(id);
    }
});
//remove btn
window.addEventListener("click", (e) => {
    let event = e.target;
    if (event.matches(".delete-expense")) {
        let id = Number(event.closest(".expense-row").dataset.expenseId);
        removeExpense(id);
        renderApp(getExpanses());
    }
});
//cards filter
$cardFilter.addEventListener("click", () => {
    $cardFilter.nextElementSibling.innerHTML = renderCardsList(cardsList(), true);
    window.addEventListener("click", (e) => {
        const target = e.target;
        if (target.matches(".card-filter")) {
            const card = target.innerHTML;
            const filteredByCardList = getExpanses().filter((e) => e.cardNumber === card);
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
function renderCardsList(cards, forFilter) {
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
    ${!forFilter ? "cards-dropdown" : "card-filter"} dropdown-item" href="#">${card}</a></li>
    `;
    }
    return html;
}
function renderEditExpense(id) {
    let { title, price, cardNumber } = getExpenseById(id);
    $addNewExpanseBtn.classList.add("d-none");
    $newExpanseWindow.classList.remove("d-none");
    $editExpanseBtn.classList.remove("d-none");
    $expanseNameInput.value = `${title}`;
    $expansePriceInput.value = `${price}`;
    $expanseCardInput.value = `${cardNumber}`;
    $editExpanseBtn.addEventListener("click", () => {
        let expense = getExpenseById(id);
        expense.title = $expanseNameInput.value;
        expense.price = Number($expansePriceInput.value);
        expense.cardNumber = $expanseCardInput.value;
        $newExpanseWindow.classList.add("d-none");
        $editExpanseBtn.classList.add("d-none");
        renderApp(getExpanses());
    });
}
function renderExpanse({ title, price, cardNumber, id }) {
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
function renderExpensesList(expensesList) {
    let html = "";
    for (let expense of expensesList) {
        html += renderExpanse(expense);
    }
    return html;
}
function calculateTotalExpenses(expensesList) {
    let totalExpenses = 0;
    expensesList.forEach((expense) => (totalExpenses += expense.price));
    return totalExpenses;
}
function renderApp(listToRender) {
    $expansesArea.innerHTML = renderExpensesList(listToRender);
    $expensesTotal.innerHTML = String(calculateTotalExpenses(listToRender));
}
renderApp(getExpanses());

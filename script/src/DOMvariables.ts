export function createDOMvariables() {
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

   const $cardsDropdownBtn = document.getElementById(
      "cards-dropdown"
   ) as HTMLElement;

   const $cardFilter = document.getElementById("cards-filter") as HTMLElement;

   const $cardsList = document.getElementById("cards-list") as HTMLElement;
   const $expensesTotal = document.getElementById(
      "expenses-total"
   ) as HTMLElement;

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
   };
}

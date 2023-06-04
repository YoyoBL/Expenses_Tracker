import { Expanse } from "./interfaces/expanse.interface";

export function newExpenseData() {
   const counterLocalStorage = localStorage.getItem("id-counter");
   let id = counterLocalStorage
      ? JSON.parse(counterLocalStorage, (key, value) => {
           if (key === "createdAt") {
              return new Date(value);
           }
           return value;
        })
      : 1;

   let expansesList: Expanse[] = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [];

   console.log(expansesList);

   function getExpanses() {
      return expansesList;
   }

   function save() {
      localStorage.setItem("expenses", JSON.stringify(getExpanses()));
      localStorage.setItem("id-counter", String(id));
   }

   function getExpenseById(id: number): Expanse {
      // const index: number = getExpanses().findIndex((expanse) => {
      //    expanse.id === expanseId;
      // });
      // if (index === -1) {
      //    return null;
      // }

      // return index;

      const expense = expansesList.find((e) => e.id === id);
      return expense;
   }

   function addExpense(
      title: string,
      price: number,
      cardNumber: number
   ): Expanse {
      const newExpanse: Expanse = {
         id: id++,
         title,
         price,
         cardNumber,
         createdAt: new Date(),
      };

      expansesList = [...expansesList, newExpanse];

      save();
      return newExpanse;
   }

   function removeExpense(id: number) {
      let removed = getExpenseById(id);
      expansesList = expansesList.filter((expense) => expense.id !== id);
      return removed;
   }

   function cardsList(): number[] {
      const allCardsList: number[] = expansesList.map(
         (expense) => expense.cardNumber
      );
      let cardsList: number[] = [];
      for (let i = 0; i < allCardsList.length; i++) {
         if (cardsList.indexOf(allCardsList[i]) === -1) {
            cardsList.push(allCardsList[i]);
         }
      }

      return cardsList;
   }

   return {
      addExpense,
      getExpanses,
      removeExpense,
      getExpenseById,
      cardsList,
      id,
   };
}

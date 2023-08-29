export const currencyFormatter: Intl.NumberFormat = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
    minimumFractionDigits: 0,
  });
//   I've added the type annotation : Intl.NumberFormat to explicitly specify the type of the currencyFormatter variable.
// //   TypeScript will infer the type from the right-hand side of the assignment, 
// so you don't need to include the type parameters explicitly. However, if you want to be more specific,
//  you can leave the type parameters in place (Intl.NumberFormat<Locale, Options>), 
//  replacing Locale and Options with the actual types.  
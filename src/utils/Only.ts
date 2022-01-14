import Without from "./Without";

type Only<T extends {}, U> = Without<{
    [P in keyof T]: T[P] extends U ? T[P] : never;
}, never>;

export default Only;

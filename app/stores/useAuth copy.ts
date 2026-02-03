// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export type UserAuth = {
//   objectId: string;
//   name: string;
//   email: string;
//   userToken: string;
// };

// export type UserReg = {
//   name: string;
//   email: string;
//   password: string;
// };
// type Store = {
//   user: UserAuth | UserReg | null;
//   login: (payload: UserAuth) => void;
//   register: (payload: UserReg) => void;
//   logout: () => void;
// };

// export const useAuth = create<Store>()(
//   persist(
//     (set) => ({
//       user: null,
//       login: (payload) => set(() => ({ user: payload })),
//       register: (payload) => set(() => ({ user: payload })),
//       logout: () => set(() => ({ user: null })),
//     }),
//     { name: "blog-storage" }
//   )
// );

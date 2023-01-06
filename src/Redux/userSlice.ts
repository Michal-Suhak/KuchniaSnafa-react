import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OfferType } from "../types/OfferType";
import { UserType } from "../types/UserType";
import type { RootState } from "./store";

interface UserState {
  userData: UserType;
  offers: OfferType[];
}

const initialState: UserState = {
  userData: {
    email: "",
    password: "",
    city: "",
    street: "",
    houseNumber: 0,
    postCode: "",
  },
  offers: [],
};

export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<UserType>) => {
      state.userData = action.payload;
    },

    updateCart: (state, action: PayloadAction<OfferType>) => {
      state.offers = [...state.offers, action.payload];
    },
  },
});

export const { setLoggedUser, updateCart } = userSlice.actions;

export default userSlice.reducer;

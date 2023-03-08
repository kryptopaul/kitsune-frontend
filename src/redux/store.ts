import { configureStore } from "@reduxjs/toolkit";

enum ActionType {
  ADD_ORDER = "ADD_ORDER",
  EDIT_ORDER_AMOUNT = "EDIT_ORDER_AMOUNT",
  SET_TARGET_TOKEN = "SET_TARGET_TOKEN",
  DELETE_ORDER = "DELETE_ORDER",
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  SET_CUSTOM_RECIPIENT = "SET_CUSTOM_RECIPIENT",
  TOGGLE_CUSTOM_RECIPIENT = "TOGGLE_CUSTOM_RECIPIENT",
}

// Define the reducer
const initialState: AppState = {
  orders: [],
  openModal: false,
  targetToken: "ETH",
  customRecipient: "",
  isCustomRecipient: false,
};

function reducer(state: AppState = initialState, action: Action): AppState {
  switch (action.type) {
    case ActionType.ADD_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };
    case ActionType.EDIT_ORDER_AMOUNT:
      const { token, amount } = action.payload;
      const updatedOrders = state.orders.map((order) => {
        if (order.tokenFrom === token) {
          return { ...order, amount };
        }
        return order;
      });
      return { ...state, orders: updatedOrders };
    case ActionType.SET_TARGET_TOKEN:
      return { ...state, targetToken: action.payload };
    case ActionType.DELETE_ORDER:
      const { tokenFrom } = action.payload;
      const filteredOrders = state.orders.filter(
        (order) => order.tokenFrom !== tokenFrom
      );
      return { ...state, orders: filteredOrders };
    case ActionType.OPEN_MODAL:
      return { ...state, openModal: true };
    case ActionType.CLOSE_MODAL:
      return { ...state, openModal: false };
    case ActionType.SET_CUSTOM_RECIPIENT:
      return { ...state, customRecipient: action.payload };
    case ActionType.TOGGLE_CUSTOM_RECIPIENT:
      return { ...state, isCustomRecipient: action.payload };

    default:
      return state;
  }
}

// Create the store
const store = configureStore({
  reducer: reducer,
});

export default store;

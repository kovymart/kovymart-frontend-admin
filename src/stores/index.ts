import { combineReducers, compose } from "redux";
import storage from "redux-persist/lib/storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import categorySlice from "./category.slice";
import authSlice from "./auth.slice";
import productSlice from "./product.slice";
import supplierSlice from "./supplier.slice";
import orderSlice from "./order.slice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: [],
};

const rootReducer = combineReducers({
	category: categorySlice,
	product: productSlice,
	auth: authSlice,
	supplier: supplierSlice,
	order: orderSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
export type AppState = ReturnType<typeof rootReducer>;
const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});
const persistedStore = persistStore(store);
store.subscribe(() => { });
export { store, persistedStore };

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
import houseforrentSlice from "./houseforrent.slice";
import placeSlice from "./place.slice";
import locationSlice from "./location.slice";
const persistConfig = {
	key: "root",
	storage,
	whitelist: [],
};

const rootReducer = combineReducers({
	location: locationSlice,
	house: houseforrentSlice,
	place: placeSlice,
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
store.subscribe(() => {});
export { store, persistedStore };

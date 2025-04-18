import {configureStore} from "@reduxjs/toolkit"
import {filterReducer} from "../Features/filter/FilterSlice.jsx"

// centralized store
export const store = configureStore({
    reducer:filterReducer
});

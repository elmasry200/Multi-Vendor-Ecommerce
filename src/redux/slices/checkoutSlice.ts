
const { createSlice } = require('@reduxjs/toolkit');
import type { PayloadAction } from '@reduxjs/toolkit';
const initialState = {
    currentStep: 1,
    checkoutFormData: {} as Record<string, any>,
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {

        setCurrentStep: (state: typeof initialState, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
        updateCheckoutFormData: (state: typeof initialState, action: PayloadAction<Record<string, any>>) => {
            state.checkoutFormData = {
                ...state.checkoutFormData,
                ...action.payload
            };
        },
    },
});

export const {
    setCurrentStep,
    updateCheckoutFormData
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
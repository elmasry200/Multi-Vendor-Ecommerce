"use client";
import React from 'react'
import PersonalDetailsForm from './StepForms/PersonalDetailsForm';
import ShippingDetailsForm from './StepForms/ShippingDetailsForm';
import PaymentMethodForm from './StepForms/PaymentMethodForm';
import OrderSummaryForm from './StepForms/OrderSummaryForm';
import { useSelector } from 'react-redux';

export default function StepForm() {

    const currentStep = useSelector((store: any) => store.checkout.currentStep);
    
    function renderFormByStep(step: number) {
        switch (step) {
            case 1:
                return <PersonalDetailsForm />
            case 2:
                return <ShippingDetailsForm />
            case 3:
                return <PaymentMethodForm />
            case 4:
                return <OrderSummaryForm />
        }
    }
    return (
        <div>
         {renderFormByStep(currentStep)}
        </div>
    )
}

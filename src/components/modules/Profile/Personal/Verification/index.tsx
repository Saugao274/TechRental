'use client'
import VerifyCountry from '@/components/core/elements/Verification/VerifyCountry'
import VerifyDocument from '@/components/core/elements/Verification/VerifyDocument'
import VerifyInformation from '@/components/core/elements/Verification/VerifyInformation'
import React, { useEffect, useState } from 'react'
export interface StepProps {
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
}

const Verification = () => {
    const [step, setStep] = useState<number>(1)
    const [StepPage, setStepPage] = useState<React.JSX.Element>(
        <VerifyCountry step={step} setStep={setStep} />,
    )
    useEffect(() => {
        step === 1
            ? setStepPage(<VerifyCountry step={step} setStep={setStep} />)
            : step === 2
              ? setStepPage(<VerifyInformation step={step} setStep={setStep} />)
              : step === 3
                ? setStepPage(<VerifyDocument step={step} setStep={setStep} />)
                : setStepPage(<VerifyCountry step={step} setStep={setStep} />)
    }, [step])
    return StepPage
}

export default Verification

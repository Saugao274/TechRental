'use client'
import FontCCCD from '@/components/core/elements/Verification/Upload/FontCCCD'
import BackCCCD from '@/components/core/elements/Verification/Upload/BackCCCD'
import VerifyCountry from '@/components/core/elements/Verification/VerifyCountry'
import VerifyDocument from '@/components/core/elements/Verification/VerifyDocument'
import VerifyGuideline from '@/components/core/elements/Verification/VerifyGuideline'
import VerifyInformation from '@/components/core/elements/Verification/VerifyInformation'
import React, { useEffect, useState } from 'react'
import FontDriversLicense from '@/components/core/elements/Verification/Upload/FontDriversLicense'
import BackDriversLicense from '@/components/core/elements/Verification/Upload/BackDriversLicense'
import Passport from '@/components/core/elements/Verification/Upload/Passport'
export interface StepProps {
    step?: string
    setStep: React.Dispatch<React.SetStateAction<string>>
}

const Verification = () => {
    const [step, setStep] = useState<string>('country')
    const [StepPage, setStepPage] = useState<React.JSX.Element>(
        <VerifyCountry step={step} setStep={setStep} />,
    )
    useEffect(() => {
        step === 'country'
            ? setStepPage(<VerifyCountry step={step} setStep={setStep} />)
            : step === 'information'
              ? setStepPage(<VerifyInformation step={step} setStep={setStep} />)
              : step === 'document'
                ? setStepPage(<VerifyDocument step={step} setStep={setStep} />)
                : step === 'guide'
                  ? setStepPage(
                        <VerifyGuideline step={step} setStep={setStep} />,
                    )
                  : step === 'fontCCCD'
                    ? setStepPage(<FontCCCD step={step} setStep={setStep} />)
                    : step === 'backCCCD'
                      ? setStepPage(<BackCCCD step={step} setStep={setStep} />)
                      : step === 'fontLicense'
                        ? setStepPage(
                              <FontDriversLicense
                                  step={step}
                                  setStep={setStep}
                              />,
                          )
                        : step === 'backLicense'
                          ? setStepPage(
                                <BackDriversLicense
                                    step={step}
                                    setStep={setStep}
                                />,
                            )
                          : step === 'passport'
                            ? setStepPage(
                                  <Passport step={step} setStep={setStep} />,
                              )
                            : setStepPage(
                                  <VerifyCountry
                                      step={step}
                                      setStep={setStep}
                                  />,
                              )
    }, [step])
    return StepPage
}

export default Verification

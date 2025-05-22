'use client'
import React, { useEffect, useState } from 'react'
import FontCCCD from '@/components/core/elements/Verification/Upload/FontCCCD'
import BackCCCD from '@/components/core/elements/Verification/Upload/BackCCCD'
import VerifyCountry from '@/components/core/elements/Verification/VerifyCountry'
import VerifyDocument from '@/components/core/elements/Verification/VerifyDocument'
import VerifyGuideline from '@/components/core/elements/Verification/VerifyGuideline'
import VerifyInformation from '@/components/core/elements/Verification/VerifyInformation'
import FontDriversLicense from '@/components/core/elements/Verification/Upload/FontDriversLicense'
import BackDriversLicense from '@/components/core/elements/Verification/Upload/BackDriversLicense'
import Passport from '@/components/core/elements/Verification/Upload/Passport'
import FaicalAuthentication from '@/components/core/elements/Verification/Facial/FacialAuthentication1st'
import FacialAuthentication1st from '@/components/core/elements/Verification/Facial/FacialAuthentication1st'
import FacialAuthentication2nd from '@/components/core/elements/Verification/Facial/FacialAuthentication2nd'
import FacialAuthentication3rd from '@/components/core/elements/Verification/Facial/FacialAuthentication3rd'
import FacialAuthentication4th from '@/components/core/elements/Verification/Facial/FacialAuthentication4th'

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
        let component: React.JSX.Element

        switch (step) {
            case 'country':
                component = <VerifyCountry step={step} setStep={setStep} />
                break
            case 'information':
                component = <VerifyInformation step={step} setStep={setStep} />
                break
            case 'document':
                component = <VerifyDocument step={step} setStep={setStep} />
                break
            case 'guide':
                component = <VerifyGuideline step={step} setStep={setStep} />
                break
            case 'fontCCCD':
                component = <FontCCCD step={step} setStep={setStep} />
                break
            case 'backCCCD':
                component = <BackCCCD step={step} setStep={setStep} />
                break
            case 'fontLicense':
                component = <FontDriversLicense step={step} setStep={setStep} />
                break
            case 'backLicense':
                component = <BackDriversLicense step={step} setStep={setStep} />
                break
            case 'passport':
                component = <Passport step={step} setStep={setStep} />
                break
            case 'facialAuthentication1st':
                component = (
                    <FacialAuthentication1st step={step} setStep={setStep} />
                )
                break
            case 'facialAuthentication2nd':
                component = (
                    <FacialAuthentication2nd step={step} setStep={setStep} />
                )
                break
            case 'facialAuthentication3rd':
                component = (
                    <FacialAuthentication3rd step={step} setStep={setStep} />
                )
                break
            case 'facialAuthentication4nd':
                component = (
                    <FacialAuthentication4th step={step} setStep={setStep} />
                )
                break
            default:
                component = <VerifyCountry step={step} setStep={setStep} />
        }

        setStepPage(component)
    }, [step])

    return StepPage
}

export default Verification

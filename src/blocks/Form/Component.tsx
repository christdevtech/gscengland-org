'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { Upload, MapPin, Phone, Mail, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  hideLabels?: boolean
  form: FormType
  introContent?: SerializedEditorState
  bgColor?: string
  isContactPageForm: boolean
  contactInfo?: {
    address?: string
    phone?: string
    email?: string
  }
  anchor?: string
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    hideLabels,
    bgColor,
    isContactPageForm,
    contactInfo,
    anchor,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isSliderComplete, setIsSliderComplete] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasStartedDragging, setHasStartedDragging] = useState(false)
  const router = useRouter()

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setHasStartedDragging(true)
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const slider = document.querySelector('[data-slider]') as HTMLElement
      if (!slider) return

      const rect = slider.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

      setSliderPosition(percentage)
      setIsSliderComplete(percentage >= 95)
    },
    [isDragging],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add global mouse event listeners for better drag functionality
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setHasStartedDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const slider = e.currentTarget as HTMLElement
    const rect = slider.getBoundingClientRect()
    const touch = e.touches[0]
    if (!touch) return

    const x = touch.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setSliderPosition(percentage)
    setIsSliderComplete(percentage >= 95)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Reset slider if user hasn't completed the drag
  React.useEffect(() => {
    if (!isDragging && !isSliderComplete && hasStartedDragging) {
      const timer = setTimeout(() => {
        setSliderPosition(0)
        setHasStartedDragging(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isDragging, isSliderComplete, hasStartedDragging])

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      if (!isSliderComplete) {
        setError({
          message: 'Please complete the verification slider to submit the form.',
        })
        return
      }

      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, isSliderComplete],
  )

  return (
    <div id={anchor || undefined} className={cn(bgColor, 'w-full py-16')}>
      <div className={cn(isContactPageForm ? 'container' : 'container lg:max-w-5xl mx-auto')}>
        {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={cn(isContactPageForm ? 'lg:col-span-2' : 'lg:col-span-3')}>
            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <RichText data={confirmationMessage} />
              )}
              {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
              {error && (
                <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">{`${error.status || '500'}: ${error.message || ''}`}</div>
              )}
              {!hasSubmitted && (
                <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6 last:mb-0 grid grid-cols-12 gap-2 lg:gap-4">
                    {formFromProps &&
                      formFromProps.fields &&
                      formFromProps.fields?.map((field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> =
                          fields?.[field.blockType as keyof typeof fields]
                        if (Field) {
                          return (
                            <Field
                              form={formFromProps}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                              hideLabels={props.hideLabels}
                              key={index}
                              className="mb-6 last:mb-0"
                            />
                          )
                        }
                        return null
                      })}
                  </div>

                  {/* Bot Protection Slider */}
                  <div className="mb-6 p-4 bg-card border border-border rounded-lg">
                    <div className="mb-3">
                      <label className="text-sm font-medium text-foreground">
                        Are you a person? Slide to unlock submit button
                      </label>
                    </div>
                    <div
                      className="relative"
                      data-slider
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div className="w-full h-12 bg-muted rounded-lg relative overflow-hidden select-none">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-lg transition-all duration-200 ease-out"
                          style={{ width: `${sliderPosition}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-sm font-medium text-muted-foreground">
                            {isSliderComplete ? '✓ Verified' : 'Drag to verify →'}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ease-out cursor-grab ${isDragging ? 'cursor-grabbing scale-110' : ''}`}
                        style={{ left: `calc(${sliderPosition}% - 20px)` }}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                      >
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>

                  <Button
                    form={formID}
                    type="submit"
                    variant="default"
                    disabled={!isSliderComplete || isLoading}
                    className={cn(
                      'flex items-center justify-center gap-2 transition-all duration-300',
                      isSliderComplete
                        ? 'opacity-100 scale-100'
                        : 'opacity-50 scale-95 cursor-not-allowed',
                    )}
                  >
                    {submitButtonLabel} <Upload className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </FormProvider>
          </div>

          {/* Contact Information Section */}
          {isContactPageForm && contactInfo && (
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 h-fit">
                <h3 className="text-lg font-semibold text-foreground mb-6">Get in Touch</h3>

                <div className="space-y-6">
                  {contactInfo.address && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Address</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                          {contactInfo.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {contactInfo.phone && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Phone</h4>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contactInfo.email && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Email</h4>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    We are excited to hear from you! Call, email or visit us!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

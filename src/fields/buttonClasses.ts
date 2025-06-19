import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'

type buttonClassesType = (options?: {
  overrides?: Record<string, unknown>
  condition?: (_: any, siblingData: any) => boolean
}) => Field

export const buttonClasses: buttonClassesType = ({
  condition = () => true,
  overrides = {},
} = {}) => {
  const buttonResult: Field = {
    name: 'buttonClasses',
    type: 'select',
    label: 'Button Classes',
    admin: {
      condition,
    },
    options: [
      // Primary Brand Buttons
      {
        label: 'Primary Brand Blue',
        value:
          'px-6 py-3 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 transition-colors duration-200 font-medium',
      },
      {
        label: 'Primary Brand Blue (Rounded)',
        value:
          'px-6 py-3 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Primary Brand Blue (Pill)',
        value:
          'px-6 py-3 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 transition-colors duration-200 font-medium rounded-full',
      },

      // Secondary Brand Buttons
      {
        label: 'Secondary Brand Dark',
        value:
          'px-6 py-3 bg-brand-dark text-brand-dark-foreground hover:bg-brand-dark/90 transition-colors duration-200 font-medium',
      },
      {
        label: 'Secondary Brand Dark (Rounded)',
        value:
          'px-6 py-3 bg-brand-dark text-brand-dark-foreground hover:bg-brand-dark/90 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Secondary Brand Dark (Pill)',
        value:
          'px-6 py-3 bg-brand-dark text-brand-dark-foreground hover:bg-brand-dark/90 transition-colors duration-200 font-medium rounded-full',
      },

      // Outline Buttons
      {
        label: 'Outline Brand Blue',
        value:
          'px-6 py-3 border-2 border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue hover:text-brand-blue-foreground transition-colors duration-200 font-medium',
      },
      {
        label: 'Outline Brand Blue (Rounded)',
        value:
          'px-6 py-3 border-2 border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue hover:text-brand-blue-foreground transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Outline Brand Blue (Pill)',
        value:
          'px-6 py-3 border-2 border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue hover:text-brand-blue-foreground transition-colors duration-200 font-medium rounded-full',
      },

      {
        label: 'Outline Brand Dark',
        value:
          'px-6 py-3 border-2 border-brand-dark text-brand-dark bg-transparent hover:bg-brand-dark hover:text-brand-dark-foreground transition-colors duration-200 font-medium',
      },
      {
        label: 'Outline Brand Dark (Rounded)',
        value:
          'px-6 py-3 border-2 border-brand-dark text-brand-dark bg-transparent hover:bg-brand-dark hover:text-brand-dark-foreground transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Outline Brand Dark (Pill)',
        value:
          'px-6 py-3 border-2 border-brand-dark text-brand-dark bg-transparent hover:bg-brand-dark hover:text-brand-dark-foreground transition-colors duration-200 font-medium rounded-full',
      },

      // Ghost Buttons
      {
        label: 'Ghost Brand Blue',
        value:
          'px-6 py-3 text-brand-blue bg-transparent hover:bg-brand-blue/10 transition-colors duration-200 font-medium',
      },
      {
        label: 'Ghost Brand Blue (Rounded)',
        value:
          'px-6 py-3 text-brand-blue bg-transparent hover:bg-brand-blue/10 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Ghost Brand Blue (Pill)',
        value:
          'px-6 py-3 text-brand-blue bg-transparent hover:bg-brand-blue/10 transition-colors duration-200 font-medium rounded-full',
      },

      {
        label: 'Ghost Brand Dark',
        value:
          'px-6 py-3 text-brand-dark bg-transparent hover:bg-brand-dark/10 transition-colors duration-200 font-medium',
      },
      {
        label: 'Ghost Brand Dark (Rounded)',
        value:
          'px-6 py-3 text-brand-dark bg-transparent hover:bg-brand-dark/10 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Ghost Brand Dark (Pill)',
        value:
          'px-6 py-3 text-brand-dark bg-transparent hover:bg-brand-dark/10 transition-colors duration-200 font-medium rounded-full',
      },

      // System Color Buttons
      {
        label: 'Primary System',
        value:
          'px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium',
      },
      {
        label: 'Primary System (Rounded)',
        value:
          'px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Primary System (Pill)',
        value:
          'px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium rounded-full',
      },

      {
        label: 'Secondary System',
        value:
          'px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200 font-medium',
      },
      {
        label: 'Secondary System (Rounded)',
        value:
          'px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Secondary System (Pill)',
        value:
          'px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200 font-medium rounded-full',
      },

      // Destructive Buttons
      {
        label: 'Destructive',
        value:
          'px-6 py-3 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200 font-medium',
      },
      {
        label: 'Destructive (Rounded)',
        value:
          'px-6 py-3 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Destructive (Pill)',
        value:
          'px-6 py-3 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200 font-medium rounded-full',
      },

      {
        label: 'Destructive Outline',
        value:
          'px-6 py-3 border-2 border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200 font-medium',
      },
      {
        label: 'Destructive Outline (Rounded)',
        value:
          'px-6 py-3 border-2 border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Destructive Outline (Pill)',
        value:
          'px-6 py-3 border-2 border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200 font-medium rounded-full',
      },

      // Success Buttons
      {
        label: 'Success',
        value:
          'px-6 py-3 bg-success text-white hover:bg-success/90 transition-colors duration-200 font-medium',
      },
      {
        label: 'Success (Rounded)',
        value:
          'px-6 py-3 bg-success text-white hover:bg-success/90 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Success (Pill)',
        value:
          'px-6 py-3 bg-success text-white hover:bg-success/90 transition-colors duration-200 font-medium rounded-full',
      },

      // Warning Buttons
      {
        label: 'Warning',
        value:
          'px-6 py-3 bg-warning text-black hover:bg-warning/90 transition-colors duration-200 font-medium',
      },
      {
        label: 'Warning (Rounded)',
        value:
          'px-6 py-3 bg-warning text-black hover:bg-warning/90 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Warning (Pill)',
        value:
          'px-6 py-3 bg-warning text-black hover:bg-warning/90 transition-colors duration-200 font-medium rounded-full',
      },

      // Muted/Subtle Buttons
      {
        label: 'Muted',
        value:
          'px-6 py-3 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors duration-200 font-medium',
      },
      {
        label: 'Muted (Rounded)',
        value:
          'px-6 py-3 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors duration-200 font-medium rounded-xl',
      },
      {
        label: 'Muted (Pill)',
        value:
          'px-6 py-3 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors duration-200 font-medium rounded-full',
      },

      // Link Style Buttons
      {
        label: 'Link Brand Blue',
        value:
          'text-brand-blue hover:text-brand-blue/80 underline-offset-4 hover:underline transition-colors duration-200 font-medium',
      },
      {
        label: 'Link Primary',
        value:
          'text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors duration-200 font-medium',
      },

      // Gradient Buttons
      {
        label: 'Gradient Brand Blue',
        value:
          'px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-blue/80 text-brand-blue-foreground hover:from-brand-blue/90 hover:to-brand-blue/70 transition-all duration-200 font-medium',
      },
      {
        label: 'Gradient Brand Blue (Rounded)',
        value:
          'px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-blue/80 text-brand-blue-foreground hover:from-brand-blue/90 hover:to-brand-blue/70 transition-all duration-200 font-medium rounded-xl',
      },
      {
        label: 'Gradient Brand Blue (Pill)',
        value:
          'px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-blue/80 text-brand-blue-foreground hover:from-brand-blue/90 hover:to-brand-blue/70 transition-all duration-200 font-medium rounded-full',
      },

      {
        label: 'Gradient Brand Dark',
        value:
          'px-6 py-3 bg-gradient-to-r from-brand-dark to-brand-dark/80 text-brand-dark-foreground hover:from-brand-dark/90 hover:to-brand-dark/70 transition-all duration-200 font-medium',
      },
      {
        label: 'Gradient Brand Dark (Rounded)',
        value:
          'px-6 py-3 bg-gradient-to-r from-brand-dark to-brand-dark/80 text-brand-dark-foreground hover:from-brand-dark/90 hover:to-brand-dark/70 transition-all duration-200 font-medium rounded-xl',
      },
      {
        label: 'Gradient Brand Dark (Pill)',
        value:
          'px-6 py-3 bg-gradient-to-r from-brand-dark to-brand-dark/80 text-brand-dark-foreground hover:from-brand-dark/90 hover:to-brand-dark/70 transition-all duration-200 font-medium rounded-full',
      },

      // Shadow Buttons
      {
        label: 'Shadow Brand Blue',
        value:
          'px-6 py-3 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl',
      },
      {
        label: 'Shadow Brand Blue (Rounded)',
        value:
          'px-6 py-3 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl rounded-xl',
      },
      {
        label: 'Shadow Brand Blue (Pill)',
        value:
          'px-6 py-3 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl rounded-full',
      },

      {
        label: 'Shadow Brand Dark',
        value:
          'px-6 py-3 bg-brand-dark text-brand-dark-foreground hover:bg-brand-dark/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl',
      },
      {
        label: 'Shadow Brand Dark (Rounded)',
        value:
          'px-6 py-3 bg-brand-dark text-brand-dark-foreground hover:bg-brand-dark/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl rounded-xl',
      },
      {
        label: 'Shadow Brand Dark (Pill)',
        value:
          'px-6 py-3 bg-brand-dark text-brand-dark-foreground hover:bg-brand-dark/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl rounded-full',
      },

      // Animated Buttons
      {
        label: 'Animated Brand Blue',
        value:
          'px-6 py-3 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 transition-all duration-200 font-medium transform hover:scale-105 active:scale-95',
      },
      {
        label: 'Animated Brand Blue (Rounded)',
        value:
          'px-6 py-3 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 transition-all duration-200 font-medium transform hover:scale-105 active:scale-95 rounded-xl',
      },
      {
        label: 'Animated Brand Blue (Pill)',
        value:
          'px-6 py-3 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 transition-all duration-200 font-medium transform hover:scale-105 active:scale-95 rounded-full',
      },

      // Disabled State Buttons
      {
        label: 'Disabled Brand Blue',
        value:
          'px-6 py-3 bg-brand-blue/50 text-brand-blue-foreground/50 cursor-not-allowed font-medium',
      },
      {
        label: 'Disabled Brand Blue (Rounded)',
        value:
          'px-6 py-3 bg-brand-blue/50 text-brand-blue-foreground/50 cursor-not-allowed font-medium rounded-xl',
      },
      {
        label: 'Disabled Brand Blue (Pill)',
        value:
          'px-6 py-3 bg-brand-blue/50 text-brand-blue-foreground/50 cursor-not-allowed font-medium rounded-full',
      },
    ],
  }

  return deepMerge(buttonResult, overrides)
}

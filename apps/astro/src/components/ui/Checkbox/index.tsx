import Error from '@components/ui/Error'
import styles from './Checkbox.module.scss'
import type { FieldErrors } from 'react-hook-form';

type Props = {
  register: {
    name: string
  }
  children: React.ReactNode
  errors: FieldErrors;
} & React.LabelHTMLAttributes<HTMLLabelElement>

export default function Checkbox({ children, register, errors, ...props }: Props) {
  return (
    <label className={styles.Checkbox} {...props}>
      <div className={styles.checkmark}>
        <input type="checkbox" {...register} aria-invalid={!!errors[register.name]} />
        <svg xmlns='http://www.w3.org/2000/svg' width='12' height='10' fill='none'>
          <path
            stroke='#0B2348'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.8 1.4L3.64 8.6 1.2 6.146'
          />
        </svg>
      </div>
      <p>
        <Error error={errors[register.name]?.message?.toString()} />
        {children}
      </p>
    </label>
  )
}

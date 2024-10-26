import styles from './Error.module.scss'

type Props = {
  error?: string;
}

export default function Error({ error }: Props) {
  return (
    error && (
      <span
        className={styles.Error}
        aria-live="assertive"
        role='alert'
      >
        <ErrorIcon />
        {error}
      </span>
    )
  );
}

const ErrorIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='17' fill='none'>
    <path
      stroke='#C8452E'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8 9.1V6.11m0 5.206v.027m3.78 2.49H4.22a2.266 2.266 0 01-2.178-1.616c-.117-.399.027-.814.247-1.167l3.78-6.816c.885-1.423 2.977-1.423 3.863 0l3.78 6.816c.22.353.363.768.246 1.167a2.265 2.265 0 01-2.178 1.616z'
    />
  </svg>
)

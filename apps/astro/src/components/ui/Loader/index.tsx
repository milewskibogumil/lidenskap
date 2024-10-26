import styles from './Loader.module.scss';

export default function Loader({ loading }: { loading: boolean }) {
  return (
    loading && (
      <div className={styles.Loader} aria-label='Ładowanie...'>
        <svg
          width={18}
          height={18}
          viewBox='25 25 50 50'
          className={styles.icon}
        >
          <circle
            cx='50'
            cy='50'
            r='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='5'
          />
        </svg>
      </div>
    )
  );
}

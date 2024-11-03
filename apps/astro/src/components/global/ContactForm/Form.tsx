import { useState } from 'preact/hooks';
import { useForm, type FieldValues } from 'react-hook-form';
import styles from './Form.module.scss';
import Input from '@/components/ui/Input'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import FormState from '@/components/ui/FormState';
import { REGEX } from '@/global/constants';
import { sendContactEmail, type Props as sendContactEmailProps } from '@/src/pages/api/contact/sendContactEmail';

export default function Form({ email, tel, facebook, instagram }: { email: string, tel: string, facebook: string, instagram: string }) {
  const [status, setStatus] = useState<{ sending: boolean, success: boolean | undefined }>({ sending: false, success: undefined });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data: FieldValues) => {
    setStatus({ sending: true, success: undefined });
    const response = await sendContactEmail(data as sendContactEmailProps);
    if (response.success) {
      setStatus({ sending: false, success: true });
      reset();
    } else {
      setStatus({ sending: false, success: false });
    }
  };

  return (
    <form className={`${styles.form} Form`} onSubmit={handleSubmit(onSubmit)}>
      <Loader loading={status.sending} />
      <FormState
        success={{
          heading: 'Dziękujemy za wiadomość!',
          paragraph: <p>Odpowiemy w ciągu 48. godzin.</p>,
          additionalInfo: <>
            <p>Zapraszamy na nasze social media:</p>
            <ul className={styles.socials}>
              <li>
                <a href={facebook} aria-label="Facebook" target="_blank" rel="noopener">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                    <path
                      stroke="#374776"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.417 8.333v3.334h2.5V17.5h3.333v-5.833h2.5l.834-3.334H11.25V6.667c0-.454.38-.834.834-.834h2.5V2.5h-2.5c-2.27 0-4.167 1.897-4.167 4.167v1.666h-2.5Z">
                    </path>
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                <a href={instagram} aria-label="Instagram" target="_blank" rel="noopener">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                    <path
                      stroke="#374776"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12.885 9.572a2.917 2.917 0 1 1-5.771.856 2.917 2.917 0 0 1 5.77-.856ZM14.167 5.417h.417">
                    </path>
                    <path
                      stroke="#374776"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.5 7.833c0-1.867 0-2.8.363-3.513.32-.627.83-1.137 1.457-1.457C5.033 2.5 5.966 2.5 7.833 2.5h4.334c1.867 0 2.8 0 3.513.363.627.32 1.137.83 1.457 1.457.363.713.363 1.646.363 3.513v4.334c0 1.867 0 2.8-.363 3.513a3.334 3.334 0 0 1-1.457 1.457c-.713.363-1.646.363-3.513.363H7.833c-1.867 0-2.8 0-3.513-.363a3.333 3.333 0 0 1-1.457-1.457c-.363-.713-.363-1.646-.363-3.513V7.833Z">
                    </path>
                  </svg>
                  Instagram
                </a>
              </li>
            </ul>
          </>
        }}
        error={{
          heading: 'Formularzy nie został wysłany',
          paragraph: <p>Spróbuj wysłać ponownie, lub skontaktuj się z nami mailowo: <a href="mailto:biuro@lidenskap.pl" className='link'>biuro@lidenskap.pl</a></p>,
          additionalInfo: <>
            <Button
              type='button'
              onClick={() => setStatus({ sending: false, success: undefined })}
            >
              Spróbuj ponownie
            </Button>
            <div className={styles.contact}>
              <a className={styles.tel} href={`tel:${tel}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none">
                  <path
                    stroke="#374776"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.22 16.142s-.966.949-1.203 1.227c-.385.411-.84.605-1.435.605-.057 0-.118 0-.176-.003-1.133-.073-2.186-.515-2.976-.892a16.947 16.947 0 0 1-5.633-4.402C4.495 11.11 3.625 9.664 3.049 8.11c-.355-.948-.485-1.687-.428-2.384.039-.446.21-.815.527-1.131L4.45 3.296c.187-.175.386-.27.58-.27.241 0 .436.144.558.266l.011.012c.233.217.454.441.687.681.118.122.24.244.363.37l1.042 1.04c.404.403.404.777 0 1.18-.111.11-.218.221-.329.328-.32.327-.068.076-.4.373-.008.008-.016.012-.02.02-.328.327-.267.647-.198.864l.012.034c.27.655.652 1.272 1.232 2.007l.004.004c1.053 1.295 2.164 2.304 3.389 3.077.156.1.317.18.47.255.137.069.267.134.377.202.015.008.03.02.046.027a.83.83 0 0 0 .378.095c.317 0 .515-.198.58-.263l.748-.746c.13-.13.336-.286.576-.286.237 0 .432.149.55.278l.008.008 2.102 2.098c.393.389.004 1.192.004 1.192Z">
                  </path>
                </svg>
                {tel}
              </a>
              <a className={styles.email} href={`mailto:${email}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none">
                  <path
                    stroke="#374776"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.438 5.604 10 9.823l7.031-4.219M4.375 15.754A1.875 1.875 0 0 1 2.5 13.879V6.542c0-1.036.84-1.875 1.875-1.875h11.25c1.035 0 1.875.84 1.875 1.875v7.337c0 1.035-.84 1.875-1.875 1.875H4.375Z">
                  </path>
                </svg>
                {email}
              </a>
            </div>
          </>
        }}
        isSuccess={status.success}
        email={email}
        tel={tel}
      />

      <Input
        label='Email'
        register={register('email', {
          required: { value: true, message: 'Email jest wymagany' },
          pattern: { value: REGEX.email, message: 'Niepoprawny adres e-mail' },
        })}
        errors={errors}
        type='email'
      />
      <Input
        label='Telefon (opcjonalnie)'
        register={register('phone', {
          pattern: { value: REGEX.phone, message: 'Niepoprawny numer telefonu' },
        })}
        errors={errors}
        type='tel'
        placeholder='+48 --- --- ---'
      />
      <Input
        label='Twoja wiadomość'
        register={register('message', {
          required: { value: true, message: 'Wiadomość jest wymagana' },
        })}
        isTextarea={true}
        errors={errors}
        placeholder='Napisz o czym chcesz porozmawiać…'
      />
      <Checkbox
        register={register('legal', {
          required: { value: true, message: 'Zgoda jest wymagana' },
        })}
        errors={errors}
      >
        Akceptuję <a href="/polityka-prywatnosci" target="_blank" rel="noopener noreferrer" className="link">
          politykę prywatności
        </a>
      </Checkbox>
      <Button type="submit" className={styles.cta}>Wyślij wiadomość</Button>
    </form >
  )
}

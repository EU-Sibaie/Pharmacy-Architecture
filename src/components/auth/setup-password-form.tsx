'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as authApi from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

const schema = zod
  .object({
    password: zod.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Values = zod.infer<typeof schema>;

const defaultValues = { password: '', confirmPassword: '' } satisfies Values;

export function SetupPasswordForm(): React.JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const token = searchParams.get('token');

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values): Promise<void> => {
    setSuccessMessage(null);

    try {
      const payload = { ...values, token };
      const { data } = await authApi.setupPassword(payload);
      if (data?.success) {
        setSuccessMessage(data.message);
        reset();
        setTimeout(() => {
          router.push('/auth/sign-in');
        }, 2000);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const status = err.response?.status;
      const message = err.response?.data?.message;

      setError('root', {
        type: 'server',
        message: status === 400 && message ? message : 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Setup Your Password</Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errors.root ? <Alert severity="error">{errors.root.message}</Alert> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>New Password</InputLabel>
                <OutlinedInput {...field} type="password" label="New Password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)}>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput {...field} type="password" label="Confirm Password" />
                {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Button disabled={isSubmitting} type="submit" variant="contained">
            Set new password
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

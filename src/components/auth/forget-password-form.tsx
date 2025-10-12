'use client';

import * as React from 'react';
import * as authApi from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

const schema = zod.object({ email: zod.string().min(1, { message: 'Email is required' }).email() });
type Values = zod.infer<typeof schema>;

const defaultValues = { email: '' } satisfies Values;

export function ForgetPasswordForm(): React.JSX.Element {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (values: Values): Promise<void> => {
    setSuccessMessage(null);

    try {
      const { data } = await authApi.forgetPassword(values);
      if (data?.success) {
        setSuccessMessage(data.message ?? 'Check your email for the reset link.');
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
      <Typography variant="h5" fontWeight={"bold"}>Forget Password</Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errors.root ? <Alert severity="error">{errors.root.message}</Alert> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          <LoadingButton loading={isSubmitting} type="submit" variant="contained">
            Send recovery link
          </LoadingButton>
        </Stack>
      </form>
    </Stack>
  );
}

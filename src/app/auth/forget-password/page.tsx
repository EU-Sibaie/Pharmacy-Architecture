import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { ForgetPasswordForm } from '@/components/auth/forget-password-form';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';

export const metadata = { title: `Forget Password | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <ForgetPasswordForm />
      </GuestGuard>
    </Layout>
  );
}

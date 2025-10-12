import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { SetupPasswordForm } from '@/components/auth/setup-password-form';

export const metadata = { title: `Setup Password | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <SetupPasswordForm />
      </GuestGuard>
    </Layout>
  );
}

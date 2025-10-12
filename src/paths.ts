export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', forgetPassword: '/auth/forget-password' },
  dashboard: {
    overview: '/dashboard',
    contacts: '/agents',
    clients: '/clients',
  },
  errors: { notFound: '/errors/not-found' },
} as const;

'use client';

import LoginPage from '@/components/saptix/LoginPage';

export default function Login() {
  return (
    <LoginPage
      subdomain="UI Portal"
      onSubmit={async (email, password) => {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        window.location.href = '/';
      }}
    />
  );
}

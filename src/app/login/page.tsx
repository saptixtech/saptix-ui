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
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Invalid email or password');
        }
        if (data.token) {
          try {
            localStorage.setItem('saptix_token', data.token);
            localStorage.setItem('saptix_user', JSON.stringify(data.user));
            localStorage.setItem('saptix_authenticated', 'true');
          } catch (_) {}
        }
        window.location.href = '/';
      }}
    />
  );
}

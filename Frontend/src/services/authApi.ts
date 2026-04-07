export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    full_name?: string;
    [key: string]: unknown;
  };
}

export interface AuthResponse {
  user: AuthUser | null;
  message: string;
  authenticated: boolean;
  requires_email_confirmation?: boolean;
}

interface RequestOptions {
  method?: 'GET' | 'POST';
  body?: Record<string, unknown>;
}

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:5137';

async function request<T>({ method = 'GET', body }: RequestOptions, path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof payload?.detail === 'string'
        ? payload.detail
        : typeof payload?.message === 'string'
          ? payload.message
          : 'Authentication request failed.';
    throw new Error(message);
  }

  return payload as T;
}

export function loginRequest(email: string, password: string) {
  return request<AuthResponse>({ method: 'POST', body: { email, password } }, '/api/auth/login');
}

export function signupRequest(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  return request<AuthResponse>(
    {
      method: 'POST',
      body: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      },
    },
    '/api/auth/signup',
  );
}

export function meRequest() {
  return request<AuthResponse>({}, '/api/auth/me');
}

export function logoutRequest() {
  return request<AuthResponse>({ method: 'POST' }, '/api/auth/logout');
}

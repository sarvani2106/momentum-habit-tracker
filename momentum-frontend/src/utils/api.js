const API_URL = import.meta.env.VITE_API_URL;

export const fetchAuth = async (
  url,
  options = {}
) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token
      ? { Authorization: `Bearer ${token}` }
      : {}),
    ...options.headers,
  };

  const response = await fetch(
    `${API_URL}${url}`,
    {
      ...options,
      headers,
    }
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(errorText);
  }

  return response.json();
};
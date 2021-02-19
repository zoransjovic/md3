export function handleResponse(response) {
  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      window.location.reload(true);
    }

    const error = response.message || response.statusText;

    return Promise.reject(error);
  }

  return response.json();
}

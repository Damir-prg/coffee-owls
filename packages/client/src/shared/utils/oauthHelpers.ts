export function getYandexOauthUrl({ clientId, redirectUri }: { clientId: string; redirectUri: string }) {
  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
}

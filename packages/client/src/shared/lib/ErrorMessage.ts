export default function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Некорректный запрос. Проверьте данные.';
    case 401:
      return 'Ошибка при авторизации. Проверьте данные.';
    case 403:
      return 'Доступ запрещен. У вас нет разрешения.';
    case 404:
      return 'Ресурс не найден. Проверьте URL.';
    case 500:
      return 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.';
    default:
      return 'Произошла неизвестная ошибка.';
  }
}

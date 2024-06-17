const ERROR_MESSAGES: Record<number, string> = {
  0: 'Произошла неизвестная ошибка.',
  400: 'Некорректный запрос. Проверьте данные.',
  401: 'Ошибка при авторизации. Проверьте данные.',
  403: 'Доступ запрещен. У вас нет разрешения.',
  404: 'Ресурс не найден. Проверьте URL.',
  500: 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.',
};

export default function getErrorMessage(error: unknown | null): string {
  let errorStatus: number | undefined;
  if (error && typeof error === 'object' && 'status' in error) {
    errorStatus = (error as { status?: number }).status;
  }
  return ERROR_MESSAGES[errorStatus || 0];
}

export function getErrorStatus(error: unknown | null): number | undefined {
  let errorStatus: number | undefined;
  if (error && typeof error === 'object' && 'status' in error) {
    errorStatus = (error as { status?: number }).status;
  }
  return errorStatus;
}

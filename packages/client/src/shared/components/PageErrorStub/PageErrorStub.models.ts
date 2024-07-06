import serverErrorImg from 'images/500.png';
import notFoundImg from 'images/404.png';

export enum ESTUB_TYPE {
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVICE_ERROR = 'INTERNAL_SERVICE_ERROR',
}

export const STUB_ICON: Record<ESTUB_TYPE, string> = {
  NOT_FOUND: notFoundImg,
  INTERNAL_SERVICE_ERROR: serverErrorImg,
};

export const STUB_TEXT: Record<ESTUB_TYPE, string> = {
  NOT_FOUND:
    'Упппс!\n Возможно, страница, которую вы ищете, была удалена, ее название изменилось или она временно недоступна.',
  INTERNAL_SERVICE_ERROR: 'Упппс!\n Внутренняя ошибка сервера\n Мы о ней знаем и скоро исправим!',
};

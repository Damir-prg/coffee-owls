import React, { useEffect } from 'react';
import { setTheme } from 'shared/store/themeSlice';
import { TRootState } from 'shared/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { ETHEME } from 'shared/enums/theme';

const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: TRootState) => state.theme.theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ETHEME.Light | ETHEME.Dark;
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else {
      localStorage.setItem('theme', theme);
    }
  }, [dispatch]);

  return <div>{children}</div>;
};

export default ThemeProvider;

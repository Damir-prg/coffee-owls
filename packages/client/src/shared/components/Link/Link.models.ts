export type TLinkType = {
  text: string;
  path: string;
  /**
   * 'small' - 16px
   *
   * 'medium' - 18px
   *
   * 'large' - 24px
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 'lighter' - 300
   *
   * 'normal' - 400
   *
   * 'bold' - 600
   */
  weight?: 'lighter' | 'normal' | 'bold';
};

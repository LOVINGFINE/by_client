declare interface Window {
  $t(k: string, options: { [k: string]: string | number }): string | number;
  i18n: { [k: string]: string | number };
}

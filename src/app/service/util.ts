export class Util{

  static str2date(text: string): Date {
    return new Date(text);
  }

  static date2str(date: Date): string {
    return date.toISOString().substr(0, 10);
  }
}
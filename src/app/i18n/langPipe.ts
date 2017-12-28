import { Pipe, PipeTransform } from '@angular/core';
import { LangPackage } from './langPackage';

@Pipe({name: 'lang'})
export class LangPipe implements PipeTransform {
  constructor(private langPackage:LangPackage){
  }

  transform(id: string): string {
    return this.langPackage.get(id);
  }
}
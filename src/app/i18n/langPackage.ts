import { Injectable } from "@angular/core";

import EN from "./en.lang";
import CN from "./cn.lang";

@Injectable()
export class LangPackage {
  package: any = {};

  setLang(lang: string) {
    switch (lang) {
      case 'cn':
      case "zh-CN":
        this.package = CN;
        break;
      default:
        this.package = EN;
        break;
    }
  }

  get(id: string, ...args): string {
    if (!id) {
      return '';
    }

    var keys: string[] = id.split('.');
    var value: string = this.package;
    for (let i = 0; i < keys.length; i++) {
      if (value[keys[i]]) {
        value = value[keys[i]];
      } else {
        return '';
      }
    }

    if (args && args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        value = value.replace('{' + i + '}', args[i]);
      }
    }

    return value;
  }
}
import { Pipe, PipeTransform } from '@angular/core';
import { Evento } from 'src/app/interface/evento';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: Evento[], arg?: any): any {
    if (value != undefined) {
      const resultPosts: Evento[] = [];
      for (const evento of value!) {
        if (evento.nombre!.indexOf(arg) > -1) {
          resultPosts.push(evento);
        }
      }
      return resultPosts;
    } else {
      return [];
    }
  }
}

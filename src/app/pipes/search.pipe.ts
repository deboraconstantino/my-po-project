import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!value) { return null; }
    if (!args) { return value; }

    args = args.toLowerCase();
    value = value.map(value => {
      value.dateDaDebora = args;
      return value;
    })

    console.log(value)
    
    return value.filter( item => {

      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}

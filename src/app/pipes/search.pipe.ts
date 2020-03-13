import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {
  transform(value: any, search?: any): any {
    if (!value) {
      return null;
    }
    if (!search) {
      return value;
    }

    search = search.toLowerCase();
    value = value.map(value => {
      value.date = this.dateTransform(value.start);
      return value;
    });

    return value.filter(item => {
      return JSON.stringify(item)
        .toLowerCase()
        .includes(search);
    });
  }

  dateTransform(date) {
    date = date.split("-");
    return `${date[2]}/${date[1]}/${date[0]}`;
  }
}

import { Injectable } from "@angular/core";
import { PoComboOption } from '@portinari/portinari-ui';

@Injectable()
export class CategoriesService {
    getCategories(): Array<PoComboOption>{
        return [
          { label: 'Lazer', value: 'Lazer' },
          { label: 'Trabalho', value: 'Trabalho' },
          { label: 'Educação', value: 'Educação' },
          { label: 'Outros', value: 'Outros' },
        ];
      }
}
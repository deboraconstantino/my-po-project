import { Injectable } from "@angular/core";
import { PoComboOption } from '@portinari/portinari-ui';

@Injectable()
export class CategoriesService {
    getCategories(): Array<PoComboOption>{
        return [
          { label: 'Lazer', value: 'lazer' },
          { label: 'Trabalho', value: 'work' },
          { label: 'Educação', value: 'education' },
          { label: 'Outros', value: 'outros' },
        ];
      }
}
import { Pipe, PipeTransform } from '@angular/core';
import { ProductStatus } from './models/ProductStatus.enum';

@Pipe({
  name: 'statusNameKey'
})
/**
 * Converts Product status enum to status name translation key
 */
export class StatusNameKeyPipe implements PipeTransform {

  transform(value: ProductStatus | number, ...args: unknown[]): string {
    switch (value) {
      case ProductStatus.Available: {
        return 'INVENTORY.AVAILABLE';
      }
      case ProductStatus.Unavailable: {
        return 'INVENTORY.UNAVAILABLE';
      }
    }
    return '';
  }

}

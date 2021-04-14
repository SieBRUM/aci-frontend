import { Pipe, PipeTransform } from '@angular/core';
import { ProductStatus } from './models/ProductStatus.enum';

@Pipe({
  name: 'statusNameClass'
})
/**
 * Converts ProductStatus enum to class names used in inventory component
 */
export class StatusNameClassPipe implements PipeTransform {

  transform(value: ProductStatus, ...args: unknown[]): string {
    switch (value) {
      case ProductStatus.Available: {
        return 'available-status';
      }
      case ProductStatus.Unavailable: {
        return 'unavailable-status';
      }
      case ProductStatus.Archived: {
        return 'archived-status';
      }
    }
  }

}
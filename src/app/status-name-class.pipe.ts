import { Pipe, PipeTransform } from '@angular/core';
import { ProductStatus } from './models/ProductStatus';

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
      case ProductStatus.AwaitingApproval: {
        return 'awaits-approval-status';
      }
      case ProductStatus.Reserved: {
        return 'reserved-status';
      }
      case ProductStatus.LentOut: {
        return 'lent-status';
      }
      case ProductStatus.Unavailable: {
        return 'unavailable-status';
      }
    }
    return '';
  }

}

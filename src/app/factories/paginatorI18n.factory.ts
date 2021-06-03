import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

/**
 * Creates PaginatorIntl with translation support
 * @param translate translation service used in the application
 * @returns PaginatorIntl with translation support
 */
export function MatPaginatorIntlFactory(translate: TranslateService): MatPaginatorIntl {
    return new TranslationMatPaginatorIntl(translate);
}

/**
 * Creates PaginatorIntl with i18n support
 */
export class TranslationMatPaginatorIntl extends MatPaginatorIntl {

    constructor(private readonly translate: TranslateService) {
        super();
        // translate labels when the language is changed
        this.translate.onLangChange.subscribe(() => {
            this.translateLabels();
        });
        // translate labels immediately
        this.translateLabels();
    }

    /**
     * translates the labels via de translationsServices
     * then fires the labels changed event
     */
    private translateLabels(): void {
        this.itemsPerPageLabel = this.translate.instant('PAGINATOR.ITEMS_PER_PAGE');
        this.nextPageLabel = this.translate.instant('PAGINATOR.NEXT_PAGE');
        this.previousPageLabel = this.translate.instant('PAGINATOR.PREVIOUS_PAGE');
        this.firstPageLabel = this.translate.instant('PAGINATOR.FIRST_PAGE');
        this.lastPageLabel = this.translate.instant('PAGINATOR.LAST_PAGE');
        this.getRangeLabel = this.translateRangeLabel.bind(this);
        this.changes.next();
    }

    /**
     * Translates the label where the range of the paginator is displayed
     * @param page the page index
     * @param pageSize maximum amount of items that are to be displayed
     * @param length total number of items
     * @returns localized string
     */
    private translateRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return this.translate.instant('PAGINATOR.RANGE_PAGE_LABEL_1', { length });
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this.translate.instant('PAGINATOR.RANGE_PAGE_LABEL_2', { startIndex: startIndex + 1, endIndex, length });
    }
}

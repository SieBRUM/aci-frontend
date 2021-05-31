import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Creates httpLoader
 * @param httpClient the http client used in the application
 * @returns httpLoader
 */
export function HttpLoaderFactory(httpClient: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(httpClient);
}

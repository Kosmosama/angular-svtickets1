import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'intlCurrency',
    standalone: true
})
export class IntlCurrencyPipe implements PipeTransform {
    transform(price: number, currency = 'EUR', language = 'en-IE'): string {
        return new Intl.NumberFormat(language, { style: 'currency', currency }).format(price);
    }
}

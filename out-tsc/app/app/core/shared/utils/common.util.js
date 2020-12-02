import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';
import { CustomizableAlertDialogComponent } from '../components/customizable-alert-dialog/customizable-alert-dialog.component';
import { LoadingComponent } from '../components/loading/loading.component';
import * as moment from 'moment';
let Common = class Common {
    constructor(matDialog, snackBar, componentFactoryResolver, api) {
        this.matDialog = matDialog;
        this.snackBar = snackBar;
        this.componentFactoryResolver = componentFactoryResolver;
        this.api = api;
    }
    alert(body, title = 'Attention') {
        this.matDialog.open(AlertDialogComponent, {
            maxWidth: '40vw',
            data: {
                title,
                body
            }
        });
    }
    customAlert(body, title = 'Attention', actions = ['OK']) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialog = this.matDialog.open(CustomizableAlertDialogComponent, {
                data: {
                    title,
                    body,
                    actions
                }
            });
            return dialog.afterClosed().toPromise();
        });
    }
    modal(component, data, noPadding = false, config) {
        const dialog = this.matDialog.open(component, Object.assign({ panelClass: noPadding ? 'dialog-without-padding' : 'relative', minWidth: '60%', maxHeight: '90vh', data, disableClose: true }, config));
        return dialog.afterClosed().toPromise();
    }
    dialog(component, data, config, noPadding = false) {
        let defaultConfig = {};
        if (config) {
            defaultConfig = config;
            defaultConfig.data = data;
            defaultConfig.disableClose = config.disableClose;
        }
        const dialog = this.matDialog.open(component, defaultConfig);
        return dialog.afterClosed().toPromise();
    }
    dialogWithoutPadding(component, data, config) {
        return this.dialog(component, data, config, true);
    }
    modalWithResult(component, data, noPadding = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialog = this.matDialog.open(component, {
                panelClass: noPadding ? 'dialog-without-padding' : '',
                minWidth: '60%',
                height: '85%',
                data
            });
            return dialog.afterClosed().toPromise();
        });
    }
    toast(body, config) {
        this.snackBar.open(body, null, Object.assign({ duration: 5000 }, config));
    }
    dynamicSort(property) {
        let sortOrder = 1;
        if (property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        }
        return (a, b) => {
            if (sortOrder === -1) {
                return b[property].localeCompare(a[property]);
            }
            else {
                return a[property].localeCompare(b[property]);
            }
        };
    }
    formatDate(value, ...args) {
        return moment(value).format('DD MMMM YYYY');
    }
    loading(message) {
        return this.matDialog.open(LoadingComponent, {
            disableClose: true,
            data: { message }
        });
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    compareFn(c1, c2) {
        return c1 && c2 ? c1._id === c2._id : c1 === c2;
    }
    pruneInputValue(inputValue) {
        const value = parseInt(inputValue, 0);
        if (!Number.isInteger(value)) {
            this.alert('Le nombre de pièce doit être un nombre');
        }
    }
    isValidNumber(userValue) {
        const value = Number(userValue);
        if (typeof value !== 'number') {
            return false;
        }
        return value > 0;
    }
    invalidatedForm(partForm) {
        Object.keys(partForm.controls).forEach(field => {
            const control = partForm.get(field); // {2}
            control.markAsTouched({ onlySelf: true }); // {3}
        });
        this.matDialog.open(AlertDialogComponent, {
            data: {
                title: 'Le formulaire comporte des erreurs',
                body: 'Veuillez corriger les erreurs du formulaire afin de continuer'
            }
        });
    }
    spaced(value, suffix) {
        if (value === undefined || value == null) {
            return value;
        }
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + (suffix || '');
    }
    renderComponent(viewContainer, component) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        viewContainer.clear();
        viewContainer.createComponent(factory);
    }
    numToLetters(num) {
        const units2Letters = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
        const tens2Letters = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
        const units = num % 10;
        const tens = (num % 100 - units) / 10;
        const hundreds = (num % 1000 - num % 100) / 100;
        let unitsOut;
        let tensOut;
        let hundredsOut;
        if (num === 0) {
            return 'zéro';
        }
        else {
            // Traitement des unités
            unitsOut = (units === 1 && tens > 0 && tens !== 8 ? 'et-' : '') + units2Letters[units];
            // Traitement des dizaines
            if (tens === 1 && units > 0) {
                tensOut = units2Letters[10 + units];
                unitsOut = '';
            }
            else if (tens === 7 || tens === 9) {
                tensOut = tens2Letters[tens] + '-' + (tens === 7 && units === 1 ? 'et-' : '') + units2Letters[10 + units];
                unitsOut = '';
            }
            else {
                tensOut = tens2Letters[tens];
            }
            tensOut += (units === 0 && tens === 8 ? 's' : '');
            // Traitement des centaines
            hundredsOut = (hundreds > 1 ? units2Letters[hundreds] + '-' : '') + (hundreds > 0 ? 'cent' : '') + (hundreds > 1 && tens === 0 && units === 0 ? 's' : '');
            // Retour du total
            return hundredsOut + (hundredsOut && tensOut ? '-' : '') + tensOut + (hundredsOut && unitsOut || tensOut && unitsOut ? '-' : '') + unitsOut;
        }
    }
    decimalToLetter(num) {
        const decimals = num.toString().split('.');
        if (decimals[1] === undefined) {
            return this.numToLetters(decimals[0]);
        }
        const numberBeforeDot = this.numToLetters(decimals[0]);
        const numberAfterDot = this.numToLetters(Number(decimals[1]));
        return decimals[1][0] === '0' ? `${numberBeforeDot} virgule zéro ${numberAfterDot}` : `${numberBeforeDot} virgule ${numberAfterDot}`;
    }
    serverTime() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get('/').toPromise();
        });
    }
    decodeJwtToken(token) {
        const payload = token.split('.')[1];
        return atob(payload);
    }
    isJwtTokenExpired(tokenExpiresIn) {
        const now = moment();
        const tokenExpiration = moment().add(tokenExpiresIn, 'second');
        return now.diff(tokenExpiration) > 0;
    }
    groupBy(key, array) {
        return array.reduce((acc, cur) => {
            acc[cur[key]] = [...acc[cur[key]] || [], cur];
            return acc;
        }, {});
    }
};
Common = __decorate([
    Injectable()
], Common);
export { Common };
//# sourceMappingURL=common.util.js.map
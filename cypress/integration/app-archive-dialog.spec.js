/// <reference types="cypress" />

const productList = { "products": [{ "id": 1, "name": "Camera", "location": "Plank 3", "requiresApproval": false, "status": 0 }, { "id": 2, "name": "Camera 2", "location": "Plank 4", "requiresApproval": false, "status": 1 }, { "id": 3, "name": "Camera 4", "location": "Plank 4", "requiresApproval": false, "status": 2 }], "currentPage": 0, "totalProductCount": 3 };

describe('Archive product tests', () => {
    it('Should show dropdown in English', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().contains('Archive');
    });

    it('Should show dropdown in Dutch', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().contains('Archiveren');
    });

    it('Should show dialog in English', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("h2[name=archive-dialog-title]").contains('Confirm');
        cy.get("p[name=archive-dialog-text]").contains('You are about to archive the following product:');
        cy.get("li[name=archive-dialog-list-item]").contains('Camera');
        cy.get("button[name=archive-dialog-archive-button]").contains('Archive');
        cy.get("button[name=archive-dialog-cancel-button]").contains('Cancel');
    });

    it('Should show dialog in Dutch', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("h2[name=archive-dialog-title]").contains('Bevestig');
        cy.get("p[name=archive-dialog-text]").contains('U staat op het punt het volgende product te archiveren:');
        cy.get("li[name=archive-dialog-list-item]").contains('Camera');
        cy.get("button[name=archive-dialog-archive-button]").contains('Archiveren');
        cy.get("button[name=archive-dialog-cancel-button]").contains('Annuleren');
    });

    it('Should show {no valid id} error in Dutch', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.intercept('DELETE', '/api/product/1', { statusCode: 400, body: 'PRODUCT.ARCHIVE.NO_VALID_ID' });
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("button[name=archive-dialog-archive-button]").click();
        cy.get("snack-bar-container").contains('Het opgegeven product kan niet gearchiveerd worden');
    });

    it('Should show {no valid id} error in English', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.intercept('DELETE', '/api/product/1', { statusCode: 400, body: 'PRODUCT.ARCHIVE.NO_VALID_ID' });
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("button[name=archive-dialog-archive-button]").click();
        cy.get("snack-bar-container").contains('The given product can not be archived');
    });

    it('Should show {no product found} error in Dutch', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.intercept('DELETE', '/api/product/1', { statusCode: 400, body: 'PRODUCT.ARCHIVE.NO_PRODUCT_FOUND' });
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("button[name=archive-dialog-archive-button]").click();
        cy.get("snack-bar-container").contains('Het product dat gearchiveerd moet worden is niet gevonden');
    });

    it('Should show {no product found} error in English', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.intercept('DELETE', '/api/product/1', { statusCode: 400, body: 'PRODUCT.ARCHIVE.NO_PRODUCT_FOUND' });
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("button[name=archive-dialog-archive-button]").click();
        cy.get("snack-bar-container").contains('The product to archive was not found');
    });

    it('Should show {product already archived} error in Dutch', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.intercept('DELETE', '/api/product/1', { statusCode: 400, body: 'PRODUCT.ARCHIVE.PRODUCT_ALREADY_ARCHIVED' });
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("button[name=archive-dialog-archive-button]").click();
        cy.get("snack-bar-container").contains('Dit product is al gearchiveerd');
    });

    it('Should show {product already archived} error in English', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.intercept('DELETE', '/api/product/1', { statusCode: 400, body: 'PRODUCT.ARCHIVE.PRODUCT_ALREADY_ARCHIVED' });
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("button[name=archive-dialog-archive-button]").click();
        cy.get("snack-bar-container").contains('This product is already archived');
    });

    it('Should show {successfully archived product} in Dutch', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.intercept('DELETE', '/api/product/1', { statusCode: 200 });
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("button[name=archive-dialog-archive-button]").click();
        cy.get("snack-bar-container").contains('Het product is succesvol gearchiveerd!');
    });

    it('Should show {successfully archived product} in Dutch', () => {
        cy.intercept('GET', '/api/product/page/0/50', productList);
        cy.intercept('DELETE', '/api/product/1', { statusCode: 200 });
        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.get("button[name=dropdown-menu-icon]").first().click();
        cy.get("button[name=archive-button]").first().click();
        cy.get("button[name=archive-dialog-archive-button]").click()
        cy.get("snack-bar-container").contains('The product has been archived!');
    });
});
/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200')
    });

    it('Should show table headers in English', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.changeLanguage('en');

        cy.visit('http://localhost:4200/products')

        cy.get(".mat-column-name").contains("Name")
        cy.get(".mat-column-location").contains("Location")
        cy.get(".mat-column-status").contains("Status")
    });

    it('Should show table headers in Dutch', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.changeLanguage('nl');

        cy.visit('http://localhost:4200/products')

        cy.get(".mat-column-name").contains("Naam")
        cy.get(".mat-column-location").contains("Locatie")
        cy.get(".mat-column-status").contains("Status")
    });

    
    it('Should show status chips in English', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.changeLanguage('en');

        cy.visit('http://localhost:4200/products')
        cy.wait("@getProducts")

        cy.get(".available-status").contains("Available")
        cy.get(".unavailable-status").contains("Unavailable")
    });

    it('Should show status chips in Dutch', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.changeLanguage('nl');

        cy.visit('http://localhost:4200/products')
        cy.wait("@getProducts")

        cy.get(".available-status").contains("Beschikbaar")
        cy.get(".unavailable-status").contains("Niet beschikbaar")
    });

    
    it('Should show error in English', () => {
        cy.intercept('GET', '/api/product', { statusCode: 500 }).as('getProducts');

        cy.changeLanguage('en');

        cy.visit('http://localhost:4200/products')
        cy.wait("@getProducts")

        cy.get("snack-bar-container").contains('Something went wrong. Please try again later');
    });

    it('Should show error in Dutch', () => {
        cy.intercept('GET', '/api/product', { statusCode: 500 }).as('getProducts');

        cy.changeLanguage('nl');

        cy.visit('http://localhost:4200/products')
        cy.wait("@getProducts")

        cy.get("snack-bar-container").contains('Er is iets misgegaan. Probeer later opnieuw');
    });

    it('Should go to next page', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.changeLanguage('en');

        cy.visit('http://localhost:4200/products')
        cy.wait("@getProducts")

        cy.get(".mat-paginator-range-label").contains(" 1 – 5 of 6 ")

        cy.intercept('GET', /\/api\/product\/page\/1\/[0-9]+$/, { fixture: 'inventory-products-page-2.json' }).as('getProductsNextPage');

        cy.get(".mat-paginator-navigation-next").click();

        cy.wait("@getProductsNextPage")

        cy.get(".mat-paginator-range-label").contains(" 6 – 6 of 6 ")
    });

    
    it('Should change page size', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.changeLanguage('en');

        cy.visit('http://localhost:4200/products')
        cy.wait("@getProducts")

        cy.intercept('GET', '/api/product/page/0/100', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(100).click();

        cy.wait("@getProducts")
    });
});
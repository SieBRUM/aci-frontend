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
        cy.get(".required-approval-status").contains("Available with approval")
    });

    it('Should show status chips in Dutch', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.changeLanguage('nl');

        cy.visit('http://localhost:4200/products')
        cy.wait("@getProducts")

        cy.get(".available-status").contains("Beschikbaar")
        cy.get(".unavailable-status").contains("Niet beschikbaar")
        cy.get(".required-approval-status").contains("Beschikbaar met goedkeuring")
    });

    
    it('Should show error in English', () => {
        cy.intercept('GET', '/api/product', { statusCode: 500 }).as('getProducts');

        cy.changeLanguage('en');

        cy.visit('http://localhost:4200/products')
        cy.wait("@getProducts")

        cy.get("snack-bar-container").contains('Something went wrong when with receving inventory data');
    });

    it('Should show error in Dutch', () => {
        cy.intercept('GET', '/api/product', { statusCode: 500 }).as('getProducts');

        cy.changeLanguage('nl');

        cy.visit('http://localhost:4200/products')
        cy.wait("@getProducts")

        cy.get("snack-bar-container").contains('Er is iets misgegeaan met get ophalen van de inventorie gegevens');
    });
});
/// <reference types="cypress" />

describe('Side menu bar tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200')
    });

    it('Should show menu options in English', () => {
        cy.changeLanguage('en');
        cy.changeIsMenuOpened(true);
        cy.get('div[name=menu-options-list]').contains('Home');
        cy.get('div[name=menu-options-list]').contains('Add product');
    });

    it('Should show hello message in Dutch', () => {
        cy.changeLanguage('nl');
        cy.changeIsMenuOpened(true);
        cy.get('div[name=menu-options-list]').contains('Home');
        cy.get('div[name=menu-options-list]').contains('Product toevoegen');
    });

    it('Should navigate to correct add product url', () => {
        cy.changeIsMenuOpened(true);
        cy.get('button[name=menu-option-add-product]').click();
        cy.url().should('include', 'products/add')
    });

    it('Should navigate to correct home url', () => {
        cy.changeIsMenuOpened(true);
        cy.get('button[name=menu-option-home]').click();
        cy.url().should('include', 'home')
    });

});
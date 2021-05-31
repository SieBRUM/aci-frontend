/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    it('Should show hello message in English', () => {
        cy.changeLanguage('en');
        cy.contains('Welcome home');
    });

    it('Should show hello message in Dutch', () => {
        cy.changeLanguage('nl');
        cy.contains('Welkom thuis');
    });

});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/*
    Command to change the language of the app very quickly

    usage: cy.changeLanguage('nl')
    params: language: string
    Short-hand name of the language. ex: nl
*/
Cypress.Commands.add('changeLanguage', (language) => {
    cy.get('mat-drawer[name=side-menu-drawer]').then(element => {
        if (element.attr('ng-reflect-opened') === 'false') {
            cy.get('button[name=toggle-menu]').click();
        }
        cy.get('mat-select[name=language-select]').click();
        cy.get(`mat-option[ng-reflect-value=${language}]`).click();
        if (localStorage.getItem('menu-pinned') === 'false') {
            cy.get('.mat-drawer-backdrop').click();
            cy.wait(400);
        }
    })
});

/*
    Command to open or close the side menu

    cy.changeIsMenuOpened(true);
    params: shouldOpen: boolean
*/
Cypress.Commands.add('changeIsMenuOpened', (shouldOpen) => {
    cy.get('mat-drawer[name=side-menu-drawer]').then(element => {
        if (shouldOpen) {
            if (element.attr('ng-reflect-opened') === 'false') {
                cy.get('button[name=toggle-menu]').click();
                cy.wait(400);
            }
        } else {
            if (element.attr('ng-reflect-opened') === 'true') {
                cy.get('button[name=toggle-menu]').click();
                cy.wait(400);
            }
        }
    })
});

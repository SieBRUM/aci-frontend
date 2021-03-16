/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();


describe('Side menu bar tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/products/add')
    });

    it('Should show initial page setup in English', () => {
        cy.changeLanguage('en');

        cy.get("mat-card-title[name=add-product-title]").contains('Add product');

        cy.get("mat-label[name=product-name-input-label]").contains('Product name');
        cy.get("input[name=product-name-input]").should('not.be.disabled');

        cy.get("mat-label[name=catalog-number-input-label]").contains('Catalog number');
        cy.get("input[name=catalog-number-input]").should('not.be.disabled');

        cy.get("mat-label[name=category-id-select-label]").contains('Category');
        cy.get("mat-select[name=category-id-select]").should('not.be.disabled');

        cy.get("mat-label[name=product-location-input-label]").contains('Location');
        cy.get("input[name=product-location-input]").should('not.be.disabled');

        cy.get("mat-label[name=description-textarea-label]").contains('Description');
        cy.get("textarea[name=description-textarea]").should('not.be.disabled');

        cy.get("span[name=amount-images]").contains('0 / 0');

        cy.get("button[name=previous-image-button]").should('have.attr', 'title', 'Previous image')
        cy.get("button[name=previous-image-button]").should('be.disabled');

        cy.get("button[name=next-image-button]").should('have.attr', 'title', 'Next image');
        cy.get("button[name=next-image-button]").should('be.disabled');

        cy.get("input[id=fileInput]").should('be.hidden');

        cy.get("button[name=image-input-button]").should('have.attr', 'title', 'Add image(s)');
        cy.get("button[name=image-input-button]").should('not.be.disabled');

        cy.get("button[name=remove-image-button]").should('have.attr', 'title', 'Remove image');
        cy.get("button[name=remove-image-button]").should('be.disabled');

        cy.get('button[name=confirm-remove-image-button]').should('not.exist');
        cy.get('button[name=cancel-remove-image-button]').should('not.exist');

        cy.get("mat-checkbox[name=requires-approval-checkbox]").contains('Requires approval');
        cy.get("mat-checkbox[name=requires-approval-checkbox]").should('not.be.disabled');

        cy.get("button[name=save-product-button]").contains('Add product');
        cy.get("button[name=save-product-button]").should('not.be.disabled');

        cy.get('mat-spinner[name=save-product-loading-spinner]').should('not.exist');
    });

    it('Should show initial page setup in Dutch', () => {
        cy.changeLanguage('nl');

        cy.get("mat-card-title[name=add-product-title]").contains('Product toevoegen');

        cy.get("mat-label[name=product-name-input-label]").contains('Productnaam');
        cy.get("input[name=product-name-input]").should('not.be.disabled');

        cy.get("mat-label[name=catalog-number-input-label]").contains('Catalogus nummer');
        cy.get("input[name=catalog-number-input]").should('not.be.disabled');

        cy.get("mat-label[name=category-id-select-label]").contains('Categorie');
        cy.get("mat-select[name=category-id-select]").should('not.be.disabled');

        cy.get("mat-label[name=product-location-input-label]").contains('Locatie');
        cy.get("input[name=product-location-input]").should('not.be.disabled');

        cy.get("mat-label[name=description-textarea-label]").contains('Beschrijving');
        cy.get("textarea[name=description-textarea]").should('not.be.disabled');

        cy.get("span[name=amount-images]").contains('0 / 0');

        cy.get("button[name=previous-image-button]").should('have.attr', 'title', 'Vorige foto')
        cy.get("button[name=previous-image-button]").should('be.disabled');

        cy.get("button[name=next-image-button]").should('have.attr', 'title', 'Volgende foto');
        cy.get("button[name=next-image-button]").should('be.disabled');

        cy.get("input[id=fileInput]").should('be.hidden');

        cy.get("button[name=image-input-button]").should('have.attr', 'title', 'Foto(s) toevoegen');
        cy.get("button[name=image-input-button]").should('not.be.disabled');

        cy.get("button[name=remove-image-button]").should('have.attr', 'title', 'Foto verwijderen');
        cy.get("button[name=remove-image-button]").should('be.disabled');

        cy.get('button[name=confirm-remove-image-button]').should('not.exist');
        cy.get('button[name=cancel-remove-image-button]').should('not.exist');

        cy.get("mat-checkbox[name=requires-approval-checkbox]").contains('Vereist goedkeuring');
        cy.get("mat-checkbox[name=requires-approval-checkbox]").should('not.be.disabled');

        cy.get("button[name=save-product-button]").contains('Product toevoegen');
        cy.get("button[name=save-product-button]").should('not.be.disabled');

        cy.get('mat-spinner[name=save-product-loading-spinner]').should('not.exist');
    });

    it('Should show error {no product name} error in English', () => {
        cy.changeLanguage('en');
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Product name is required');
    });

    it('Should show error {no product name} error in Dutch', () => {
        cy.changeLanguage('nl');
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Productnaam is verplicht');
    });
});
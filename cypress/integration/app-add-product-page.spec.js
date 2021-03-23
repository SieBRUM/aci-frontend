/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();


describe('Add product menu tests', () => {
    it('Should show initial page setup in English', () => {
        cy.intercept('GET', '/api/product/lastcatalog', '5');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }]);
        cy.visit('http://localhost:4200/products/add')

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
        cy.intercept('GET', '/api/product/lastcatalog', '5');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }]);
        cy.visit('http://localhost:4200/products/add')

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

    it('Should show error {no product name} in English', () => {
        cy.visit('http://localhost:4200/products/add')

        cy.changeLanguage('en');
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Product name is required');
    });

    it('Should show error {no product name} in Dutch', () => {
        cy.visit('http://localhost:4200/products/add')

        cy.changeLanguage('nl');
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Productnaam is verplicht');
    });

    it('Should show error {catalog error} in English', () => {
        cy.intercept('GET', '/api/product/lastcatalog', '9');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }]);
        cy.visit('http://localhost:4200/products/add')

        cy.changeLanguage('en');
        cy.get("input[name=product-name-input]").type('Bla bla bla');
        cy.get("input[name=catalog-number-input]").clear();
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Incorrect catalog number');
    });

    it('Should show error {catalog error} in Dutch', () => {
        cy.intercept('GET', '/api/product/lastcatalog', '9');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }]);
        cy.visit('http://localhost:4200/products/add')

        cy.changeLanguage('nl');
        cy.get("input[name=product-name-input]").type('Bla bla bla');
        cy.get("input[name=catalog-number-input]").clear();
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Incorrect catalog nummer');
    });


    it('Should show error {category error} in English', () => {
        cy.intercept('GET', '/api/product/lastcatalog', '9');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }]);
        cy.visit('http://localhost:4200/products/add')

        cy.changeLanguage('en');
        cy.get("input[name=product-name-input]").type('Bla bla bla');
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Product category is required');
    });

    it('Should show error {category error} in Dutch', () => {
        cy.intercept('GET', '/api/product/lastcatalog', '9');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }]);
        cy.visit('http://localhost:4200/products/add')

        cy.changeLanguage('nl');
        cy.get("input[name=product-name-input]").type('Bla bla bla');
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Product category is verplicht');
    });

    it('Should show error {description error} in English', () => {
        cy.intercept('GET', '/api/product/lastcatalog', '9');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }]);
        cy.visit('http://localhost:4200/products/add')

        cy.changeLanguage('en');
        cy.get("input[name=product-name-input]").type('Bla bla bla');
        cy.get('mat-select[name=category-id-select]').click().get('mat-option').contains('TestCategory').click();
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Description is required');
    });

    it('Should show error {description error} in Dutch', () => {
        cy.intercept('GET', '/api/product/lastcatalog', '9');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }]);
        cy.visit('http://localhost:4200/products/add')

        cy.changeLanguage('nl');
        cy.get("input[name=product-name-input]").type('Bla bla bla');
        cy.get('mat-select[name=category-id-select]').click().get('mat-option').contains('TestCategory').click();
        cy.get("button[name=save-product-button]").click();

        cy.get("snack-bar-container").contains('Beschrijving is verplicht');
    });



    it('Should set catalog number to 10', () => {
        cy.intercept('GET', '/api/product/lastcatalog', '9');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }]);
        cy.visit('http://localhost:4200/products/add')

        cy.get("input[name=catalog-number-input]").should('have.value', '10');
    });

    it('Should have two categories', () => {
        cy.intercept('GET', '/api/product/lastcatalog', '9');
        cy.intercept('GET', '/api/category', [{ id: 1, name: 'TestCategory' }, { id: 2, name: 'TestCategory2' }]);
        cy.visit('http://localhost:4200/products/add')

        cy.get('mat-select[name=category-id-select]').click({ force: true })

        cy.get("mat-option").should('have.length', '2');
    });

    it('Should POST the correct json', () => {
        const productName = chance.name();
        const catalogusNumber = chance.d10();
        const category = chance.d4();
        const productLocation = chance.sentence();
        const productDescription = chance.paragraph();
        const requiresApproval = chance.bool();
        cy.intercept('GET', '/api/product/lastcatalog', '9');
        cy.intercept('GET', '/api/category', [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }, { id: 4, name: '4' }]);
        cy.intercept('POST', '/api/product', {}).as('addProductRequest');
        cy.visit('http://localhost:4200/products/add');
        cy.changeIsMenuOpened(false);



        cy.get("input[name=product-name-input]").type(productName);
        cy.get("input[name=catalog-number-input]").clear();
        cy.get("input[name=catalog-number-input]").type(catalogusNumber);
        cy.get('mat-select[name=category-id-select]').click().get('mat-option').contains(category).click();
        cy.get("input[name=product-location-input]").type(productLocation);
        cy.get("textarea[name=description-textarea]").type(productDescription);

        if (requiresApproval) {
            cy.get("mat-checkbox[name=requires-approval-checkbox]").click();
        }
        cy.get('button[name=save-product-button]').click();
        cy.wait('@addProductRequest').then((interception) => {
            const expectedValue = {
                categoryId: category,
                catalogNumber: catalogusNumber,
                description: productDescription,
                images: [],
                location: productLocation,
                name: productName,
                requiresApproval: requiresApproval
            };

            expect(JSON.stringify(interception.request.body)).equal(JSON.stringify(expectedValue));
        });

        cy.url().should('not.include', 'product/add');
    });
});
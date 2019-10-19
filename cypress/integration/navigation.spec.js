/// <reference types="Cypress" />

context('Navigation', () => {
  it('loads outbound form', () => {
    cy.visit('/outbound');
    cy.findByLabelText('email');
  });
});

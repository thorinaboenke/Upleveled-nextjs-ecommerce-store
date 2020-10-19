describe('Simple Website Navigation Test', () => {
  it('Header Navigation works', () => {
    cy.visit('http://localhost:3000');
    cy.contains('High quality second hand droids');
    cy.get('[data-cy=header-link-products]').click();
    cy.get('h1').should(($h1) => {
      expect($h1).to.contain('Shop');
    });
    cy.get('[data-cy=header-link-cart]').click();
    cy.get('h1').should(($h1) => {
      expect($h1).to.contain('Shopping Cart');
    });
    cy.get('[data-cy=header-link-checkout]').click();
    cy.get('h1').should(($h1) => {
      expect($h1).to.contain('Checkout');
    });
    cy.get('[data-cy=header-link-home]').click();
    cy.get('h1').should(($h1) => {
      expect($h1).to.contain("We have the droids you're looking for!");
    });
  });
});

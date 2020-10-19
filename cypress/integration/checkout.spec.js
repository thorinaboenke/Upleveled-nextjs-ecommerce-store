describe('Simple Website Navigation Test', () => {
  it('Checkout process works', () => {
    cy.visit('http://localhost:3000/products/1');
    // add 1  item to the cart
    cy.get('form').first().submit();
    // check item counter in header

    // got to checkout page
    cy.get('[data-cy=header-link-checkout]').click();
    cy.get('h1').should(($h1) => {
      expect($h1).to.contain('Checkout');
    });
    cy.get('[data-cy=header-items-in-cart]').should(($items) => {
      expect($items).to.contain('1');
    });
    cy.get('button').click();
    // check for error messages
    cy.get('.error').should('have.length', 11);

    cy.get('input').eq(0).type('Leia');
    cy.get('input').eq(1).type('Organa');
    cy.get('input').eq(2).type('leia');
    // check for email error messages
    cy.contains('Invalid email address');

    cy.get('input').eq(2).type('leia@organa.com');
    cy.get('input').eq(3).type('Examplestreet 1');
    cy.get('input').eq(4).type('1234');
    cy.get('input').eq(5).type('Examplecity');
    cy.get('input').eq(6).type('Examplecountry');
    cy.get('input').eq(7).type('5500 0000 0000 0004');
    cy.get('input').eq(8).type('11/25');
    cy.get('input').eq(9).type('1');
    cy.contains('Must be exactly 3 digits');
    cy.get('input').eq(9).type('23');
    cy.get('input').eq(10).check();
    cy.get('button').click();
    cy.contains('Thank you for your purchase');
  });
});

describe('Simple Website Navigation Test', () => {
  it('Adding and Removing Item from Cart works ', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=header-link-products]').click();
    cy.get('h1').should(($h1) => {
      expect($h1).to.contain('Shop');
    });
    // add 1 of the first item to the cart
    cy.get('form').first().submit();
    // check item counter in header
    cy.get('[data-cy=header-items-in-cart]').should(($items) => {
      expect($items).to.contain(1);
    });
    // got to cart page
    cy.get('[data-cy=header-link-cart]').click();
    cy.get('h1').should(($h1) => {
      expect($h1).to.contain('Shopping Cart');
    });
    // check item in cart
    cy.get('[data-cy=cart-items-in-cart]').should(($itemsincart) => {
      expect($itemsincart).to.contain('Items: 1');
    });
    // update item in cart
    cy.get('input').clear().type(3);
    // check item in cart
    cy.get('[data-cy=cart-items-in-cart]').should(($itemsincart) => {
      expect($itemsincart).to.contain('Items: 3');
    });
    // remove item from cart
    cy.contains('Remove').click();
    // check that cart is empty
    cy.get('[data-cy=header-items-in-cart]').should(($items) => {
      expect($items).to.contain(0);
    });
    cy.contains('Your Cart is empty');
  });
});

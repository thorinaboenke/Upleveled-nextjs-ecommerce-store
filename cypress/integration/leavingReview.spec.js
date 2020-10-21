describe('Review Test', () => {
  it('Leaving, editing and deleting review works', () => {
    cy.visit('http://localhost:3000/products/1');
    // click leave review button
    cy.get('[data-cy=button-leave-review]').click();
    cy.get('[data-cy=leave-review-form]');
    cy.get('[data-cy=button-cancel]').click();
    cy.get('[data-cy=button-leave-review]').click();
    // selects Radio button for 2
    cy.get('input').eq(3).click();
    cy.get('textarea').type('Good Stuff');
    cy.get('[data-cy=button-send]').click();
    cy.contains('★★☆☆☆');
    cy.contains('Good Stuff');
    cy.get('[data-cy=button-edit-or-cancel]').click();
    cy.get('[data-cy=edit-review-rating]').clear();
    cy.get('[data-cy=edit-review-rating]').type('3');
    cy.get('[data-cy=edit-review-textfield]').type('! Great!');
    cy.get('[data-cy=button-save-changes]').click();
    cy.contains('★★★☆☆');
    cy.contains('Good Stuff! Great!');
    cy.get('[data-cy=button-edit-or-cancel]').click();
    cy.get('[data-cy=button-delete]').click();
  });
});

describe('Message History Test', () => {
  it('should display the message history in General Chat', () => {
    cy.login();
    cy.contains('#General Chat').click();

    cy.get('.ant-list-item').should('be.visible');
    cy.get('h4').should('contain', 'Test User 1');
    cy.get('.ant-list-item-meta-description').should('contain', 'Hello, this is a test message!');
  });
});

describe('New Message Test', () => {
  it('should send a message successfully', () => {
    cy.login();
    cy.get('textarea').should('be.visible').type('Hello, this is a test message! from e2e.');
    cy.get('button[name=send]').click();
    cy.contains('Hello, this is a test message!');
  });
});

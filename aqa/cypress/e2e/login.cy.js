describe('Login Test', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('reviewer@example.com');
    cy.get('input[name=password]').type('review123');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/chatroom');
    cy.contains('Login successful!');
  });
});

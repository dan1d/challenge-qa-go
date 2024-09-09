describe('Login Test', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('/login');
    cy.pause();
    cy.get('input[name=email]').type('reviewer@example.com');
    cy.get('input[name=password]').type('review123');
    cy.get('button[type=submit]').click();
    cy.contains('Login successful!');
    cy.url().should('include', '/chatroom');
  });

  it('should display an error message with invalid credentials (wrong password)', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('reviewer@example.com');
    cy.get('input[name=password]').type('wrongpassword');
    cy.get('button[type=submit]').click();
    cy.contains('Invalid email or password');
    cy.url().should('include', '/login');
  });

  it('should display an error message with invalid credentials (wrong email)', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('wrongemail@example.com');
    cy.get('input[name=password]').type('review123');
    cy.get('button[type=submit]').click();
    cy.contains('Invalid email or password');
    cy.url().should('include', '/login');
  });
});

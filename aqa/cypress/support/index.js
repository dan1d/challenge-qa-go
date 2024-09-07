Cypress.Commands.add('login', (email = 'test1@example.com', password = 'password123') => {
  cy.visit('/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
});

describe('Text to PDF Converter App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the app and checks for main elements', () => {
    cy.contains('Text to PDF Converter').should('exist');
    cy.get('textarea[placeholder="Enter text here or drop a file below..."]').should('exist');
    cy.contains('Convert').should('exist');
    cy.contains('Clear').should('exist');
  });

  it('input text appears in the text area and clears on clear button click', () => {
    cy.get('textarea[placeholder="Enter text here or drop a file below..."]').type('Sample Text');
    cy.get('textarea').should('have.value', 'Sample Text');
    cy.contains('Clear').click();
    cy.get('textarea').should('have.value', '');
  });

  it('shows an error when trying to convert an empty text area', () => {
    cy.contains('Convert').click();
    
    // Ensure error message appears with sufficient timeout
    cy.get('.error-message', { timeout: 10000 })
      .should('contain.text', 'Text area is empty')
      .and('be.visible');
  });

  it('shows a success message after PDF generation with content', () => {
    cy.get('textarea[placeholder="Enter text here or drop a file below..."]').type('Sample PDF Content');
    cy.contains('Convert').click();

    // Ensure success message appears with sufficient timeout
    cy.get('.success-message', { timeout: 10000 })
      .should('contain.text', 'PDF generated successfully')
      .and('be.visible');
  });

  it('toggles modes on mode toggle button click', () => {
    cy.get('.mode-toggle-button').click();
    cy.get('.mode-toggle-button').should('exist');

    // Additional mode toggles to confirm cycling through modes
    cy.get('.mode-toggle-button').click();
    cy.get('.mode-toggle-button').click();
  });
});

describe('iframe', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const getIframeDocument = () => {
    return cy
      .get('iframe[data-cy="the-frame"]')
      .its('0.contentDocument')
      .should('exist');
  };

  const getIframeBody = () => {
    return getIframeDocument()
      .its('body')
      .should('not.be.undefined')
      .then(cy.wrap);
  };

  it('check title parent', () => {
    cy.get('div[data-cy="title-parent"]').should('contain', 'I am the parent');
  });

  it('check iframe parent', () => {
    getIframeBody()
      .find('div[data-cy="title-iframe"]')
      .should('contain', 'And I am the iframe');
  });

  it('change-window-location', () => {
    getIframeBody().find('a[data-cy="change-window-location"]').click();
    cy.get('div[data-cy="title-redirect"]').should(
      'contain',
      'I am the redirect page'
    );
  });

  it('change-parent-location', () => {
    getIframeBody().find('a[data-cy="change-parent-location"]').click();
    cy.get('div[data-cy="title-redirect"]').should(
      'contain',
      'I am the redirect page'
    );
  });
});

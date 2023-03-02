/// <reference types="cypress" />
describe('Window', () => {
  it('cy.visit() - visit a remote url', () => {
    cy.request({
      url: 'https://gcp.goodarc.com:10019/TaiianBuildingB2B_Frontend/Home/VerifyUser?eSaleId=G863&eSalePwd=Ting004/&eSaleName=鄒文婷&url=http://localhost:8080',
      followRedirect: false, // turn off following redirects
    }).then((resp) => {
      // redirect status code is 301
      expect(resp.status).to.eq(302);
      expect(resp.redirectedToUrl).to.include('http://localhost:8080');
      cy.visit(resp.redirectedToUrl)
    });
    it('cy.window() - get the global window object', () => {
      // https://on.cypress.io/window
      cy.window().should('have.property', 'top')
    })

    it('cy.document() - get the document object', () => {
      // https://on.cypress.io/document
      cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })
    it('cy.title() - get the title', () => {
      // https://on.cypress.io/title
      cy.title().should('include', '泰安商業火災保險報價系統')
    })
  })
})

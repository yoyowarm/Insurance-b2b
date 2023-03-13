describe('Window', () => {
  it('cy.visit() - visit a remote url', () => {
    cy.request({
      url: 'https://gcp.goodarc.com:10056/api/User/Login?eSaleId=H338&eSalePwd=Aann.009&url=http://localhost:8081',
      followRedirect: false, // turn off following redirects
    }).then((resp) => {
      // redirect status code is 302
      expect(resp.status).to.eq(302);
      expect(resp.redirectedToUrl).to.include('http://localhost:8081');
      cy.visit(resp.redirectedToUrl)
      cy.get('[data-cy="activity-quotation"] > .nav-item').click()
      cy.get(':nth-child(1) > .column-6 > [data-cy="industry0"] > label > .icon').click()
      cy.get('[data-cy="詢問表"]').click()
      cy.get('[data-cy="填寫完成"]').click()
      cy.get('[data-cy="詢問表"]').invoke('text').should('include', '填寫詢問表(+3%)')
    });
  })

})
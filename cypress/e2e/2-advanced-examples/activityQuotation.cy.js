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
      cy.get('[data-cy="activityName"] > [data-cy="input"]').type('測試活動')
      cy.get('[data-cy="number"] > [data-cy="input"]').type(200)
      cy.get('[data-cy="county"] > [data-cy="select"]').select('基隆市')
      cy.get('[data-cy="area"] > [data-cy="select"]').select('仁愛區')
      cy.get('[data-cy="address"] > [data-cy="input"]').type('測試地址')
      cy.get(':nth-child(1) > .input > [data-v-c03f8284=""] > [data-cy="input"]').type(200)
      cy.get('[data-cy="calculateAmount"]').click()
      cy.get(':nth-child(4) > .button').click()
      cy.get('[data-cy="name"] > [data-cy="input"]').click().type('e2e測試')
      cy.get('[data-cy="id"] > [data-cy="input"]').click().type('A111111111')
      cy.get('[data-cy="mobile"] > [data-cy="input"]').click().type('0910234561')
      cy.get(':nth-child(3) > :nth-child(1) > .input > [data-cy="select-group"] > [data-cy="select"]').select('基隆市')
      cy.get(':nth-child(3) > :nth-child(2) > .input > [data-cy="select-group"] > [data-cy="select"]').select('仁愛區')
      cy.get('.address > .input > div.w-full > [data-cy="input"]').type('測試地址')
      cy.get('.title > .items-center > .flex').click()
      cy.get('.mt-8 > :nth-child(2)').click()
    });
  })

})
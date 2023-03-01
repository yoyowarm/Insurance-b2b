import Pagination from '../../src/components/pagination.vue'

describe('<Pagination />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Pagination)
    cy.get('.page').should('have.text', 1)
  })
})
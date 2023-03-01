import DynamicLink from '../../src/components/DynamicLink.vue'

describe('<DynamicLink />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(DynamicLink)
  })
})
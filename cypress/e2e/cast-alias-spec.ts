describe('casting an aliased value', () => {
  it('yields a number', () => {
    // this particular alias keeps a number
    cy.wrap(42).as('magic')
    cy.get<number>('@magic').then((n) => {
      expect(n).to.be.a('number').and.to.equal(42)
    })
  })
})

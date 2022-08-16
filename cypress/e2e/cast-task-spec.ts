describe('yield data from cy.task', () => {
  it('gets a number', () => {
    // this particular cy.task yields a number
    cy.task<number>('getNumber').then((n) => {
      expect(n).to.be.a('number')
    })
  })
})

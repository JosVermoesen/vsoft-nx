describe('vsoft-interfaces', () => {
  beforeEach(() => cy.visit('/iframe.html?id=slidercomponent--primary&knob-nxAmount=49'));

  it('should render the component', () => {
    cy.get('vsoft-nx-slider').should('exist');
  });
});

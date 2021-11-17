describe("Search form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("input is blank", () => {
    cy.get(".form-control").should("have.value", "");
  });

  const inputText = "Iron Man";
  it("accepts input", () => {
    cy.get(".form-control").type(inputText).should("have.value", inputText);
  });

  it("form submit and get searched films", () => {
    cy.get(".form-control").type(inputText).type("{enter}");
    cy.get(".film-card__title")
      .should("have.length", 3)
      .each(($el) => {
        expect($el).to.contain(inputText);
      });
  });

  it("open film info with current film information", () => {
    cy.get(".form-control").type(inputText).type("{enter}");
    cy.get(".film-card").first().click();

    cy.get(".film-article__title").should("contain", inputText);
    cy.get(".film-article__subtitle").should(
      "contain",
      "Action, Science Fiction, Adventure"
    );

    cy.get(".film-article__meta").first().should("contain", "2008");
    cy.get(".film-article__meta").last().should("contain", "2h 6min");
    cy.get(".film-article__text").should(
      "contain",
      "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil."
    );
  });
});

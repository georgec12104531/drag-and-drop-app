describe("Drag and drop test", () => {
  it("drag and drop test", () => {
    cy.visit("http://localhost:3000/");

    cy.get("#0_1").trigger("dragstart");
    // cy.wait(5000);
    cy.get("#1_1").trigger("dragenter");
    // cy.get("#1_1").trigger("drop");
  });
});

describe("Drag and drop test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("dragging from non-draggable cards should do nothing", () => {
    // Move top row
    // expect nothing to happen
    cy.get("#3_0").trigger("dragstart");
    cy.get("#3_1").trigger("dragenter");
    cy.get("#3_1")
      .invoke("text")
      .should((text) => {
        expect(text).to.eq("");
      });

    // Moving reward into a row that isn't in the same swimlane
    cy.get("#0_1");
    cy.get("#0_1").trigger("dragstart");
    cy.get("#1_2").trigger("dragenter");
    cy.get("#1_2")
      .invoke("text")
      .should((text) => {
        expect(text).to.eq("");
      });
  });

  it("basic drag and drop functionality", () => {
    // Moving reward into a row that is in the same swimlane from reward source
    cy.get("#0_1");
    cy.get("#0_1").trigger("dragstart");
    cy.get("#1_1").trigger("dragenter");

    cy.get("#0_1")
      .invoke("text")
      .then((text1) => {
        cy.get("#1_1")
          .invoke("text")
          .should((text2) => {
            expect(text1).to.eq(text2);
          });
      });

    // Moving existing reward to a different category in the same swim lane (not from reward source)
    cy.get("#1_1").trigger("dragstart");
    cy.get("#2_1").trigger("dragenter");
    cy.get("#1_1")
      .invoke("text")
      .then((text1) => {
        cy.get("#2_1")
          .invoke("text")
          .should((text2) => {
            expect(text1).not.to.eq(text2);
          });
      });

    // Previous reward position should now be empty
    cy.get("#1_1")
      .invoke("text")
      .should((text) => {
        expect(text).to.eq("");
      });
  });

  it("cards inside the swimlane should be able to be removed", () => {
    // Remove card, card should be empty
    cy.get("#0_2").trigger("dragstart");
    cy.get("#2_2").trigger("dragenter");

    cy.get("#2_2 .remove").click();
    cy.get("#2_2")
      .invoke("text")
      .should((text) => {
        expect(text).to.eq("");
      });
  });

  it("Clicking the undo button should show the previous state of the reward swimlanes", () => {
    cy.get("#0_3")
      .invoke("text")
      .then((text) => {
        cy.get("#0_3").trigger("dragstart");
        cy.get("#1_3").trigger("dragenter");
        cy.get("#1_3").trigger("dragstart");
        cy.get("#2_3").trigger("dragenter");
        cy.get("#2_3").trigger("dragstart");
        cy.get("#3_3").trigger("dragenter");
        cy.get("#3_3 .remove").click();
        cy.get(".undo-button").click();

        cy.get("#3_3")
          .invoke("text")
          .should((text2) => {
            expect(text).to.eq(text2);
          });
      });
  });
});

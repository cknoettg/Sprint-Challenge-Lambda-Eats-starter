describe("Testing our form submission...", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000/pizza");
    });
    it("Testing our input values...", () => {
        //test for adding text to box
        cy.get('[id="special_instructions"]')
          .type("Testing 123")
          .should("have.value", "Testing 123");
        //test that you can select multiple toppings
        cy.get('[id="topping1"]')
            .should("not.be.checked");
        cy.get('[id="topping1"]')
            .check()
            .should("be.checked");
        cy.get('[id="topping2"]')
            .should("not.be.checked");
        cy.get('[id="topping2"]')
            .check()
            .should("be.checked");
        cy.get('[id="topping3"]')
            .should("not.be.checked");
        cy.get('[id="topping3"]')
            .check()
            .should("be.checked");
        cy.get('[id="topping4"]')
            .should("not.be.checked");
        cy.get('[id="topping4"]')
            .check()
            .should("be.checked");
        //test that form can be submitted
        cy.get('[id="name"]')
            .type("Corey");
        cy.get('[id="size"]')
            .select("M");
        cy.get("[id='submitter']").click();
        cy.get("[id='submitter']").should('not.be.disabled');
    }); //end of it statement
}); //end of describe
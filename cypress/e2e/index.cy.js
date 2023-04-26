describe("index", () => {
  it("should route the user to auth0 when clicking on the mainLink on the landing page", () => {
    cy.visit("https://dev.local:9000");
    cy.get("a.mainLink").click();
    cy.contains("button", "Connect with Kroger").should("exist");
  });
});

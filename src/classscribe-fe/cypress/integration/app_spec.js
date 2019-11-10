import { isIterable } from "core-js";

describe("Test React form", () => {
    const lead_registration = {
        username: "bfb3ab1",
        email: "1234ds@virginia.edu",
        password1: "B123F763$$",
        password2: "B123F763$$",
        first_name: "Ben",
        last_name: "Brown",
        university: "George Mason University",
        type: "student"
    };
    const lead_login = {
        username: "bfb3ab1",
        password: "B123F763$$",
    };
    before(() => {
        cy.exec("npm run dev");
      });
    it("can visit react login form", ()=> {
        cy.visit("/login");
    })
    it("can visit react login form", ()=> {
        cy.visit("/registration");
    })
    it("should be able to test registration form", () => {
        cy.visit("/registration");
        
        cy
            .get('[type="text"]').eq(0)
            .type(lead_registration.first_name)
            .should("have.value", lead_registration.first_name)
        cy
            .get('[type="text"]').eq(1)
            .type(lead_registration.last_name)
            .should("have.value", lead_registration.last_name)
        cy
            .get('[type="email"]')
            .type(lead_registration.email)
            .should("have.value", lead_registration.email)
        cy
            .get('[type="password"]')
            .type(lead_registration.password1)
            .should("have.value", lead_registration.password1)   
        cy
            .get('[type="radio"]').eq(0)
            .click()
            .should("have.value", lead_registration.type)
        
        cy
            .get('[type="radio"]').eq(2)
            .click()
            .should("have.value", lead_registration.university)

        cy
            .get('[type="button"]').eq(1)
            .click()
    });
    it("should be able to test login form", () => {
        cy.visit("/login");
        
        cy
            .get('[type="text"]')
            .type(lead_login.username)
            .should("have.value", lead_login.username)
        cy
            .get('[type="password"]')
            .type(lead_login.password)
            .should("have.value", lead_login.password)   
        cy
            .get('[type="button"]').eq(1)
            .click()
    });
})
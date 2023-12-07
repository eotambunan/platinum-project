// import Home from '@/pages';
import { render, screen, waitFor } from "@testing-library/react";
import dataMocks from "../../__mocks__/dataMocks";
import Login from "@/pages/login/index";

jest.mock("next/router", () => require("next-router-mock"));

// 
describe("Page Login", () => {
    it("[+] Renders Page Login", async () => {
        render(<Login/>)
        
        const header1 = screen.getAllByText(dataMocks.page.login.header1)[0]
        expect(header1).toBeInTheDocument();

        const header2 = screen.getAllByText(dataMocks.page.login.header2)[0]
        expect(header2).toBeInTheDocument();

        const form1 = screen.getByPlaceholderText(dataMocks.page.login.form1)
        expect(form1).toBeInTheDocument();

        const form2 = screen.getAllByPlaceholderText(dataMocks.page.login.form2)[0]
        expect(form2).toBeInTheDocument();

        const form3 = screen.getAllByPlaceholderText(dataMocks.page.login.form3)[0]
        expect(form3).toBeInTheDocument();

        const form4 = screen.getByPlaceholderText(dataMocks.page.login.form4)
        expect(form4).toBeInTheDocument();

    });
        

    it("[-] Renders Page HomePage", () => {
    });
});

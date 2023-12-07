// import Home from '@/pages';
import { render, screen, waitFor } from "@testing-library/react";
import dataMocks from "../../__mocks__/dataMocks";
import HomePage from "@/pages/homepage/HomePage";
import GlobalContext from "../../src/context/GlobalContext";

jest.mock("next/router", () => require("next-router-mock"));

const customRender = (component, {providerProps, ...renderOption})=>{
    return render(
        <GlobalContext.Provider {...providerProps}>
            {component}
        </GlobalContext.Provider>,
        renderOption
    )
}

describe("Page Home", () => {
    it("[+] Renders Page HomePage Login Condition", async () => {
        const providerProps={
            value : {
                isLogin : true
            }
        }
        customRender(<HomePage/>,{providerProps})
        
        const logButton = screen.getByRole("button",{
            name : dataMocks.page.home.logButtonOut
        })
        expect(logButton).toBeInTheDocument()
        expect(logButton.textContent).toBe(dataMocks.page.home.logButtonOut)

        const heading = screen.getByRole("heading", {
            name: dataMocks.page.home.heading,
        });
        expect(heading).toBeInTheDocument();
    
        const description = screen.getByText(dataMocks.page.home.description)
        expect(description).toBeInTheDocument()
        expect(description.textContent).toBe(dataMocks.page.home.description)
    
        const heading2 = screen.getByRole("heading",{
            name : dataMocks.page.home.heading2,
        })
        expect(heading2).toBeInTheDocument()
    
        const description2= screen.getByText(dataMocks.page.home.description2)
        expect(description2).toBeInTheDocument()
        expect(description2.textContent).toBe(dataMocks.page.home.description2)

        const image = screen.getByTestId(dataMocks.page.home.image1)
        expect(image).toBeInTheDocument()
    });
    it("[+] Renders Page HomePage LogOut Condition", async () => {
        const providerProps={
            value : {
                isLogin : false
            }
        }
        customRender(<HomePage/>,{providerProps})
        
        const logButton = screen.getByRole("button",{
            name : dataMocks.page.home.logButtonIn
        })
        expect(logButton).toBeInTheDocument()
        expect(logButton.textContent).toBe(dataMocks.page.home.logButtonIn)

    });

        

    it("[-] Renders Page HomePage", () => {
        const providerProps={
            value : {
                isLogin : true
            }
        }
        customRender(<HomePage/>,{providerProps})
        const heading = screen.getByRole("heading", {
            name: dataMocks.page.home.heading,
        });

        expect(heading.textContent).not.toBe("Ini Content Harusnya tidak ada");
    });
});

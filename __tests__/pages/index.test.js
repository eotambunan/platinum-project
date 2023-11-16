import Home from '@/pages';
import { render, screen } from '@testing-library/react';
import dataMocks from '../../__mocks__/dataMocks';

describe("Page Home", () => {

    it("[+] Renders Page Home", () => {
        render(<Home/>)

        const heading = screen.getByRole("heading", {
            name: dataMocks.page.home.heading
        });
        expect(heading).toBeInTheDocument();
    })

    it("[-] Renders Page Home", () => {
        render(<Home/>)

        const heading = screen.getByRole("heading", {
            name: dataMocks.page.home.heading
        });

        expect(heading.textContent).not.toBe("Ini Content Harusnya tidak ada");
    })
})
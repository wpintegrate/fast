import { customElement, DOM } from "@microsoft/fast-element";
import { expect } from "chai";
import { fixture } from "../fixture";
import { ListboxOption } from "../listbox-option/listbox-option";
import { ListboxOptionTemplate as itemTemplate } from "../listbox-option/listbox-option.template";
import { Listbox, ListboxTemplate as template } from "./index";

@customElement({
    name: "fast-listbox",
    template,
})
class FASTListbox extends Listbox {}

// TODO: Need to add tests for keyboard handling & focus management
describe("Listbox", () => {
    @customElement({
        name: "fast-option",
        template: itemTemplate,
    })
    class FASTListboxOption extends ListboxOption {}

    async function setup() {
        const { element, connect, disconnect } = await fixture<FASTListbox>(
            "fast-listbox"
        );

        const option1 = document.createElement("fast-option");
        (option1 as FASTListboxOption).textContent = "option 1";

        const option2 = document.createElement("fast-option");
        (option2 as FASTListboxOption).textContent = "option 2";

        const option3 = document.createElement("fast-option");
        (option3 as FASTListboxOption).textContent = "option 3";

        element.appendChild(option1);
        element.appendChild(option2);
        element.appendChild(option3);

        return { element, connect, disconnect, option1, option2, option3 };
    }

    it("should have a role of `listbox`", async () => {
        const { element, connect, disconnect } = await setup();

        await connect();

        expect(element.getAttribute("role")).to.equal("listbox");

        await disconnect();
    });

    it("should set the `aria-disabled` attribute equal to the `disabled` value", async () => {
        const { element, connect, disconnect } = await setup();

        element.disabled = true;

        await connect();

        expect(element.getAttribute("aria-disabled")).to.equal("true");

        element.disabled = false;

        await DOM.nextUpdate();

        expect(element.getAttribute("aria-disabled")).to.equal("false");

        await disconnect();
    });

    it("should have a tabindex of 0 when `disabled` is not defined", async () => {
        const { element, connect, disconnect } = await setup();

        await connect();

        expect(element.getAttribute("tabindex")).to.equal("0");

        await disconnect();
    });

    it("should NOT have a tabindex when `disabled` is true", async () => {
        const { element, connect, disconnect } = await setup();

        await connect();

        element.disabled = true;

        await DOM.nextUpdate();

        expect(element.getAttribute("tabindex")).to.equal(null);

        await disconnect();
    });
});

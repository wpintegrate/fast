import { attr, FASTElement, observable } from "@microsoft/fast-element";
import { StartEnd } from "../patterns/start-end";
import { applyMixins } from "../utilities/apply-mixins";
import { ListboxOptionRole } from "./listbox-option.options";

/**
 * An Option Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#option | ARIA menuitem }.
 *
 * @public
 */
export class ListboxOption extends FASTElement {
    index: number;
    public proxy: HTMLOptionElement;

    /**
     * The defaultSelected state of the option.
     * @public
     */
    @observable
    public defaultSelected: boolean = false;
    protected defaultSelectedChanged(): void {
        if (!this.dirtySelected) {
            this.selected = this.defaultSelected;
        }
    }

    /**
     * Tracks whether the "selected" property has been changed.
     * @internal
     */
    private dirtySelected: boolean = false;

    /**
     * The disabled state of the option.
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    @attr({ mode: "boolean" })
    public disabled: boolean;

    /**
     * The role of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: role
     */
    @attr
    public role: ListboxOptionRole = ListboxOptionRole.option;

    /**
     * The selected attribute value. This sets the initial selected value.
     *
     * @public
     * @remarks
     * HTML Attribute: selected
     */
    @attr({ attribute: "selected", mode: "boolean" })
    public selectedAttribute: boolean;
    protected selectedAttributeChanged(): void {
        this.defaultSelected = this.selectedAttribute;
    }

    /**
     * The checked state of the control.
     *
     * @public
     */
    @observable
    public selected: boolean = this.defaultSelected;
    protected selectedChanged(oldValue, newValue): void {
        if (this.$fastController.isConnected) {
            if (!this.dirtySelected) {
                this.dirtySelected = true;
            }

            if (this.proxy) {
                this.proxy.selected = this.selected;
            }

            this.classList.toggle("selected", oldValue !== newValue ? newValue : false);

            if (newValue) {
                this.$emit("change");
            }
        }
    }

    /**
     * The value attribute.
     * @public
     * @remarks
     * HTML Attribute: value
     */
    @attr({ attribute: "value", mode: "fromView" })
    public valueAttribute: string;

    public get label() {
        return this.value ? this.value : this.textContent ? this.textContent : "";
    }

    public get text(): string {
        return this.textContent ? this.textContent : this.value;
    }

    public get value(): string {
        return this.valueAttribute ? this.valueAttribute : this.textContent || "";
    }

    public set value(value) {
        if (this.proxy) {
            this.proxy.value = value;
        }
    }

    public get form(): HTMLFormElement | null {
        return this.proxy ? this.proxy.form : null;
    }

    public constructor() {
        super();
        this.proxy = new Option(
            this.text,
            this.value,
            this.defaultSelected,
            this.selected
        );
        this.proxy.disabled = this.disabled;
    }
}

/**
 * @internal
 */
export interface ListboxOption extends StartEnd {}
applyMixins(ListboxOption, StartEnd);

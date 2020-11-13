import { DI, InterfaceSymbol } from "../di";
import { FASTDesignTokenLibrary } from "./library";

// export interface DesignTokenConfig {
//     backgroundColor: string;
// }
//
// const defaults: DesignTokenConfig = {
//     backgroundColor: "#FFFFFF",
// };
//
// export const DefaultDesignTokens = new FASTDesignTokenLibrary<DesignTokenConfig>(
//     defaults
// );

export const DesignTokens: InterfaceSymbol<FASTDesignTokenLibrary<
    any
>> = DI.createDOMInterface<FASTDesignTokenLibrary<any>>("DesignTokens").noDefault();

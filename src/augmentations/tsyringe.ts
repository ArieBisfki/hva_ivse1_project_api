import {ValuesType} from "utility-types";
import {DI_TOKEN, DITokenProviderMap} from "../di/Registry";

declare module "tsyringe" {
    interface DependencyContainer {
        resolve<T extends ValuesType<typeof DI_TOKEN>>(token: T): DITokenProviderMap[T];
    }
}
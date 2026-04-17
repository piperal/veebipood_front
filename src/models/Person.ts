import type { Address } from "./Address"

export type Person = {
    id?:number,
    firstname:string,
    lastName:string,
    email:string,
    password:string,
    pesonalCode:string,
    address: Address
}
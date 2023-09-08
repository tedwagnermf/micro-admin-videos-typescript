import { InvalidUuidError, Uuid } from "./uuid.vo";
import {validate as uuidvalidate} from "uuid";

const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");
describe("Uuid Unit Tests", () => {
    test("should throw error when uuid is invalid", () => {
        expect(() => {
            new Uuid("invalid-uuid");
        }).toThrowError(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should create a valid uuid", () => {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(uuidvalidate(uuid.id)).toBe(true);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })

    test("should accept a valid uuid", () => {
        const uuid = new Uuid('9366b7dc-2d71-4799-b91c-c64adb205104');
        expect(uuid.id).toBe('9366b7dc-2d71-4799-b91c-c64adb205104');
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })
})
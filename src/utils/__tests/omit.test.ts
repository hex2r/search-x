import { test, expect, vi } from "vitest"
import { omit } from "../omit"

const func = {
  omit,
}

const testObject = {
  test: "value",
  "1": "value",
}

test("should omit key in object and return a new one", () => {
  const omitSpy = vi.spyOn(func, "omit")
  const omitObj = func.omit(testObject, "test")
  expect(omitSpy).toHaveBeenCalled()
  expect(Object.keys(omitObj).includes("test")).toBeFalsy()

  const secondOmitObj = func.omit(omitObj, "1")
  expect(omitSpy).toBeCalledTimes(2)
  expect(Object.keys(secondOmitObj).includes("1")).toBeFalsy()
  expect(Object.keys(secondOmitObj).length).toBe(0)
})

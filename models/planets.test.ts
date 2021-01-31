import { assertEquals } from "https://deno.land/std@0.85.0/testing/asserts.ts"

Deno.test({
    name: "example test",
    fn() {
        assertEquals("deno", "deno")
    }
})

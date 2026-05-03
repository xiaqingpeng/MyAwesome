package com.myawesome

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.myawesome.specs.NativeCalculatorSpec

class CalculatorModule(reactContext: ReactApplicationContext) :
    NativeCalculatorSpec(reactContext) {

    companion object {
        const val NAME = "Calculator"
    }

    override fun getName(): String = NAME

    override fun add(a: Double, b: Double, promise: Promise) {
        try {
            val result = a + b
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("CALCULATION_ERROR", "Failed to add numbers", e)
        }
    }

    override fun subtract(a: Double, b: Double, promise: Promise) {
        try {
            val result = a - b
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("CALCULATION_ERROR", "Failed to subtract numbers", e)
        }
    }

    override fun multiply(a: Double, b: Double, promise: Promise) {
        try {
            val result = a * b
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("CALCULATION_ERROR", "Failed to multiply numbers", e)
        }
    }

    override fun divide(a: Double, b: Double, promise: Promise) {
        try {
            if (b == 0.0) {
                promise.reject("DIVISION_BY_ZERO", "Cannot divide by zero")
                return
            }
            val result = a / b
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("CALCULATION_ERROR", "Failed to divide numbers", e)
        }
    }

    override fun getTypedExportedConstants(): Map<String, Any> {
        return mapOf(
            "PI" to Math.PI,
            "E" to Math.E
        )
    }
}

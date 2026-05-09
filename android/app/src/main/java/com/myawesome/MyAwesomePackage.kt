package com.myawesome

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class MyAwesomePackage : TurboReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            CalculatorModule.NAME -> CalculatorModule(reactContext)
            CacheManagerModule.NAME -> CacheManagerModule(reactContext)
            VersionInfoModule.NAME -> VersionInfoModule(reactContext)
            else -> null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            mapOf(
                CalculatorModule.NAME to ReactModuleInfo(
                    CalculatorModule.NAME,
                    "CalculatorModule",
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    true,  // isCxxModule
                    true   // isTurboModule
                ),
                CacheManagerModule.NAME to ReactModuleInfo(
                    CacheManagerModule.NAME,
                    "CacheManagerModule",
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    true,  // isCxxModule
                    true   // isTurboModule
                ),
                VersionInfoModule.NAME to ReactModuleInfo(
                    VersionInfoModule.NAME,
                    "VersionInfoModule",
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    true,  // isCxxModule
                    true   // isTurboModule
                )
            )
        }
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            CustomButtonManager(reactContext)
        )
    }
}

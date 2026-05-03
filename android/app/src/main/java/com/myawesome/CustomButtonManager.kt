package com.myawesome

import android.graphics.Color
import android.graphics.drawable.GradientDrawable
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.CustomButtonManagerInterface

@ReactModule(name = CustomButtonManager.NAME)
class CustomButtonManager(private val reactContext: ReactApplicationContext) :
    SimpleViewManager<CustomButtonView>(),
    CustomButtonManagerInterface<CustomButtonView> {

    companion object {
        const val NAME = "CustomButton"
    }

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): CustomButtonView {
        return CustomButtonView(reactContext)
    }

    @ReactProp(name = "text")
    override fun setText(view: CustomButtonView, text: String?) {
        view.setText(text ?: "")
    }

    @ReactProp(name = "color")
    override fun setColor(view: CustomButtonView, color: String?) {
        view.setButtonColor(color ?: "#007AFF")
    }

    @ReactProp(name = "disabled", defaultBoolean = false)
    override fun setDisabled(view: CustomButtonView, disabled: Boolean) {
        view.setDisabled(disabled)
    }

    @ReactProp(name = "cornerRadius", defaultInt = 8)
    override fun setCornerRadius(view: CustomButtonView, cornerRadius: Int) {
        view.setCornerRadius(cornerRadius.toFloat())
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return mapOf(
            "topPress" to mapOf("registrationName" to "onPress")
        )
    }
}

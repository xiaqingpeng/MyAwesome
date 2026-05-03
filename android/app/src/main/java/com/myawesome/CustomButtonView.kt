package com.myawesome

import android.graphics.Color
import android.graphics.drawable.GradientDrawable
import android.view.Gravity
import android.widget.Button
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

class CustomButtonView(private val reactContext: ReactContext) : Button(reactContext) {

    private var buttonColor: String = "#007AFF"
    private var cornerRadiusValue: Float = 8f
    private var isDisabled: Boolean = false

    init {
        // 设置默认样式
        gravity = Gravity.CENTER
        setTextColor(Color.WHITE)
        textSize = 16f
        setPadding(32, 24, 32, 24)
        
        // 设置点击监听
        setOnClickListener {
            if (!isDisabled) {
                onButtonPress()
            }
        }
        
        updateButtonStyle()
    }

    fun setText(text: String) {
        this.text = text
    }

    fun setButtonColor(color: String) {
        this.buttonColor = color
        updateButtonStyle()
    }

    fun setDisabled(disabled: Boolean) {
        this.isDisabled = disabled
        isEnabled = !disabled
        alpha = if (disabled) 0.5f else 1.0f
    }

    fun setCornerRadius(radius: Float) {
        this.cornerRadiusValue = radius
        updateButtonStyle()
    }

    private fun updateButtonStyle() {
        val drawable = GradientDrawable()
        drawable.shape = GradientDrawable.RECTANGLE
        drawable.cornerRadius = cornerRadiusValue * resources.displayMetrics.density
        
        try {
            drawable.setColor(Color.parseColor(buttonColor))
        } catch (e: IllegalArgumentException) {
            // 如果颜色解析失败，使用默认颜色
            drawable.setColor(Color.parseColor("#007AFF"))
        }
        
        background = drawable
    }

    private fun onButtonPress() {
        val event = Arguments.createMap()
        event.putDouble("timestamp", System.currentTimeMillis().toDouble())
        
        reactContext
            .getJSModule(RCTEventEmitter::class.java)
            .receiveEvent(id, "topPress", event)
    }
}

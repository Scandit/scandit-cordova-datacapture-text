/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.errors.JsonParseError
import com.scandit.datacapture.frameworks.text.TextCaptureModule
import org.apache.cordova.CallbackContext
import org.json.JSONArray
import org.json.JSONObject

class ActionInjectDefaults(
    private val textCaptureModule: TextCaptureModule
) : Action {

    @Suppress("DEPRECATION")
    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val defaults = textCaptureModule.getDefaults()
            val defaultsJson = JSONObject(
                mapOf(
                    "TextCapture" to defaults
                )
            )
            callbackContext.success(defaultsJson)
        } catch (e: Exception) {
            JsonParseError(e.message).sendResult(callbackContext)
        }
    }
}

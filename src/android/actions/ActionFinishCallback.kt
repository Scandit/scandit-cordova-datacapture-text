/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.errors.JsonParseError
import com.scandit.datacapture.cordova.core.utils.CordovaResult
import com.scandit.datacapture.frameworks.text.TextCaptureModule
import org.apache.cordova.CallbackContext
import org.json.JSONArray
import org.json.JSONException

class ActionFinishCallback(
    private val textCaptureModule: TextCaptureModule
) : Action {

    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val data = args.getJSONObject(0)
            val enabled = data.optBoolean("enabled", true)

            textCaptureModule.finishDidCapture(enabled, CordovaResult(callbackContext))
        } catch (e: JSONException) {
            JsonParseError(e.message).sendResult(callbackContext)
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            JsonParseError(e.message).sendResult(callbackContext)
        }
    }
}

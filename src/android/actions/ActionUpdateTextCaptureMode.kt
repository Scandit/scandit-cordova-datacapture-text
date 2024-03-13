/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.utils.CordovaResult
import com.scandit.datacapture.frameworks.text.TextCaptureModule
import org.apache.cordova.CallbackContext
import org.json.JSONArray

class ActionUpdateTextCaptureMode(private val textCaptureModule: TextCaptureModule) : Action {
    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        textCaptureModule.updateModeFromJson(args[0].toString(), CordovaResult(callbackContext))
    }
}

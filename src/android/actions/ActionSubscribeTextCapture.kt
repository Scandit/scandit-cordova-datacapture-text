/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.utils.CordovaEventEmitter
import com.scandit.datacapture.cordova.core.utils.CordovaResultKeepCallback
import com.scandit.datacapture.frameworks.text.TextCaptureModule
import com.scandit.datacapture.frameworks.text.listeners.FrameworksTextCaptureListener
import org.apache.cordova.CallbackContext
import org.json.JSONArray

class ActionSubscribeTextCapture(
    private val textCaptureModule: TextCaptureModule,
    private val eventEmitter: CordovaEventEmitter
) : Action {

    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        eventEmitter.registerCallback(
            FrameworksTextCaptureListener.ON_TEXT_CAPTURED_EVENT,
            callbackContext
        )
        textCaptureModule.addListener(CordovaResultKeepCallback(callbackContext))
    }
}

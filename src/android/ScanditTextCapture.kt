/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text

import android.Manifest
import com.scandit.datacapture.cordova.core.ScanditCaptureCore
import com.scandit.datacapture.cordova.core.communication.CameraPermissionGrantedListener
import com.scandit.datacapture.cordova.core.errors.InvalidActionNameError
import com.scandit.datacapture.cordova.core.factories.ActionFactory
import com.scandit.datacapture.cordova.core.handlers.ActionsHandler
import com.scandit.datacapture.cordova.core.handlers.CameraPermissionsActionsHandlerHelper
import com.scandit.datacapture.cordova.core.utils.CordovaEventEmitter
import com.scandit.datacapture.cordova.core.utils.CordovaNoopResult
import com.scandit.datacapture.cordova.text.factories.TextCaptureActionFactory
import com.scandit.datacapture.frameworks.text.TextCaptureModule
import com.scandit.datacapture.frameworks.text.listeners.FrameworksTextCaptureListener
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray

class ScanditTextCapture :
    CordovaPlugin(),
    CameraPermissionGrantedListener {

    private val eventEmitter = CordovaEventEmitter()
    private val textCaptureModule = TextCaptureModule(FrameworksTextCaptureListener(eventEmitter))

    private val actionFactory: ActionFactory =
        TextCaptureActionFactory(textCaptureModule, eventEmitter)
    private val actionsHandler: ActionsHandler = ActionsHandler(
        actionFactory, CameraPermissionsActionsHandlerHelper(actionFactory)
    )

    private var lastTextCaptureEnabledState: Boolean = false

    override fun onStop() {
        lastTextCaptureEnabledState = textCaptureModule.isModeEnabled()
        textCaptureModule.setModeEnabled(false, CordovaNoopResult())
    }

    override fun onStart() {
        textCaptureModule.setModeEnabled(lastTextCaptureEnabledState, CordovaNoopResult())
    }

    override fun onReset() {
        textCaptureModule.onDestroy()
        pluginInitialize()
    }

    override fun onDestroy() {
        textCaptureModule.onDestroy()
    }

    override fun pluginInitialize() {
        super.pluginInitialize()
        ScanditCaptureCore.addPlugin(serviceName)
        textCaptureModule.onCreate(cordova.context)

        if (cordova.hasPermission(Manifest.permission.CAMERA)) {
            onCameraPermissionGranted()
        }
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        return try {
            actionsHandler.addAction(action, args, callbackContext)
        } catch (e: InvalidActionNameError) {
            println(e)
            false
        } catch (e: Exception) {
            println(e)
            true
        }
    }

    //region CameraPermissionGrantedListener
    override fun onCameraPermissionGranted() {
        actionsHandler.onCameraPermissionGranted()
    }
    //endregion
}

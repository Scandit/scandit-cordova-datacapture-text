/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.factories

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.errors.InvalidActionNameError
import com.scandit.datacapture.cordova.core.factories.ActionFactory
import com.scandit.datacapture.cordova.core.utils.CordovaEventEmitter
import com.scandit.datacapture.cordova.text.actions.ActionApplyTextCaptureModeSettings
import com.scandit.datacapture.cordova.text.actions.ActionFinishCallback
import com.scandit.datacapture.cordova.text.actions.ActionInjectDefaults
import com.scandit.datacapture.cordova.text.actions.ActionSetModeEnabledState
import com.scandit.datacapture.cordova.text.actions.ActionSubscribeTextCapture
import com.scandit.datacapture.cordova.text.actions.ActionUpdateTextCaptureMode
import com.scandit.datacapture.cordova.text.actions.ActionUpdateTextCaptureOverlay
import com.scandit.datacapture.frameworks.text.TextCaptureModule

class TextCaptureActionFactory(
    private val textCaptureModule: TextCaptureModule,
    private val eventEmitter: CordovaEventEmitter
) : ActionFactory {

    @Throws(InvalidActionNameError::class)
    override fun provideAction(actionName: String): Action {
        return when (actionName) {
            INJECT_DEFAULTS -> createActionInjectDefaults()
            SUBSCRIBE_TEXT_CAPTURE -> createActionSubscribeTextCapture()
            FINISH_BLOCKING_ACTION -> createActionFinishBlocking()
            ACTION_UPDATE_TC_MODE -> createActionUpdateTextCaptureMode()
            ACTION_APPLY_TC_MODE_SETTINGS -> createActionApplyTextCaptureModeSettings()
            ACTION_UPDATE_TC_OVERLAY -> createActionUpdateTextCaptureOverlay()
            ACTION_SET_TC_ENABLED_STATE -> createActionSetModeEnabledState()
            else -> throw InvalidActionNameError(actionName)
        }
    }

    override fun canBeRunWithoutCameraPermission(actionName: String): Boolean =
        actionName !in ACTIONS_REQUIRING_CAMERA

    private fun createActionInjectDefaults(): Action = ActionInjectDefaults(textCaptureModule)

    private fun createActionSubscribeTextCapture() =
        ActionSubscribeTextCapture(textCaptureModule, eventEmitter)

    private fun createActionFinishBlocking() = ActionFinishCallback(textCaptureModule)

    private fun createActionUpdateTextCaptureMode() = ActionUpdateTextCaptureMode(textCaptureModule)

    private fun createActionUpdateTextCaptureOverlay() =
        ActionUpdateTextCaptureOverlay(textCaptureModule)

    private fun createActionApplyTextCaptureModeSettings() =
        ActionApplyTextCaptureModeSettings(textCaptureModule)

    private fun createActionSetModeEnabledState() = ActionSetModeEnabledState(textCaptureModule)

    companion object {
        private const val INJECT_DEFAULTS = "getDefaults"
        private const val SUBSCRIBE_TEXT_CAPTURE = "subscribeTextCaptureListener"
        private const val FINISH_BLOCKING_ACTION = "finishCallback"

        private const val ACTION_UPDATE_TC_MODE = "updateTextCaptureMode"
        private const val ACTION_APPLY_TC_MODE_SETTINGS = "applyTextCaptureModeSettings"
        private const val ACTION_UPDATE_TC_OVERLAY = "updateTextCaptureOverlay"
        private const val ACTION_SET_TC_ENABLED_STATE = "setModeEnabledState"

        private val ACTIONS_REQUIRING_CAMERA =
            setOf(
                ACTION_APPLY_TC_MODE_SETTINGS,
                ACTION_UPDATE_TC_MODE,
                ACTION_UPDATE_TC_OVERLAY
            )
    }
}

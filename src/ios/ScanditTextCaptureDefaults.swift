import ScanditTextCapture

struct ScanditTextCaptureDefaults: Encodable {
    typealias CameraSettingsDefaults = ScanditCaptureCoreDefaults.CameraSettingsDefaults

    struct TextCaptureOverlayDefaults: Encodable {
        let defaultBrush: ScanditCaptureCoreDefaults.BrushDefaults

        enum CodingKeys: String, CodingKey {
            case defaultBrush = "DefaultBrush"
        }
    }

    struct TextCaptureSettingsDefaults: Encodable {
        let recognitionDirection: String
        let duplicateFilter: Double
    }

    struct TextCaptureDefaultsContainer: Encodable {
        let textCaptureOverlay: TextCaptureOverlayDefaults
        let textCaptureSettings: TextCaptureSettingsDefaults
        let recommendedCameraSettings: CameraSettingsDefaults

        enum CodingKeys: String, CodingKey {
            case textCaptureOverlay = "TextCaptureOverlay"
            case textCaptureSettings = "TextCaptureSettings"
            case recommendedCameraSettings = "RecommendedCameraSettings"
        }
    }

    let textCapture: TextCaptureDefaultsContainer

    init(textCaptureSettings: TextCaptureSettings, overlay: TextCaptureOverlay) {
        self.textCapture = TextCaptureDefaultsContainer.from(textCaptureSettings, overlay)
    }

    enum CodingKeys: String, CodingKey {
        case textCapture = "TextCapture"
    }
}

extension ScanditTextCaptureDefaults.TextCaptureDefaultsContainer {
    static func from(_ settings: TextCaptureSettings,
                     _ overlay: TextCaptureOverlay) -> ScanditTextCaptureDefaults.TextCaptureDefaultsContainer {
        let textCaptureOverlay = ScanditTextCaptureDefaults.TextCaptureOverlayDefaults.from(overlay)
        let textCaptureSettings = ScanditTextCaptureDefaults.TextCaptureSettingsDefaults.from(settings)
        let cameraSettings = ScanditCaptureCoreDefaults
            .CameraSettingsDefaults.from(TextCapture.recommendedCameraSettings)
        return ScanditTextCaptureDefaults.TextCaptureDefaultsContainer(textCaptureOverlay: textCaptureOverlay,
                                                                       textCaptureSettings: textCaptureSettings,
                                                                       recommendedCameraSettings: cameraSettings)
    }
}

extension ScanditTextCaptureDefaults.TextCaptureOverlayDefaults {
    static func from(_ overlay: TextCaptureOverlay) -> ScanditTextCaptureDefaults.TextCaptureOverlayDefaults {
        let brush = ScanditCaptureCoreDefaults.BrushDefaults.from(TextCaptureOverlay.defaultBrush)
        return ScanditTextCaptureDefaults.TextCaptureOverlayDefaults(defaultBrush: brush)
    }
}

extension ScanditTextCaptureDefaults.TextCaptureSettingsDefaults {
    static func from(_ settings: TextCaptureSettings) ->
        ScanditTextCaptureDefaults.TextCaptureSettingsDefaults {
            return ScanditTextCaptureDefaults.TextCaptureSettingsDefaults(
                recognitionDirection: settings.recognitionDirection.jsonString,
                duplicateFilter: settings.duplicateFilter)
    }
}

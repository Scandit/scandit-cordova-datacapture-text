import ScanditTextCapture

extension ScanditTextCapture: TextCaptureDeserializerDelegate {
    public func textCaptureDeserializer(_ deserializer: TextCaptureDeserializer,
                                        didStartDeserializingMode mode: TextCapture,
                                        from jsonValue: JSONValue) {
        // Empty on purpose
    }

    public func textCaptureDeserializer(_ deserializer: TextCaptureDeserializer,
                                        didFinishDeserializingMode mode: TextCapture,
                                        from jsonValue: JSONValue) {
        mode.isEnabled = jsonValue.bool(forKey: "enabled")

        mode.addListener(self)
    }

    public func textCaptureDeserializer(_ deserializer: TextCaptureDeserializer,
                                        didStartDeserializingSettings settings: TextCaptureSettings,
                                        from jsonValue: JSONValue) {
        // Empty on purpose
    }

    public func textCaptureDeserializer(_ deserializer: TextCaptureDeserializer,
                                        didFinishDeserializingSettings settings: TextCaptureSettings,
                                        from jsonValue: JSONValue) {
        // Empty on purpose
    }

    public func textCaptureDeserializer(_ deserializer: TextCaptureDeserializer,
                                        didStartDeserializingOverlay overlay: TextCaptureOverlay,
                                        from jsonValue: JSONValue) {
        // Empty on purpose
    }

    public func textCaptureDeserializer(_ deserializer: TextCaptureDeserializer,
                                        didFinishDeserializingOverlay overlay: TextCaptureOverlay,
                                        from jsonValue: JSONValue) {
        // Empty on purpose
    }
}

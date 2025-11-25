import { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

export default function CompactTimer(props) {
    const [timeRemaining, setTimeRemaining] = useState(props.durationSeconds)

    useEffect(() => {
        if (timeRemaining <= 0) return

        const interval = setInterval(() => {
            setTimeRemaining((prev) => Math.max(0, prev - 1))
        }, 1000)

        return () => clearInterval(interval)
    }, [timeRemaining])

    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    const percentage = (timeRemaining / props.durationSeconds) * 100

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: props.fontFamily,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: props.gap,
                    background: props.backgroundColor,
                    padding: `${props.paddingVertical}px ${props.paddingHorizontal}px`,
                    borderRadius: props.borderRadius,
                    border: props.showBorder ? `${props.borderWidth}px solid ${props.borderColor}` : "none",
                    boxShadow: props.showShadow ? `0 4px 20px ${props.shadowColor}` : "none",
                }}
            >
                {/* Timer Icon/Label */}
                {props.showIcon && (
                    <div
                        style={{
                            fontSize: props.iconSize,
                            lineHeight: 1,
                        }}
                    >
                        {props.icon}
                    </div>
                )}

                {/* Timer Text */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: props.textGap,
                    }}
                >
                    {props.showLabel && (
                        <span
                            style={{
                                fontSize: props.labelSize,
                                fontWeight: props.labelWeight,
                                color: props.labelColor,
                                textTransform: "uppercase",
                                letterSpacing: props.labelLetterSpacing,
                            }}
                        >
                            {props.labelText}
                        </span>
                    )}

                    <span
                        style={{
                            fontSize: props.timeSize,
                            fontWeight: props.timeWeight,
                            color: props.timeColor,
                            letterSpacing: "-0.5px",
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </span>
                </div>

                {/* Progress Bar */}
                {props.showProgressBar && (
                    <div
                        style={{
                            width: props.progressBarWidth,
                            height: props.progressBarHeight,
                            background: props.progressBarBackground,
                            borderRadius: props.progressBarRadius,
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                width: `${percentage}%`,
                                height: "100%",
                                background: props.progressBarFill,
                                borderRadius: props.progressBarRadius,
                                transition: "width 1s linear",
                                boxShadow: props.progressBarGlow ? `0 0 12px ${props.progressBarFill}80` : "none",
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

CompactTimer.defaultProps = {
    durationSeconds: 167,
    fontFamily: "'Satoshi', -apple-system, sans-serif",
    backgroundColor: "linear-gradient(135deg, rgba(211, 47, 47, 0.08), rgba(255, 209, 102, 0.12))",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    showBorder: true,
    borderWidth: 2,
    borderColor: "rgba(211, 47, 47, 0.2)",
    showShadow: true,
    shadowColor: "rgba(211, 47, 47, 0.12)",
    showIcon: true,
    icon: "⏰",
    iconSize: 16,
    gap: 12,
    showLabel: true,
    labelText: "Offer expires in",
    labelSize: 11,
    labelWeight: 700,
    labelColor: "#D32F2F",
    labelLetterSpacing: "1px",
    textGap: 8,
    timeSize: 28,
    timeWeight: 700,
    timeColor: "#D32F2F",
    showProgressBar: true,
    progressBarWidth: 80,
    progressBarHeight: 4,
    progressBarBackground: "rgba(0, 0, 0, 0.08)",
    progressBarFill: "linear-gradient(90deg, #D32F2F, #B71C1C)",
    progressBarRadius: 2,
    progressBarGlow: true,
}

addPropertyControls(CompactTimer, {
    durationSeconds: {
        type: ControlType.Number,
        title: "Duration (seconds)",
        min: 1,
        max: 3600,
        step: 1,
        defaultValue: 167,
    },
    fontFamily: {
        type: ControlType.String,
        title: "Font Family",
        defaultValue: "'Satoshi', -apple-system, sans-serif",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "rgba(211, 47, 47, 0.08)",
    },
    paddingVertical: {
        type: ControlType.Number,
        title: "Padding V",
        min: 0,
        max: 50,
        defaultValue: 12,
    },
    paddingHorizontal: {
        type: ControlType.Number,
        title: "Padding H",
        min: 0,
        max: 100,
        defaultValue: 20,
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        min: 0,
        max: 50,
        defaultValue: 12,
    },
    showBorder: {
        type: ControlType.Boolean,
        title: "Show Border",
        defaultValue: true,
    },
    borderWidth: {
        type: ControlType.Number,
        title: "Border Width",
        min: 0,
        max: 10,
        defaultValue: 2,
        hidden: (props) => !props.showBorder,
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border Color",
        defaultValue: "rgba(211, 47, 47, 0.2)",
        hidden: (props) => !props.showBorder,
    },
    showShadow: {
        type: ControlType.Boolean,
        title: "Show Shadow",
        defaultValue: true,
    },
    shadowColor: {
        type: ControlType.Color,
        title: "Shadow Color",
        defaultValue: "rgba(211, 47, 47, 0.12)",
        hidden: (props) => !props.showShadow,
    },
    showIcon: {
        type: ControlType.Boolean,
        title: "Show Icon",
        defaultValue: true,
    },
    icon: {
        type: ControlType.String,
        title: "Icon",
        defaultValue: "⏰",
        hidden: (props) => !props.showIcon,
    },
    iconSize: {
        type: ControlType.Number,
        title: "Icon Size",
        min: 8,
        max: 40,
        defaultValue: 16,
        hidden: (props) => !props.showIcon,
    },
    gap: {
        type: ControlType.Number,
        title: "Items Gap",
        min: 0,
        max: 40,
        defaultValue: 12,
    },
    showLabel: {
        type: ControlType.Boolean,
        title: "Show Label",
        defaultValue: true,
    },
    labelText: {
        type: ControlType.String,
        title: "Label Text",
        defaultValue: "Offer expires in",
        hidden: (props) => !props.showLabel,
    },
    labelSize: {
        type: ControlType.Number,
        title: "Label Size",
        min: 8,
        max: 24,
        defaultValue: 11,
        hidden: (props) => !props.showLabel,
    },
    labelWeight: {
        type: ControlType.Number,
        title: "Label Weight",
        min: 400,
        max: 900,
        step: 100,
        defaultValue: 700,
        hidden: (props) => !props.showLabel,
    },
    labelColor: {
        type: ControlType.Color,
        title: "Label Color",
        defaultValue: "#D32F2F",
        hidden: (props) => !props.showLabel,
    },
    labelLetterSpacing: {
        type: ControlType.String,
        title: "Label Spacing",
        defaultValue: "1px",
        hidden: (props) => !props.showLabel,
    },
    textGap: {
        type: ControlType.Number,
        title: "Label/Time Gap",
        min: 0,
        max: 30,
        defaultValue: 8,
    },
    timeSize: {
        type: ControlType.Number,
        title: "Time Size",
        min: 12,
        max: 60,
        defaultValue: 28,
    },
    timeWeight: {
        type: ControlType.Number,
        title: "Time Weight",
        min: 400,
        max: 900,
        step: 100,
        defaultValue: 700,
    },
    timeColor: {
        type: ControlType.Color,
        title: "Time Color",
        defaultValue: "#D32F2F",
    },
    showProgressBar: {
        type: ControlType.Boolean,
        title: "Show Progress",
        defaultValue: true,
    },
    progressBarWidth: {
        type: ControlType.Number,
        title: "Progress Width",
        min: 20,
        max: 200,
        defaultValue: 80,
        hidden: (props) => !props.showProgressBar,
    },
    progressBarHeight: {
        type: ControlType.Number,
        title: "Progress Height",
        min: 2,
        max: 20,
        defaultValue: 4,
        hidden: (props) => !props.showProgressBar,
    },
    progressBarBackground: {
        type: ControlType.Color,
        title: "Progress BG",
        defaultValue: "rgba(0, 0, 0, 0.08)",
        hidden: (props) => !props.showProgressBar,
    },
    progressBarFill: {
        type: ControlType.Color,
        title: "Progress Fill",
        defaultValue: "#D32F2F",
        hidden: (props) => !props.showProgressBar,
    },
    progressBarRadius: {
        type: ControlType.Number,
        title: "Progress Radius",
        min: 0,
        max: 20,
        defaultValue: 2,
        hidden: (props) => !props.showProgressBar,
    },
    progressBarGlow: {
        type: ControlType.Boolean,
        title: "Progress Glow",
        defaultValue: true,
        hidden: (props) => !props.showProgressBar,
    },
})

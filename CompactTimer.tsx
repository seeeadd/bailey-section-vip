import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
                {/* Custom Clock Icon */}
                {props.showIcon && (
                    <motion.div
                        animate={
                            props.iconPulse
                                ? {
                                      scale: [1, 1.1, 1],
                                  }
                                : {}
                        }
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width={props.iconSize}
                            height={props.iconSize}
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ display: "block" }}
                        >
                            {/* Clock circle */}
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke={props.iconColor}
                                strokeWidth={props.iconStrokeWidth}
                                fill="none"
                            />
                            {/* Clock hands */}
                            <motion.path
                                d="M12 6.5V12L15 14"
                                stroke={props.iconColor}
                                strokeWidth={props.iconStrokeWidth}
                                strokeLinecap="round"
                                animate={
                                    props.iconAnimate
                                        ? {
                                              rotate: [0, 360],
                                          }
                                        : {}
                                }
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    originX: "50%",
                                    originY: "50%",
                                }}
                            />
                        </svg>
                    </motion.div>
                )}

                {/* Timer Text */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: props.textGap,
                        flexWrap: props.wrapOnMobile ? "wrap" : "nowrap",
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
                                whiteSpace: "nowrap",
                            }}
                        >
                            {props.labelText}
                        </span>
                    )}

                    <motion.span
                        animate={
                            props.timePulse && timeRemaining <= 60
                                ? {
                                      scale: [1, 1.05, 1],
                                      color: [props.timeColor, props.timeUrgentColor, props.timeColor],
                                  }
                                : {}
                        }
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            fontSize: props.timeSize,
                            fontWeight: props.timeWeight,
                            color: props.timeColor,
                            letterSpacing: "-0.5px",
                            fontVariantNumeric: "tabular-nums",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </motion.span>
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
                            flexShrink: 0,
                        }}
                    >
                        <motion.div
                            animate={{
                                width: `${percentage}%`,
                            }}
                            transition={{
                                duration: 1,
                                ease: "linear",
                            }}
                            style={{
                                height: "100%",
                                background: props.progressBarFill,
                                borderRadius: props.progressBarRadius,
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
    borderColor: "rgba(211, 47, 47, 0.25)",
    showShadow: true,
    shadowColor: "rgba(211, 47, 47, 0.15)",
    showIcon: true,
    iconSize: 20,
    iconColor: "#D32F2F",
    iconStrokeWidth: 2,
    iconPulse: true,
    iconAnimate: false,
    gap: 12,
    showLabel: true,
    labelText: "OFFER EXPIRES IN",
    labelSize: 11,
    labelWeight: 700,
    labelColor: "#D32F2F",
    labelLetterSpacing: "1px",
    textGap: 10,
    timeSize: 32,
    timeWeight: 700,
    timeColor: "#D32F2F",
    timeUrgentColor: "#B71C1C",
    timePulse: true,
    wrapOnMobile: false,
    showProgressBar: true,
    progressBarWidth: 100,
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
        defaultValue: "rgba(211, 47, 47, 0.25)",
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
        defaultValue: "rgba(211, 47, 47, 0.15)",
        hidden: (props) => !props.showShadow,
    },
    showIcon: {
        type: ControlType.Boolean,
        title: "Show Icon",
        defaultValue: true,
    },
    iconSize: {
        type: ControlType.Number,
        title: "Icon Size",
        min: 12,
        max: 40,
        defaultValue: 20,
        hidden: (props) => !props.showIcon,
    },
    iconColor: {
        type: ControlType.Color,
        title: "Icon Color",
        defaultValue: "#D32F2F",
        hidden: (props) => !props.showIcon,
    },
    iconStrokeWidth: {
        type: ControlType.Number,
        title: "Icon Stroke",
        min: 1,
        max: 4,
        defaultValue: 2,
        hidden: (props) => !props.showIcon,
    },
    iconPulse: {
        type: ControlType.Boolean,
        title: "Icon Pulse",
        defaultValue: true,
        hidden: (props) => !props.showIcon,
    },
    iconAnimate: {
        type: ControlType.Boolean,
        title: "Icon Rotate",
        defaultValue: false,
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
        defaultValue: "OFFER EXPIRES IN",
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
        defaultValue: 10,
    },
    timeSize: {
        type: ControlType.Number,
        title: "Time Size",
        min: 16,
        max: 80,
        defaultValue: 32,
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
    timeUrgentColor: {
        type: ControlType.Color,
        title: "Time Urgent Color",
        defaultValue: "#B71C1C",
    },
    timePulse: {
        type: ControlType.Boolean,
        title: "Time Pulse (<1min)",
        defaultValue: true,
    },
    wrapOnMobile: {
        type: ControlType.Boolean,
        title: "Wrap on Mobile",
        defaultValue: false,
    },
    showProgressBar: {
        type: ControlType.Boolean,
        title: "Show Progress",
        defaultValue: true,
    },
    progressBarWidth: {
        type: ControlType.Number,
        title: "Progress Width",
        min: 40,
        max: 300,
        defaultValue: 100,
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

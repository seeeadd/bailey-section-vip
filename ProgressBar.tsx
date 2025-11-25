import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { useRef } from "react"

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */

export default function ProgressBar(props) {
    // Track if we should show initial animation (only once, not in canvas)
    const showInitialAnimation = useRef(
        typeof window !== 'undefined' && !window.location.pathname.includes('/canvas')
    )

    const {
        progress = 85,

        // Container
        paddingHorizontal = 40,
        paddingVertical = 16,

        // Bar
        barHeight = 12,
        barBorderRadius = 20,

        // Colors
        barBackgroundColor = "#E8E8E8",
        barFillColor = "#4A8A8C",
        barFillGradient = true,
        barFillGradientEnd = "#6BC4C6",
        markerColor = "#E85C7B",
        startIconColor = "#999999",
        endIconColor = "#4A8A8C",

        // Animation
        enableShimmer = true,
        shimmerSpeed = 2,
        pencilBounce = true,
        glowEffect = true,

        // Percentage
        showPercentage = true,
        percentagePosition = "inside",
        percentageSize = 10,
        percentageColor = "#FFFFFF",

        // Marker
        showMarker = true,
        markerSize = 24,

        // Icons
        showStartIcon = true,
        showEndIcon = true,
        iconSize = 28,
        iconGap = 16,

        // Text
        bottomText = "STEP 2 OF 2: ADD YOUR LISTING ASSETS",
        bottomTextSize = 11,
        bottomTextColor = "#666666",
        bottomTextWeight = 600,
        bottomTextSpacing = 1,
        showBottomText = true,

        // Icon labels
        startIconLabel = "",
        endIconLabel = "",
        labelSize = 10,
        labelColor = "#999999",
    } = props

    const progressPercent = Math.min(Math.max(progress, 0), 100)

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: `${paddingVertical}px ${paddingHorizontal}px`,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxSizing: "border-box",
            }}
        >
            {/* Progress Bar Row */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: `${iconGap}px`,
                    position: "relative",
                    width: "100%",
                }}
            >
                {/* Start Icon */}
                {showStartIcon && (
                    <motion.div
                        initial={showInitialAnimation.current ? { scale: 0, opacity: 0 } : false}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: [0, -3, 0]
                        }}
                        transition={{
                            scale: {
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            },
                            opacity: {
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            },
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }
                        }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                            flexShrink: 0,
                        }}
                    >
                        <svg
                            width={iconSize}
                            height={iconSize}
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <rect
                                x="5"
                                y="3"
                                width="14"
                                height="18"
                                rx="2"
                                stroke={startIconColor}
                                strokeWidth="2"
                                fill="none"
                            />
                            <motion.line
                                x1="8"
                                y1="8"
                                x2="16"
                                y2="8"
                                stroke={startIconColor}
                                strokeWidth="1.5"
                                opacity="0.3"
                                initial={showInitialAnimation.current ? { pathLength: 0 } : false}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            />
                            <motion.line
                                x1="8"
                                y1="12"
                                x2="13"
                                y2="12"
                                stroke={startIconColor}
                                strokeWidth="1.5"
                                opacity="0.3"
                                initial={showInitialAnimation.current ? { pathLength: 0 } : false}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            />
                            <motion.line
                                x1="8"
                                y1="16"
                                x2="14"
                                y2="16"
                                stroke={startIconColor}
                                strokeWidth="1.5"
                                opacity="0.3"
                                initial={showInitialAnimation.current ? { pathLength: 0 } : false}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                            />
                        </svg>
                        {startIconLabel && (
                            <div
                                style={{
                                    fontSize: `${labelSize}px`,
                                    color: labelColor,
                                    fontWeight: 500,
                                    fontFamily:
                                        "Inter, -apple-system, sans-serif",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {startIconLabel}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Progress Bar Container */}
                <div
                    style={{
                        flex: 1,
                        position: "relative",
                        minWidth: 100,
                        height: `${barHeight}px`,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {/* Percentage Above Bar */}
                    {showPercentage && percentagePosition === "above" && (
                        <motion.div
                            initial={showInitialAnimation.current ? { y: 10, opacity: 0 } : false}
                            animate={{ y: 0, opacity: 1 }}
                            style={{
                                position: "absolute",
                                left: `${progressPercent}%`,
                                bottom: "calc(100% + 6px)",
                                transform: "translateX(-50%)",
                                fontSize: `${percentageSize}px`,
                                fontWeight: 700,
                                color:
                                    percentageColor === "#FFFFFF"
                                        ? markerColor
                                        : percentageColor,
                                fontFamily: "Inter, -apple-system, sans-serif",
                                whiteSpace: "nowrap",
                                transition: "left 0.6s ease-out",
                            }}
                        >
                            {Math.round(progressPercent)}%
                        </motion.div>
                    )}

                    {/* Progress Bar */}
                    <div
                        style={{
                            width: "100%",
                            height: `${barHeight}px`,
                            backgroundColor: barBackgroundColor,
                            borderRadius: `${barBorderRadius}px`,
                            position: "relative",
                            overflow: "hidden",
                            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
                            zIndex: 1,
                        }}
                    >
                        {/* Fill */}
                        <motion.div
                            initial={showInitialAnimation.current ? { width: 0 } : false}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{
                                duration: 0.8,
                                ease: [0.34, 1.56, 0.64, 1],
                            }}
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                background: barFillGradient
                                    ? `linear-gradient(90deg, ${barFillColor} 0%, ${barFillGradientEnd} 100%)`
                                    : barFillColor,
                                borderRadius: `${barBorderRadius}px`,
                                boxShadow: glowEffect
                                    ? `0 0 12px ${barFillColor}40`
                                    : "none",
                                overflow: "hidden",
                            }}
                        >
                            {/* Shimmer Effect */}
                            {enableShimmer && progressPercent > 0 && (
                                <motion.div
                                    animate={{
                                        x: ["-100%", "200%"],
                                    }}
                                    transition={{
                                        duration: shimmerSpeed,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "50%",
                                        height: "100%",
                                        background:
                                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                                        transform: "skewX(-20deg)",
                                    }}
                                />
                            )}
                        </motion.div>

                        {/* Percentage Inside Bar */}
                        {showPercentage && percentagePosition === "inside" && (
                            <motion.div
                                initial={showInitialAnimation.current ? { opacity: 0, scale: 0.8 } : false}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    position: "absolute",
                                    left: `${progressPercent}%`,
                                    top: "50%",
                                    transform: "translate(8px, -50%)",
                                    fontSize: `${percentageSize}px`,
                                    fontWeight: 700,
                                    color:
                                        progressPercent > 50
                                            ? barBackgroundColor
                                            : barFillColor,
                                    fontFamily:
                                        "Inter, -apple-system, sans-serif",
                                    whiteSpace: "nowrap",
                                    transition:
                                        "left 0.6s ease-out, color 0.3s ease",
                                    zIndex: 5,
                                    pointerEvents: "none",
                                }}
                            >
                                {Math.round(progressPercent)}%
                            </motion.div>
                        )}
                    </div>

                    {/* Pencil Marker */}
                    {showMarker && (
                        <motion.div
                            initial={showInitialAnimation.current ? { scale: 0, rotate: -45 } : false}
                            animate={{
                                scale: 1,
                                rotate: pencilBounce ? [-5, 5, -5] : 0,
                                x: "-50%",
                                y: pencilBounce ? [0, -3, 0] : 0,
                            }}
                            transition={{
                                scale: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                    delay: 0.2,
                                },
                                rotate: pencilBounce
                                    ? {
                                          duration: 2,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                      }
                                    : {},
                                y: pencilBounce
                                    ? {
                                          duration: 2,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                      }
                                    : {},
                                x: {
                                    duration: 0,
                                }
                            }}
                            style={{
                                position: "absolute",
                                left: `${progressPercent}%`,
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 20,
                                pointerEvents: "none",
                            }}
                        >
                            <svg
                                width={markerSize}
                                height={markerSize}
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{
                                    filter: glowEffect
                                        ? `drop-shadow(0 2px 8px ${markerColor}60) drop-shadow(0 0 12px ${markerColor}30)`
                                        : "drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
                                    display: "block",
                                }}
                            >
                                <path
                                    d="M20 7L17 4L7 14L6 18L10 17L20 7Z"
                                    fill={markerColor}
                                    stroke={markerColor}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15 6L18 9"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                {/* Sparkle effect */}
                                {glowEffect && (
                                    <motion.circle
                                        cx="18"
                                        cy="6"
                                        r="2"
                                        fill="white"
                                        animate={{
                                            opacity: [0.3, 0.8, 0.3],
                                            scale: [0.8, 1.2, 0.8],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                )}
                            </svg>
                        </motion.div>
                    )}

                    {/* Percentage Below Bar */}
                    {showPercentage && percentagePosition === "below" && (
                        <motion.div
                            initial={showInitialAnimation.current ? { y: -10, opacity: 0 } : false}
                            animate={{ y: 0, opacity: 1 }}
                            style={{
                                position: "absolute",
                                left: `${progressPercent}%`,
                                top: "calc(100% + 6px)",
                                transform: "translateX(-50%)",
                                fontSize: `${percentageSize}px`,
                                fontWeight: 700,
                                color:
                                    percentageColor === "#FFFFFF"
                                        ? markerColor
                                        : percentageColor,
                                fontFamily: "Inter, -apple-system, sans-serif",
                                whiteSpace: "nowrap",
                                transition: "left 0.6s ease-out",
                            }}
                        >
                            {Math.round(progressPercent)}%
                        </motion.div>
                    )}
                </div>

                {/* End Icon */}
                {showEndIcon && (
                    <motion.div
                        initial={showInitialAnimation.current ? { scale: 0, opacity: 0 } : false}
                        animate={{
                            scale: progressPercent >= 100 ? [1, 1.15, 1] : 1,
                            opacity: 1,
                            y: [0, -4, 0],
                            rotate: progressPercent >= 100 ? [0, 5, -5, 0] : 0,
                        }}
                        transition={{
                            scale: {
                                duration: 0.6,
                                repeat: progressPercent >= 100 ? Infinity : 0,
                                repeatDelay: 0.5,
                                ease: "easeInOut",
                            },
                            rotate: {
                                duration: 0.6,
                                repeat: progressPercent >= 100 ? Infinity : 0,
                                repeatDelay: 0.5,
                                ease: "easeInOut",
                            },
                            opacity: {
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.1,
                            },
                            y: {
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }
                        }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                            flexShrink: 0,
                        }}
                    >
                        <svg
                            width={iconSize}
                            height={iconSize}
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <rect
                                x="5"
                                y="3"
                                width="14"
                                height="18"
                                rx="2"
                                stroke={endIconColor}
                                strokeWidth="2"
                                fill="none"
                            />
                            <motion.line
                                x1="8"
                                y1="8"
                                x2="16"
                                y2="8"
                                stroke={endIconColor}
                                strokeWidth="1.5"
                                initial={showInitialAnimation.current ? { pathLength: 0 } : false}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            />
                            <motion.line
                                x1="8"
                                y1="12"
                                x2="16"
                                y2="12"
                                stroke={endIconColor}
                                strokeWidth="1.5"
                                initial={showInitialAnimation.current ? { pathLength: 0 } : false}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            />
                            <motion.line
                                x1="8"
                                y1="16"
                                x2="14"
                                y2="16"
                                stroke={endIconColor}
                                strokeWidth="1.5"
                                initial={showInitialAnimation.current ? { pathLength: 0 } : false}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: 0.8 }}
                            />
                            <motion.circle
                                cx="17"
                                cy="18"
                                r="4"
                                fill={endIconColor}
                                initial={showInitialAnimation.current ? { scale: 0 } : false}
                                animate={{
                                    scale: progressPercent >= 100 ? 1 : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 20,
                                }}
                            />
                            <motion.path
                                d="M15.5 18L16.5 19L18.5 17"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={showInitialAnimation.current ? { pathLength: 0 } : false}
                                animate={{
                                    pathLength: progressPercent >= 100 ? 1 : 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.2,
                                }}
                            />
                        </svg>
                        {endIconLabel && (
                            <div
                                style={{
                                    fontSize: `${labelSize}px`,
                                    color: labelColor,
                                    fontWeight: 500,
                                    fontFamily:
                                        "Inter, -apple-system, sans-serif",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {endIconLabel}
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Bottom Text */}
            {showBottomText && bottomText && (
                <motion.div
                    initial={showInitialAnimation.current ? { opacity: 0, y: 5 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        fontSize: `${bottomTextSize}px`,
                        fontWeight: bottomTextWeight,
                        color: bottomTextColor,
                        textAlign: "center",
                        letterSpacing: `${bottomTextSpacing}px`,
                        fontFamily: "Inter, -apple-system, sans-serif",
                        width: "100%",
                    }}
                >
                    {bottomText}
                </motion.div>
            )}
        </div>
    )
}

addPropertyControls(ProgressBar, {
    // === SPACING ===
    paddingHorizontal: {
        type: ControlType.Number,
        title: "Padding Left/Right",
        min: 0,
        max: 200,
        defaultValue: 40,
        unit: "px",
        step: 4,
    },
    paddingVertical: {
        type: ControlType.Number,
        title: "Padding Top/Bottom",
        min: 0,
        max: 100,
        defaultValue: 16,
        unit: "px",
        step: 4,
    },

    // === PROGRESS ===
    progress: {
        type: ControlType.Number,
        title: "Progress",
        min: 0,
        max: 100,
        defaultValue: 85,
        unit: "%",
        step: 1,
    },

    // === BAR ===
    barHeight: {
        type: ControlType.Number,
        title: "Bar Height",
        min: 8,
        max: 32,
        defaultValue: 12,
        unit: "px",
    },
    barBorderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        min: 0,
        max: 50,
        defaultValue: 20,
        unit: "px",
    },

    // === COLORS ===
    barBackgroundColor: {
        type: ControlType.Color,
        title: "Bar Background",
        defaultValue: "#E8E8E8",
    },
    barFillColor: {
        type: ControlType.Color,
        title: "Bar Fill Start",
        defaultValue: "#4A8A8C",
    },
    barFillGradient: {
        type: ControlType.Boolean,
        title: "Gradient Fill",
        defaultValue: true,
    },
    barFillGradientEnd: {
        type: ControlType.Color,
        title: "Bar Fill End",
        defaultValue: "#6BC4C6",
        hidden: (props) => !props.barFillGradient,
    },
    markerColor: {
        type: ControlType.Color,
        title: "Pencil Color",
        defaultValue: "#E85C7B",
    },
    startIconColor: {
        type: ControlType.Color,
        title: "Start Icon",
        defaultValue: "#999999",
    },
    endIconColor: {
        type: ControlType.Color,
        title: "End Icon",
        defaultValue: "#4A8A8C",
    },

    // === ANIMATION ===
    enableShimmer: {
        type: ControlType.Boolean,
        title: "Shimmer Effect",
        defaultValue: true,
    },
    shimmerSpeed: {
        type: ControlType.Number,
        title: "Shimmer Speed",
        min: 1,
        max: 5,
        defaultValue: 2,
        unit: "s",
        step: 0.5,
        hidden: (props) => !props.enableShimmer,
    },
    pencilBounce: {
        type: ControlType.Boolean,
        title: "Pencil Bounce",
        defaultValue: true,
    },
    glowEffect: {
        type: ControlType.Boolean,
        title: "Glow Effects",
        defaultValue: true,
    },

    // === PERCENTAGE ===
    showPercentage: {
        type: ControlType.Boolean,
        title: "Show %",
        defaultValue: true,
    },
    percentagePosition: {
        type: ControlType.Enum,
        title: "% Position",
        options: ["inside", "above", "below"],
        optionTitles: ["Inside Bar", "Above Bar", "Below Bar"],
        defaultValue: "inside",
        hidden: (props) => !props.showPercentage,
    },
    percentageSize: {
        type: ControlType.Number,
        title: "% Size",
        min: 8,
        max: 20,
        defaultValue: 10,
        unit: "px",
        hidden: (props) => !props.showPercentage,
    },
    percentageColor: {
        type: ControlType.Color,
        title: "% Color",
        defaultValue: "#FFFFFF",
        hidden: (props) =>
            !props.showPercentage || props.percentagePosition === "inside",
    },

    // === MARKER ===
    showMarker: {
        type: ControlType.Boolean,
        title: "Show Pencil",
        defaultValue: true,
    },
    markerSize: {
        type: ControlType.Number,
        title: "Pencil Size",
        min: 16,
        max: 48,
        defaultValue: 24,
        unit: "px",
        hidden: (props) => !props.showMarker,
    },

    // === ICONS ===
    showStartIcon: {
        type: ControlType.Boolean,
        title: "Start Icon",
        defaultValue: true,
    },
    showEndIcon: {
        type: ControlType.Boolean,
        title: "End Icon",
        defaultValue: true,
    },
    iconSize: {
        type: ControlType.Number,
        title: "Icon Size",
        min: 20,
        max: 48,
        defaultValue: 28,
        unit: "px",
    },
    iconGap: {
        type: ControlType.Number,
        title: "Icon Gap",
        min: 8,
        max: 40,
        defaultValue: 16,
        unit: "px",
    },

    // === LABELS ===
    startIconLabel: {
        type: ControlType.String,
        title: "Start Label",
        defaultValue: "",
        placeholder: "e.g., Blank",
    },
    endIconLabel: {
        type: ControlType.String,
        title: "End Label",
        defaultValue: "",
        placeholder: "e.g., Published",
    },
    labelSize: {
        type: ControlType.Number,
        title: "Label Size",
        min: 8,
        max: 14,
        defaultValue: 10,
        unit: "px",
    },
    labelColor: {
        type: ControlType.Color,
        title: "Label Color",
        defaultValue: "#999999",
    },

    // === BOTTOM TEXT ===
    showBottomText: {
        type: ControlType.Boolean,
        title: "Show Text",
        defaultValue: true,
    },
    bottomText: {
        type: ControlType.String,
        title: "Bottom Text",
        defaultValue: "STEP 2 OF 2: ADD YOUR LISTING ASSETS",
        displayTextArea: true,
        hidden: (props) => !props.showBottomText,
    },
    bottomTextSize: {
        type: ControlType.Number,
        title: "Text Size",
        min: 8,
        max: 16,
        defaultValue: 11,
        unit: "px",
        hidden: (props) => !props.showBottomText,
    },
    bottomTextColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#666666",
        hidden: (props) => !props.showBottomText,
    },
    bottomTextWeight: {
        type: ControlType.Enum,
        title: "Text Weight",
        options: [400, 500, 600, 700],
        optionTitles: ["Regular", "Medium", "Semibold", "Bold"],
        defaultValue: 600,
        hidden: (props) => !props.showBottomText,
    },
    bottomTextSpacing: {
        type: ControlType.Number,
        title: "Letter Spacing",
        min: 0,
        max: 3,
        defaultValue: 1,
        unit: "px",
        step: 0.5,
        hidden: (props) => !props.showBottomText,
    },
})

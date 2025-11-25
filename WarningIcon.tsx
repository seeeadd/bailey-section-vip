import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

export default function WarningIcon(props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                animate={
                    props.enableAnimation
                        ? {
                              scale: [1, 1.05, 1],
                              boxShadow: [
                                  `0 0 0 0 ${props.pulseColor}66`,
                                  `0 0 0 ${props.pulseSize}px ${props.pulseColor}00`,
                                  `0 0 0 0 ${props.pulseColor}66`,
                              ],
                          }
                        : {}
                }
                transition={{
                    duration: props.pulseDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    width: props.iconSize,
                    height: props.iconSize,
                    borderRadius: "50%",
                    background: props.backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: props.showBorder ? `${props.borderWidth}px solid ${props.borderColor}` : "none",
                }}
            >
                <svg
                    width={props.svgSize}
                    height={props.svgSize}
                    viewBox="0 0 44 44"
                    fill="none"
                    style={{
                        display: "block",
                    }}
                >
                    {/* Exclamation mark line */}
                    <motion.path
                        d="M22 8L22 24"
                        stroke={props.iconColor}
                        strokeWidth={props.strokeWidth}
                        strokeLinecap="round"
                        initial={props.enableLineAnimation ? { pathLength: 0 } : false}
                        animate={props.enableLineAnimation ? { pathLength: 1 } : {}}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                            repeat: props.repeatLineAnimation ? Infinity : 0,
                            repeatDelay: props.lineRepeatDelay,
                        }}
                    />
                    {/* Exclamation mark dot */}
                    <motion.path
                        d="M22 30L22 32"
                        stroke={props.iconColor}
                        strokeWidth={props.strokeWidth}
                        strokeLinecap="round"
                        initial={props.enableLineAnimation ? { pathLength: 0 } : false}
                        animate={props.enableLineAnimation ? { pathLength: 1 } : {}}
                        transition={{
                            duration: 0.2,
                            delay: props.enableLineAnimation ? 0.4 : 0,
                            ease: "easeOut",
                            repeat: props.repeatLineAnimation ? Infinity : 0,
                            repeatDelay: props.lineRepeatDelay,
                        }}
                    />
                    {/* Circle */}
                    {props.showCircle && (
                        <motion.circle
                            cx="22"
                            cy="22"
                            r="18"
                            stroke={props.iconColor}
                            strokeWidth={props.circleStrokeWidth}
                            opacity={props.circleOpacity}
                            fill="none"
                            strokeDasharray={props.circleDashed ? "4 4" : "none"}
                            initial={props.enableCircleAnimation ? { pathLength: 0, rotate: -90 } : false}
                            animate={
                                props.enableCircleAnimation
                                    ? { pathLength: 1, rotate: props.circleRotate ? 270 : -90 }
                                    : {}
                            }
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                repeat: props.repeatCircleAnimation ? Infinity : 0,
                                repeatDelay: props.circleRepeatDelay,
                            }}
                            style={{
                                originX: "50%",
                                originY: "50%",
                            }}
                        />
                    )}
                </svg>
            </motion.div>
        </div>
    )
}

WarningIcon.defaultProps = {
    iconSize: 60,
    svgSize: 34,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    showBorder: true,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    iconColor: "#FFFFFF",
    strokeWidth: 4,
    enableAnimation: true,
    pulseDuration: 2,
    pulseColor: "#FFFFFF",
    pulseSize: 10,
    enableLineAnimation: false,
    repeatLineAnimation: false,
    lineRepeatDelay: 2,
    showCircle: true,
    circleStrokeWidth: 3,
    circleOpacity: 0.5,
    circleDashed: true,
    enableCircleAnimation: false,
    circleRotate: false,
    repeatCircleAnimation: false,
    circleRepeatDelay: 2,
}

addPropertyControls(WarningIcon, {
    iconSize: {
        type: ControlType.Number,
        title: "Icon Size",
        min: 30,
        max: 200,
        defaultValue: 60,
    },
    svgSize: {
        type: ControlType.Number,
        title: "SVG Size",
        min: 20,
        max: 150,
        defaultValue: 34,
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "rgba(255, 255, 255, 0.2)",
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
        defaultValue: "rgba(255, 255, 255, 0.3)",
        hidden: (props) => !props.showBorder,
    },
    iconColor: {
        type: ControlType.Color,
        title: "Icon Color",
        defaultValue: "#FFFFFF",
    },
    strokeWidth: {
        type: ControlType.Number,
        title: "Stroke Width",
        min: 1,
        max: 8,
        defaultValue: 4,
    },
    enableAnimation: {
        type: ControlType.Boolean,
        title: "Pulse Animation",
        defaultValue: true,
    },
    pulseDuration: {
        type: ControlType.Number,
        title: "Pulse Duration",
        min: 0.5,
        max: 5,
        step: 0.1,
        defaultValue: 2,
        hidden: (props) => !props.enableAnimation,
    },
    pulseColor: {
        type: ControlType.Color,
        title: "Pulse Color",
        defaultValue: "#FFFFFF",
        hidden: (props) => !props.enableAnimation,
    },
    pulseSize: {
        type: ControlType.Number,
        title: "Pulse Size",
        min: 0,
        max: 30,
        defaultValue: 10,
        hidden: (props) => !props.enableAnimation,
    },
    enableLineAnimation: {
        type: ControlType.Boolean,
        title: "Line Draw Animation",
        defaultValue: false,
    },
    repeatLineAnimation: {
        type: ControlType.Boolean,
        title: "Repeat Line Animation",
        defaultValue: false,
        hidden: (props) => !props.enableLineAnimation,
    },
    lineRepeatDelay: {
        type: ControlType.Number,
        title: "Line Repeat Delay",
        min: 0,
        max: 5,
        step: 0.1,
        defaultValue: 2,
        hidden: (props) => !props.enableLineAnimation || !props.repeatLineAnimation,
    },
    showCircle: {
        type: ControlType.Boolean,
        title: "Show Circle",
        defaultValue: true,
    },
    circleStrokeWidth: {
        type: ControlType.Number,
        title: "Circle Stroke",
        min: 1,
        max: 8,
        defaultValue: 3,
        hidden: (props) => !props.showCircle,
    },
    circleOpacity: {
        type: ControlType.Number,
        title: "Circle Opacity",
        min: 0,
        max: 1,
        step: 0.1,
        defaultValue: 0.5,
        hidden: (props) => !props.showCircle,
    },
    circleDashed: {
        type: ControlType.Boolean,
        title: "Circle Dashed",
        defaultValue: true,
        hidden: (props) => !props.showCircle,
    },
    enableCircleAnimation: {
        type: ControlType.Boolean,
        title: "Circle Draw Animation",
        defaultValue: false,
        hidden: (props) => !props.showCircle,
    },
    circleRotate: {
        type: ControlType.Boolean,
        title: "Circle Rotate",
        defaultValue: false,
        hidden: (props) => !props.showCircle || !props.enableCircleAnimation,
    },
    repeatCircleAnimation: {
        type: ControlType.Boolean,
        title: "Repeat Circle Animation",
        defaultValue: false,
        hidden: (props) => !props.showCircle || !props.enableCircleAnimation,
    },
    circleRepeatDelay: {
        type: ControlType.Number,
        title: "Circle Repeat Delay",
        min: 0,
        max: 5,
        step: 0.1,
        defaultValue: 2,
        hidden: (props) => !props.showCircle || !props.enableCircleAnimation || !props.repeatCircleAnimation,
    },
})

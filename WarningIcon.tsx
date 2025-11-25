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
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        `0 0 0 0 ${props.pulseColor}66`,
                        `0 0 0 ${props.pulseSize}px ${props.pulseColor}00`,
                        `0 0 0 0 ${props.pulseColor}66`,
                    ],
                }}
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
                    <path
                        d="M22 8L22 24"
                        stroke={props.iconColor}
                        strokeWidth={props.strokeWidth}
                        strokeLinecap="round"
                    />
                    {/* Exclamation mark dot */}
                    <path
                        d="M22 30L22 32"
                        stroke={props.iconColor}
                        strokeWidth={props.strokeWidth}
                        strokeLinecap="round"
                    />
                    {/* Circle */}
                    {props.showCircle && (
                        <circle
                            cx="22"
                            cy="22"
                            r="18"
                            stroke={props.iconColor}
                            strokeWidth={props.circleStrokeWidth}
                            opacity={props.circleOpacity}
                            fill="none"
                            strokeDasharray={props.circleDashed ? "4 4" : "none"}
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
    pulseDuration: 2,
    pulseColor: "#FFFFFF",
    pulseSize: 10,
    showCircle: true,
    circleStrokeWidth: 3,
    circleOpacity: 0.5,
    circleDashed: true,
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
    pulseDuration: {
        type: ControlType.Number,
        title: "Pulse Duration",
        min: 0.5,
        max: 5,
        step: 0.1,
        defaultValue: 2,
    },
    pulseColor: {
        type: ControlType.Color,
        title: "Pulse Color",
        defaultValue: "#FFFFFF",
    },
    pulseSize: {
        type: ControlType.Number,
        title: "Pulse Size (px)",
        min: 0,
        max: 30,
        defaultValue: 10,
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
})

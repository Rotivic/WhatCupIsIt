import { Cup } from "@/types/Cups";
import React, { useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
const size = width - 40;
const center = size / 2;
const radius = center;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function getRandomColor() {
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

interface Props {
  cups: Cup[];
  onSelect: (cup: Cup) => void;
}

export default function WheelOfCups({ cups, onSelect }: Props) {
  const anglePerSegment = 360 / cups.length;
  const segmentColors = cups.map(() => getRandomColor());

  const rotation = useSharedValue(0);
  const isSpinning = useRef(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handleSpin = () => {
    if (isSpinning.current) return;

    isSpinning.current = true;
    const fullSpins = 5;
    const randomIndex = Math.floor(Math.random() * cups.length);
    const finalAngle =
      360 * fullSpins + randomIndex * anglePerSegment + anglePerSegment / 2;

    const onWheelEnd = (selectedCup: Cup) => {
      Vibration.vibrate(100);
      onSelect(selectedCup);
      isSpinning.current = false;
    };

    rotation.value = withTiming(-finalAngle, { duration: 3000 }, () => {
      runOnJS(onWheelEnd)(cups[randomIndex]);
    });
  };

  return (
    <View style={styles.container}>
      {/* Ruleta */}
      <View style={styles.wheelWrapper}>
        <Animated.View style={[animatedStyle]}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <G>
              {cups.map((cup, index) => {
                const startAngle = index * anglePerSegment;
                const endAngle = (index + 1) * anglePerSegment;
                const path = describeArc(
                  center,
                  center,
                  radius,
                  startAngle,
                  endAngle
                );
                const midAngle = (startAngle + endAngle) / 2;
                const labelPos = polarToCartesian(
                  center,
                  center,
                  radius * 0.6,
                  midAngle
                );
                return (
                  <G key={cup.id}>
                    <Path
                      d={path}
                      fill={segmentColors[index]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                    <SvgText
                      fill="#fff"
                      fontSize="12"
                      fontWeight="bold"
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      {cup.name}
                    </SvgText>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>

        {/* Flecha/puntero arriba del todo */}
        <View style={styles.pointer}>
          <Text style={styles.pointerText}>🔻</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleSpin} style={styles.button}>
        <Text style={styles.buttonText}>Girar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 12,
  },
  wheelWrapper: {
    width: size,
    height: size,
    justifyContent: "center",
    alignItems: "center",
  },
  pointer: {
    position: "absolute",
    top: 4,
    left: size / 2 - 12,
    zIndex: 10,
  },
  pointerText: {
    fontSize: 24,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2f95dc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

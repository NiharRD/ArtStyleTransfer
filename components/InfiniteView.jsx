import { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Constants
const NODE_WIDTH = 90;
const NODE_HEIGHT = 130;
const VERTICAL_GAP = 50;
const HORIZONTAL_GAP = 30;

// --- Icons ---
const CloseIcon = ({ size = 16, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EyeIcon = ({ size = 12, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
  </Svg>
);

const EyeOffIcon = ({ size = 14, color = "#888" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BranchIcon = ({ size = 16, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM18 9a9 9 0 01-9 9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MergeIcon = ({ size = 14, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M8 18L12 22L16 18M8 6L12 2L16 6M12 2V22" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Cr Badge
const CrBadge = () => (
  <View style={styles.crBadge}>
    <Text style={styles.crText}>Cr</Text>
  </View>
);

// Connection dot component
const ConnectionDot = ({ position }) => (
  <View style={[styles.connectionDot, position === 'top' ? styles.dotTop : styles.dotBottom]} />
);

// Vertical line component
const VerticalLine = ({ height = VERTICAL_GAP }) => (
  <View style={[styles.verticalLine, { height }]} />
);

// Curved branch line using SVG
const CurvedBranchLine = ({ direction = 'right' }) => (
  <Svg width={60} height={80} style={styles.curvedLine}>
    <Path
      d={direction === 'right'
        ? "M0,0 C0,40 60,40 60,80"
        : "M60,0 C60,40 0,40 0,80"}
      stroke="#666"
      strokeWidth={1.5}
      fill="none"
      strokeDasharray="5,3"
    />
  </Svg>
);

// Single Image Node
const ImageNode = ({ image, showCr, isBlurred, onLongPress }) => (
  <TouchableWithoutFeedback onLongPress={onLongPress}>
    <View style={styles.imageNode}>
      {showCr && <CrBadge />}
      <Image
        source={{ uri: image }}
        style={[styles.nodeImage, isBlurred && styles.blurredImage]}
      />
      {isBlurred && (
        <View style={styles.starOverlay}>
          <Text style={styles.starText}>✦</Text>
        </View>
      )}
      <ConnectionDot position="top" />
      <ConnectionDot position="bottom" />
    </View>
  </TouchableWithoutFeedback>
);

// Branch Label
const BranchLabel = ({ label, collapsed, onToggle }) => (
  <TouchableOpacity style={styles.branchLabel} onPress={onToggle}>
    {collapsed ? <EyeOffIcon size={12} color="white" /> : <EyeIcon size={12} color="white" />}
    <Text style={styles.branchLabelText}>{label}</Text>
  </TouchableOpacity>
);

// Hidden Branch Placeholder
const HiddenBranch = ({ label }) => (
  <View style={styles.hiddenBranch}>
    <EyeOffIcon size={14} color="#666" />
    <Text style={styles.hiddenText}>{label}</Text>
  </View>
);

// Mock Data
const MOCK_DATA = [
  { id: '1', image: 'https://picsum.photos/200/280', showCr: true },
  { id: '2', image: 'https://picsum.photos/201/280', showCr: true },
  { id: '3', image: 'https://picsum.photos/202/280', showCr: false },
  { id: '4', image: 'https://picsum.photos/203/280', showCr: true },
];

const InfiniteView = ({ visible, onClose, images = [], onImageLongPress }) => {
  const [branch1Collapsed, setBranch1Collapsed] = useState(false);
  const [branch2Collapsed, setBranch2Collapsed] = useState(true);

  if (!visible) return null;

  const sampleImage = images[0] || 'https://picsum.photos/200/280';

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={styles.container}
    >
      <View style={styles.backdrop} />

      {/* Exit Button */}
      <TouchableOpacity onPress={onClose} style={styles.exitButton}>
        <CloseIcon size={16} color="white" />
        <Text style={styles.exitText}>Exit Infinite View</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Timeline */}
        <View style={styles.timeline}>

          {/* Node 1 - Root */}
          <View style={styles.nodeRow}>
            <ImageNode image={sampleImage} showCr onLongPress={() => onImageLongPress?.(MOCK_DATA[0])} />

            {/* Branch 1 indicator */}
            <View style={styles.branchIndicator}>
              <CurvedBranchLine direction="right" />
              <BranchLabel label="branch #1" collapsed={branch1Collapsed} onToggle={() => setBranch1Collapsed(!branch1Collapsed)} />
            </View>
          </View>

          <VerticalLine />

          {/* Node 2 with side branch */}
          <View style={styles.nodeRowWithBranch}>
            {/* Main node */}
            <ImageNode image={sampleImage} showCr onLongPress={() => onImageLongPress?.(MOCK_DATA[1])} />

            {/* Branch 1 content (if not collapsed) */}
            {!branch1Collapsed && (
              <View style={styles.sideBranch}>
                <View style={styles.horizontalLine} />
                <ImageNode image={sampleImage} showCr={false} onLongPress={() => onImageLongPress?.(MOCK_DATA[2])} />
              </View>
            )}
          </View>

          <VerticalLine />

          {/* Node 3 with side nodes */}
          <View style={styles.nodeRowWithBranch}>
            <ImageNode image={sampleImage} showCr={false} onLongPress={() => onImageLongPress?.(MOCK_DATA[2])} />

            {!branch1Collapsed && (
              <View style={styles.sideBranch}>
                <View style={styles.horizontalLine} />
                <View>
                  <ImageNode image={sampleImage} showCr={false} isBlurred onLongPress={() => onImageLongPress?.(MOCK_DATA[3])} />
                  <TouchableOpacity style={styles.mergeButton}>
                    <MergeIcon size={12} color="white" />
                    <Text style={styles.mergeText}>Merge to Main</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Branch 2 Label */}
          <View style={styles.branch2Row}>
            <BranchLabel label="branch #2" collapsed={branch2Collapsed} onToggle={() => setBranch2Collapsed(!branch2Collapsed)} />
          </View>

          {/* Hidden branches */}
          {branch2Collapsed && (
            <View style={styles.hiddenRow}>
              <HiddenBranch label="#4" />
              <HiddenBranch label="#3" />
            </View>
          )}

          <VerticalLine />

          {/* Node 4 - Bottom */}
          <View style={styles.nodeRow}>
            <ImageNode image={sampleImage} showCr onLongPress={() => onImageLongPress?.(MOCK_DATA[3])} />
          </View>

        </View>

        {/* Branch Button */}
        <TouchableOpacity style={styles.branchButton}>
          <BranchIcon size={16} color="white" />
          <Text style={styles.branchButtonText}>Branch</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 20, 20, 0.97)',
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(60, 60, 60, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 60,
    gap: 8,
  },
  exitText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  timeline: {
    alignItems: 'center',
  },
  nodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodeRowWithBranch: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageNode: {
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  nodeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  blurredImage: {
    opacity: 0.4,
  },
  crBadge: {
    position: 'absolute',
    top: -6,
    left: -6,
    width: 18,
    height: 18,
    backgroundColor: '#444',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    borderWidth: 1,
    borderColor: '#555',
  },
  crText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  connectionDot: {
    position: 'absolute',
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  dotTop: {
    top: -4,
  },
  dotBottom: {
    bottom: -4,
  },
  verticalLine: {
    width: 2,
    backgroundColor: '#FF6B6B',
  },
  horizontalLine: {
    width: HORIZONTAL_GAP,
    height: 2,
    backgroundColor: '#666',
    alignSelf: 'center',
    marginTop: NODE_HEIGHT / 2 - 1,
  },
  curvedLine: {
    position: 'absolute',
    left: NODE_WIDTH / 2,
    top: 20,
  },
  branchIndicator: {
    position: 'relative',
    marginLeft: 10,
  },
  branchLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60, 60, 60, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
    marginTop: 60,
    marginLeft: 40,
  },
  branchLabelText: {
    color: 'white',
    fontSize: 11,
  },
  sideBranch: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  starOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starText: {
    fontSize: 32,
    color: '#FFD700',
  },
  mergeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60, 60, 60, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
    marginTop: 10,
    alignSelf: 'center',
  },
  mergeText: {
    color: 'white',
    fontSize: 10,
  },
  branch2Row: {
    marginVertical: 15,
    alignSelf: 'flex-start',
    marginLeft: -50,
  },
  hiddenRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    marginLeft: -80,
  },
  hiddenBranch: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#444',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  hiddenText: {
    color: '#666',
    fontSize: 9,
  },
  branchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60, 60, 60, 0.9)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 30,
    gap: 6,
  },
  branchButtonText: {
    color: 'white',
    fontSize: 13,
  },
});

export default InfiniteView;

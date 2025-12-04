import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

// Compact Icons
const OpenIcon = ({ size = 18, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={2} />
    <Path d="M8 12l4 4 4-4M12 8v8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CopyIcon = ({ size = 18, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="9" y="9" width="13" height="13" rx="2" stroke={color} strokeWidth={2} />
    <Path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke={color} strokeWidth={2} />
  </Svg>
);

const TrashIcon = ({ size = 18, color = "#FF6B6B" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BranchIcon = ({ size = 16, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM18 9a9 9 0 01-9 9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const HideIcon = ({ size = 16, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckIcon = ({ size = 16, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronIcon = ({ size = 14, color = "#888" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ImageMenuModal = ({ visible, onClose, onAction }) => {
  if (!visible) return null;

  const handleAction = (actionId) => {
    onAction?.(actionId);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.menu}>
              {/* Top Actions */}
              <View style={styles.topRow}>
                <TouchableOpacity style={styles.topBtn} onPress={() => handleAction("open")}>
                  <OpenIcon />
                  <Text style={styles.topLabel}>Open</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topBtn} onPress={() => handleAction("copy")}>
                  <CopyIcon />
                  <Text style={styles.topLabel}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topBtn} onPress={() => handleAction("delete")}>
                  <TrashIcon />
                  <Text style={[styles.topLabel, { color: '#FF6B6B' }]}>Delete</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              {/* Branch Actions */}
              <Text style={styles.sectionLabel}>Branch Actions</Text>
              <TouchableOpacity style={styles.row} onPress={() => handleAction("createBranch")}>
                <BranchIcon />
                <Text style={styles.rowText}>Create branch</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={() => handleAction("hide")}>
                <HideIcon />
                <Text style={styles.rowText}>Hide below</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={() => handleAction("deleteBranch")}>
                <TrashIcon size={16} />
                <Text style={[styles.rowText, { color: '#FF6B6B' }]}>Delete branch</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={() => handleAction("merge")}>
                <CheckIcon />
                <Text style={styles.rowText}>Merge to Main</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* Footer Links */}
              <TouchableOpacity style={styles.linkRow} onPress={() => handleAction("provenance")}>
                <Text style={styles.linkText}>View Full Provenance</Text>
                <ChevronIcon />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menu: {
    width: 240,
    backgroundColor: 'rgba(35, 35, 35, 0.98)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },
  topBtn: {
    alignItems: 'center',
    gap: 4,
  },
  topLabel: {
    color: 'white',
    fontSize: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 10,
  },
  sectionLabel: {
    color: '#777',
    fontSize: 10,
    marginBottom: 6,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  rowText: {
    color: 'white',
    fontSize: 13,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  linkText: {
    color: 'white',
    fontSize: 13,
  },
});

export default ImageMenuModal;

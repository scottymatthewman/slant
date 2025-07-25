import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tinycolor from 'tinycolor2';
import theme from '../../constants/theme';
import AddIcon from '../icons/AddIcon';
import GoArrowRightIcon from '../icons/goArrowRightIcon';
import PauseIcon from '../icons/PauseIcon';
import PlayIcon from '../icons/PlayIcon';
import StopIcon from '../icons/StopIcon';

interface RecordingControlsProps {
  isRecording: boolean;
  isPlaying: boolean;
  duration: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlayRecording: () => void;
  onPauseRecording: () => void;
  onStopPlayback: () => void;
  onSaveRecording: () => void;
  onCancelRecording: () => void;
  showControls: boolean;
}

export function RecordingControls({
  isRecording,
  isPlaying,
  duration,
  onStartRecording,
  onStopRecording,
  onPlayRecording,
  onPauseRecording,
  onStopPlayback,
  onSaveRecording,
  onCancelRecording,
  showControls,
}: RecordingControlsProps) {
  // Always use dark theme colors for recording controls
  const colorPalette = theme.colors.dark;

  // Don't render if not recording or playing
  if (!showControls) {
    return null;
  }

  return (
    <View
      pointerEvents={showControls ? 'auto' : 'none'}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 138, // RECORDING_PANEL_HEIGHT + 18
        backgroundColor: colorPalette.surface2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 24,
        zIndex: 0, // Lower z-index so main content is above
        elevation: 1,
        gap: 12,
        opacity: showControls ? 1 : 0,
      }}
    >
      {/* Close (X) button */}
      <TouchableOpacity
        onPress={onCancelRecording}
        style={{
          backgroundColor: tinycolor(theme.colors.light.bg).setAlpha(0.2).toRgbString(),
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: tinycolor(theme.colors.light.border).setAlpha(0.6).toRgbString(),
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ rotate: '45deg' }],
        }}
      >
        <AddIcon width={24} height={24} fill={colorPalette.icon.primary} />
      </TouchableOpacity>

        {/* Play/Pause button - only show when not recording */}
        {!isRecording && (
          <TouchableOpacity
            onPress={isPlaying ? onPauseRecording : onPlayRecording}
            style={{
              backgroundColor: tinycolor(theme.colors.light.bg).setAlpha(0.2).toRgbString(),
              borderRadius: 9999,
              borderWidth: 1,
              borderColor: tinycolor(theme.colors.light.border).setAlpha(0.6).toRgbString(),
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isPlaying ? (
              <PauseIcon width={24} height={24} fill={colorPalette.icon.primary} />
            ) : (
              <PlayIcon width={24} height={24} fill={colorPalette.icon.primary} />
            )}
          </TouchableOpacity>
        )}

        {/* Waveform and timer placeholder */}
        <View
          style={{
            flex: 1,
            height: 56,
            width: '100%',
            marginHorizontal: 16,
            backgroundColor: colorPalette.surface2,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* TODO: Add waveform visualization here */}
          <Text style={{ color: colorPalette.text }}>
            {isRecording ? 'Recording...' : isPlaying ? 'Playing...' : 'Paused'}
          </Text>
          <Text style={{ color: colorPalette.text, fontSize: 12 }}>{duration}s</Text>
      </View>
      
      {/* Stop/Next button */}
      <TouchableOpacity
        onPress={isRecording ? onStopRecording : onSaveRecording}
        style={{
          backgroundColor: tinycolor(theme.colors.light.bg).setAlpha(0.2).toRgbString(),
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: tinycolor(theme.colors.light.border).setAlpha(0.6).toRgbString(),
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isRecording ? (
          <StopIcon width={24} height={24} fill={colorPalette.icon.primary} />
        ) : (
          <GoArrowRightIcon width={24} height={24} fill={colorPalette.icon.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 36,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  closeButton: {
    borderRadius: 9999,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformContainer: {
    flex: 1,
    height: 56,
    paddingLeft: 12,
    marginHorizontal: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 40,
    flexDirection: 'row',
  },
  actionButton: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
}); 
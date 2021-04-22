import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Platform, ActivityIndicator,
    Dimensions, Share, TouchableOpacity
} from 'react-native';


import RtcEngine from "react-native-agora";
import { RtcLocalView, RtcRemoteView } from "react-native-agora";
import { VideoRemoteState } from "react-native-agora";

import { PermissionsAndroid } from "react-native";

import { ChannelProfile, ClientRole } from "react-native-agora";


const dimensions = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  };



export default function Live(props) {

    const [joined, setJoined] = useState(false);
    const [broadcasterVideoState, setBroadcasterVideoState] = useState(VideoRemoteState.Decoding);

    const isBroadcaster = props.route.params.type === "create";

    async function requestCameraAndAudioPermission() {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
          if (
            granted["android.permission.RECORD_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED &&
            granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log("You can use the cameras & mic");
          } else {
            console.log("Permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }

    const AgoraEngine = useRef();

    const init = async () => {
        try {
            if (Platform.OS === 'android') await requestCameraAndAudioPermission();
            AgoraEngine.current = await RtcEngine.create("d3069e08dacb494aaf4a209e8fbd1e27");
            AgoraEngine.current.enableVideo();
            AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
            if (isBroadcaster) 
            {
                AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

            }

            AgoraEngine.current.addListener("JoinChannelSuccess", (channel, uid, elapsed) =>
            {
                console.log("JoinChannelSuccess", channel, uid, elapsed);
                setJoined(true);
            });

            AgoraEngine.current.addListener("RemoteVideoStateChanged", (uid, state) => {
                if (uid === 1) setBroadcasterVideoState(state);
              });
        } catch (error) {
            console.log('err', error);
        }
    };

  
    useEffect(() => {
        const uid = isBroadcaster ? 1 : 0;
        init().then(() => AgoraEngine.current.joinChannel(null, props.route.params.channel, null, uid));
        return () => {
          AgoraEngine.current.destroy();
        };
      }, []);


      const onShare = async () => {
        try {
          await Share.share({ message: props.route.params.channel });
        } catch (error) {
          console.log('er',error.message);
        }
      };

      const onSwitchCamera = () => AgoraEngine.current.switchCamera();

      const videoStateMessage = (state) => {
        switch (state) {
          case VideoRemoteState.Stopped:
            return "Video turned off by Host";
      
          case VideoRemoteState.Frozen:
            return "Connection Issue, Please Wait";
      
          case VideoRemoteState.Failed:
            return "Network Error";
        }
      };

  return (
    <>
    <View style={styles.container}>
        {!joined ? (
        <>
            <ActivityIndicator
            size={60}
            color="#222"
            style={styles.activityIndicator}
            />
            <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
        </>
        ) : 
            isBroadcaster ? (
                <RtcLocalView.SurfaceView 
                  style={styles.fullscreen} 
                  channelId={props.route.params.channel} 
                />
              ) : (

                () => {
                    broadcasterVideoState === VideoRemoteState.Decoding ? (
                        <RtcRemoteView.SurfaceView 
                         uid={1} 
                         style={styles.fullscreen} 
                         channelId={props.route.params.channel} 
                        />
                      ) : (
                        <View style={styles.broadcasterVideoStateMessage}>
                          <Text style={styles.broadcasterVideoStateMessageText}>{videoStateMessage(broadcasterVideoState)}</Text>
                        </View>
                      );
                }
              )()
        }
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onShare}>
                <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
                <Text style={styles.buttonText}>Switch Camera</Text>
            </TouchableOpacity>
        </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 18,
    color: '#222',
  },

  fullscreen: {
    width: dimensions.width,
    height: dimensions.height,
  },

  //button
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    width: 150,
    backgroundColor: '#fff',
    marginBottom: 50,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 17,
  },

  broadcasterVideoStateMessage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  broadcasterVideoStateMessageText: {
    color: '#fff',
    fontSize: 20,
  },
});
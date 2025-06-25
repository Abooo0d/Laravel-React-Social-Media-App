import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import SimplePeer from "simple-peer";
import axiosClient from "../../AxiosClient/AxiosClient";
import { useChatsContext } from "../../Contexts/ChatsContext";
import { MdCallEnd, MdCall } from "react-icons/md";
import { IoVolumeMute } from "react-icons/io5";
import { FaVolumeUp } from "react-icons/fa";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { useMainContext } from "../../Contexts/MainContext";
const VoiceCallRoom = () => {
  const {
    currentChat,
    showAudioCallForm,
    setShowAudioCallForm,
    incomingSignal,
    isCaller,
    setIsCaller,
    setIncomingFrom,
    setIncomingSignal,
    callEnded,
    setCallEnded,
  } = useChatsContext();
  const { setErrors } = useMainContext();
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [peer, setPeer] = useState(null);
  const remoteVoice = useRef();
  const localStream = useRef(null);
  const [acceptCall, setAcceptCall] = useState(false);
  const [callStatus, setCallStatus] = useState("");

  const MainSetup = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    localStream.current = stream;

    if (isCaller) {
      setCallStatus("Calling ...");
      setAcceptCall(true);
      const createdPeer = new SimplePeer({
        initiator: isCaller,
        trickle: false,
        stream,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            {
              urls: "turn:your.turn.server",
              username: "user",
              credential: "pass",
            },
          ],
        },
      });
      createdPeer.on("signal", (signal) => {
        axiosClient
          .post(route("chat.voiceCall", currentChat?.id), {
            signal: signal,
          })
          .then(() => {
            setCallStatus("Ringing ...");
          });
      });
      createdPeer.on("stream", (remoteStream) => {
        remoteVoice.current.srcObject = remoteStream;
      });
      setPeer(createdPeer);
    }
  };

  const answerVideoCall = () => {
    setCallStatus(true);
    const stream = localStream.current;
    const createdPeer = new SimplePeer({
      initiator: isCaller,
      trickle: false,
      stream,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:your.turn.server",
            username: "user",
            credential: "pass",
          },
        ],
      },
    });
    createdPeer.on("signal", (signal) => {
      axiosClient
        .post(route("chat.voiceCall", currentChat?.id), {
          signal: signal,
        })
        .then(() => {
          setAcceptCall(true);
        });
    });
    createdPeer.on("stream", (remoteStream) => {
      remoteVoice.current.srcObject = remoteStream;
    });
    createdPeer.signal(incomingSignal);
    setPeer(createdPeer);
  };

  const toggleMicrophone = () => {
    if (!localStream.current) return;

    const audioTracks = localStream.current.getAudioTracks();
    if (audioTracks.length > 0) {
      const micTrack = audioTracks[0];
      micTrack.enabled = !micTrack.enabled;
      setIsMicrophoneOn(!!micTrack.enabled);
    }
  };
  const toggleVolume = () => {
    setIsVolumeOn((prev) => !prev);
  };
  const endCall = () => {
    if (currentChat?.id) {
      axiosClient.post(route("call.decline", currentChat?.id), {});
    }
    if (peer) peer.destroy();
    setPeer(null);
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    if (remoteVoice.current && remoteVoice.current.srcObject) {
      remoteVoice.current?.srcObject
        .getTracks()
        .forEach((track) => track.stop());
      remoteVoice.current.srcObject = null;
    }
    setIncomingFrom(null);
    setIncomingSignal(null);
    setShowAudioCallForm(false);
    setIsCaller(false);
    setAcceptCall(false);
    setCallStatus("");
  };

  useEffect(() => {
    if (!showAudioCallForm) {
      endCall();
      return;
    }
    MainSetup();
  }, [showAudioCallForm]);

  useEffect(() => {
    if (!isCaller) return;
    if (!peer || !incomingSignal) return;
    peer.signal(incomingSignal);
  }, [peer, incomingSignal]);

  useEffect(() => {
    if (callEnded) {
      if (isCaller) {
        endCall();
        setErrors(["Call Ended"]);
      }
      setCallEnded(false);
    }
  }, [callEnded]);

  return (
    <div
      className={`fixed inset-0 w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 bg-gray-900/30 backdrop-blur-md duration-200 z-[200] ${
        showAudioCallForm ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className={`relative md:max-w-[90%] md:w-[900px] max-w-[100%] max-h-[100%] h-full w-full flex flex-col justify-between items-center rounded-xl overflow-auto bg-gray-900/90 border-[1px] border-solid border-gray-700 p-1 backdrop-blur-2xl duration-200 ${
          showAudioCallForm
            ? "visible opacity-100"
            : "invisible opacity-0 scale-90 "
        } `}
      >
        <div className="relative w-full flex flex-1 flex-col justify-center items-center gap-2 rounded-md overflow-hidden bg-homeFeed bg-chat-pattern bg-cover border-gray-500/50 border-[1px] border-solid">
          <div className="absolute inset-0 bg-gray-900/50" />
          {!isVolumeOn && (
            <span className="w-8 h-8 flex justify-center items-center bg-gray-800/50 backdrop-blur-sm rounded-md p-1 absolute top-[10px] left-[10px] border-gray-500/50 border-solid border-[1px]">
              <IoVolumeMute className="text-gray-500" />
            </span>
          )}
          {!isMicrophoneOn && (
            <span className="w-8 h-8 flex justify-center items-center bg-gray-800/50 backdrop-blur-sm rounded-md p-1 absolute top-[10px] left-[50px] border-gray-500/50 border-solid border-[1px]">
              <FaMicrophoneSlash className="text-gray-500" />
            </span>
          )}
          <div className="relative flex flex-col gap-4 w-full h-full justify-center items-center">
            <img
              src={currentChat?.avatar_url}
              alt="image"
              className="w-[150px] h-[150px] rounded-full "
            />
            <div className="flex flex-col gap-2 absolute top-[40px] left-[50%] translate-x-[-50%]">
              <h2 className="text-2xl text-gray-300 text-center">
                {currentChat?.name}
              </h2>
              {!remoteVoice.current?.srcObject && (
                <>
                  {isCaller ? (
                    <div className="text-gray-500">{callStatus}</div>
                  ) : (
                    <span className="text-gray-500">
                      Incoming Call From{" "}
                      <span className="block sm:inline w-full text-center text-sky-500 text-2xl">
                        {currentChat?.name}
                      </span>
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          <audio
            ref={remoteVoice}
            autoPlay
            playsInline
            muted={isVolumeOn}
            className={`w-full h-full aspect-video duration-200 ${
              acceptCall ? "visible opacity-100" : "invisible opacity-0"
            }`}
          />
          <div className="w-full flex justify-center items-center gap-12 mt-4 absolute bottom-0 py-4 ">
            {isCaller || acceptCall ? (
              <>
                <button
                  className="w-[50px] h-[50px] rounded-full bg-red-500 text-gray-300 flex justify-center items-center"
                  onClick={() => endCall()}
                >
                  <MdCallEnd className="w-[30px] h-[30px]" />
                </button>
                <button
                  className="w-[50px] h-[50px] rounded-full bg-green-600 text-gray-300 flex justify-center items-center relative"
                  onClick={() => {
                    toggleVolume();
                  }}
                >
                  <FaVolumeUp
                    className={`absolute inset-0 w-full h-full p-2 duration-200 ${
                      isVolumeOn ? "opacity-100" : " opacity-0"
                    }`}
                  />
                  <IoVolumeMute
                    className={`absolute inset-0 w-full h-full p-2 duration-200 ${
                      isVolumeOn ? "opacity-0" : " opacity-100"
                    }`}
                  />
                </button>
                <button
                  className="w-[50px] h-[50px] rounded-full bg-sky-600 text-gray-300 flex justify-center items-center relative"
                  onClick={() => {
                    toggleMicrophone();
                  }}
                >
                  <FaMicrophone
                    className={`absolute inset-0 w-full h-full p-2 duration-200 ${
                      isMicrophoneOn ? "opacity-100" : " opacity-0"
                    }`}
                  />
                  <FaMicrophoneSlash
                    className={`absolute inset-0 w-full h-full p-2 duration-200 ${
                      isMicrophoneOn ? "opacity-0" : " opacity-100"
                    }`}
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-[50px] h-[50px] rounded-full bg-red-600 text-gray-300 flex justify-center items-center relative"
                  onClick={() => {
                    endCall();
                  }}
                >
                  <MdCallEnd className="w-[30px] h-[30px]" />
                </button>
                <button
                  className="w-[50px] h-[50px] rounded-full bg-green-600 text-gray-300 flex justify-center items-center relative"
                  onClick={() => {
                    answerVideoCall();
                  }}
                >
                  <MdCall className="w-[30px] h-[30px]" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCallRoom;

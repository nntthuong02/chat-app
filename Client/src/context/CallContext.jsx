import { createContext, useCallback, useEffect, useRef, useState } from "react";
export const CallContext = createContext();
export const CallContextProvider = ({ children, user, socket }) => {
  const [calling, SetCalling] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [makingCall, setMakingCall] = useState(false);
  const [caller, setCaller] = useState(null);

  const myVideo = useRef();
  const userVideo = useRef();
  const StreamRef = useRef();

  useEffect(() => {
    if (socket === null) return;
    socket.on("CallAccpected", (res) => {
      console.log(res);
      setCaller(res.user);
      setReceivingCall(true);
    });
    socket.on("reject", (res) => {
      updateMakingCall();
    });
    socket.on("accept", (data) => {
      console.log("accept");
      const peerConnection = new RTCPeerConnection();
      const remoteStream = new MediaStream();

      // Thêm tracks từ đối phương vào remoteStream
      data.userMediaStream.getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });

      // Hiển thị video của đối phương trên userVideo
      if (userVideo.current) {
        userVideo.current.srcObject = remoteStream;
      } else {
        console.error("Ref not assigned to video element:", userVideo);
      }
    });
    socket.on("end", (data) => {
      setCaller(null);
      updateMakingCall();
      setReceivingCall(false);
      myVideo.current = null;
      userVideo.current = null;
      StreamRef.current = null;
    });

    return () => {
      socket.off("CallAccpected");
    };
  }, [socket]);

  const endCalled = useCallback(() => {
    SetCalling(false);
    setCaller(null);
    setMakingCall(false);
    setReceivingCall(false);
    myVideo.current = null;
    userVideo.current = null;
    StreamRef.current = null;
    socket.emit("end", caller);
  });

  const updateMakingCall = useCallback((u) => {
    setMakingCall(false);

    if (StreamRef.current) {
      StreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      if (myVideo.current) {
        myVideo.current.srcObject = null;
      }
    }
    socket.emit("end", { ...u });
  });

  // ////////
  const callUser = useCallback(async (data) => {
    const initializeWebcam = async () => {
      try {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        StreamRef.current = userMediaStream;
        console.log(userMediaStream);
        if (myVideo.current) {
          myVideo.current.srcObject = userMediaStream;
        } else {
          console.error("Ref not assigned to video element:", myVideo);
        }
        socket.emit("callUser", { ...data, userMediaStream });
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    setMakingCall(true);
    initializeWebcam();
  });

  const rejectCall = useCallback(() => {
    socket.emit("reject", { to: caller, from: user });
    setCaller(null);
    setReceivingCall(false);
  });

  const acceptCall = useCallback(() => {
    const initializeWebcam = async () => {
      try {
        const userMediaStream = navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        StreamRef.current = userMediaStream;
        if (myVideo.current) {
          myVideo.current.srcObject = userMediaStream;
        } else {
          console.error("Ref not assigned to video element:", myVideo);
        }
        socket.emit("accept", { caller, user, userMediaStream });
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };
    setReceivingCall(false);
    SetCalling(true);
    initializeWebcam();
  });

  return (
    <CallContext.Provider
      value={{
        callUser,
        receivingCall,
        rejectCall,
        acceptCall,
        makingCall,
        myVideo,
        updateMakingCall,
        userVideo,
        calling,
        endCalled,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};
